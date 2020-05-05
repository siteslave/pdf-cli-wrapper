//const Document = require('node-pdfbox');
import * as path from "path"
import * as fs from "fs"

const pdfGenPath = path.join(__dirname, '../libs/PDFGen.jar')
const pdfSignPath = path.join(__dirname, '../libs/PDFSign.jar')
const fontPath = path.join(__dirname, '../libs/fonts/Sarabun-Regular.ttf')

function opsOntoSpawnArgs(options: any, sArgs: any) {
  for (let name in options) {
    //if (!options[name] || !options[name].toString) continue;//value not a string, skip it
    sArgs.push('-' + name)
    sArgs.push(options[name].toString())
  }
}

const Commander = {
  sign(inPdfPath: any, tsaUrl: any, keyStoreFile: any, keyStorePassword: any, keyStoreType: any = 'PKCS12', logType: any = 1) {
    const sArgs = ['-jar', pdfSignPath, inPdfPath, tsaUrl, keyStoreFile, keyStorePassword, keyStoreType, logType]
    return { processor: 'sign', args: sArgs }
  },

  embedFormFields(pdfPath: any, fieldArray: any, outPdfPath: string, options: any) {
    const strRandom = Math.round(Math.random() * 1000000000000);
    const rndFile = `tempAcroformJson_${strRandom}_`;
    const jsonFilePath = getTempFilePath('json', rndFile)
    const sArgs = ['-jar', pdfGenPath, 'fill', pdfPath, jsonFilePath, outPdfPath, fontPath]

    if (options && options.flatten) {
      sArgs.push('-flatten')
      sArgs.push('true')
    }

    fieldArray = JSON.stringify(fieldArray, null, 2)

    return new Promise(function (res, rej) {
      fs.writeFile(jsonFilePath, fieldArray, err => {
        if (err) return rej(err)
        res({
          processor: 'embedFormFields',
          args: sArgs,
          jsonFilePath: jsonFilePath
        })
      })
    })
  },

  addImages(pdfPathOrBuffer: any, imgPathArray: any, options: any) {
    options = options ? { ...options } : {}//clone
    const sArgs = ['-jar', pdfGenPath, 'add-image']
    const fromFile = pdfPathOrBuffer.constructor == String
    let toBuffer = false
    let deleteOut = false
    let promise = Promise.resolve(pdfPathOrBuffer)
    const tempPath = getTempFilePath('pdf', 'addImages')
    const imagePaths = []
    let buffDelete = null

    function cleanup(x?) {
      if (deleteOut && options.out == tempPath) {
        fs.unlink(options.out, e => e)
      }

      imagePaths.forEach(item => {
        if (item.isBase64) fs.unlink(item.path, e => e)
      })

      if (buffDelete) {
        fs.unlink(buffDelete, e => e)
      }

      return x
    }

    //discover pdf or buffer to pdf-file
    if (fromFile) {
      sArgs.push(pdfPathOrBuffer)
      deleteOut = options.toBuffer || !options.out
      options.out = deleteOut ? tempPath : options.out
    } else {
      deleteOut = true
      toBuffer = !options.out
      options.out = options.out || tempPath
      promise = promise.then(() => bufferToFile(pdfPathOrBuffer, 'pdf', 'addImages'))
        .then(buffPath => {
          buffDelete = buffPath
          sArgs.push(buffPath)
        })
    }

    if (options.toBuffer) {
      toBuffer = options.toBuffer
      delete options.toBuffer
    }

    //add image args (possibly cast base64 to file)
    return promise.then(() => {
      const promises = []

      if (imgPathArray.constructor != Array) {
        imgPathArray = [imgPathArray]
      }

      imgPathArray.forEach(item => {
        promises.push(
          imgDefToPath(item)
            .then(imgPath => {
              imagePaths.push({ path: imgPath, isBase64: item != imgPath })
              sArgs.push(imgPath)
            })
        )
      })

      return Promise.all(promises)
    })
      .then(() => {
        opsOntoSpawnArgs(options, sArgs)
        return {
          processor: 'addImages', cleanup: cleanup, args: sArgs,
          toBuffer: toBuffer, deleteOut: deleteOut, out: options.out
        }
      })
  },

  getFormFields: function (pdfPath) {
    return { processor: 'getFormFields', args: ['-jar', pdfGenPath, 'read', pdfPath] }
  },

  // pdfToImage(pdfPath, options) {
  //   options = options || {}
  //   options.endPage = 1
  //   const sArgs = ['-jar', pdfGenPath, 'pdftoimage', pdfPath]
  //   opsOntoSpawnArgs(options, sArgs)
  //   return { processor: 'pdfToImage', args: sArgs }
  // }
}

const Processor = {
  /**
   * usage : resources/pdfA3.pdf https://time-test.teda.th resources/eservice.p12 xxxxxxx PKCS12 1
   * @param inputPdf tsaUrl keyStoreFile keyStorePassword PKCS12 1
   * 
   */
  sign: function (command: any) {
    return promiseJavaSpawn(command.args)
      .then(() => { })
  },

  addImages: function (command: any) {
    return promiseJavaSpawn(command.args)
      .then(res => command.toBuffer ? fileToBuffer(command.out, command.deleteOut) : res)
      .then(x => command.cleanup(x))
      .catch(e => {
        command.cleanup()
        throw e
      })
  },
  embedFormFields: function (command) {
    return promiseJavaSpawn(command.args)
      .then(data => {
        fs.unlink(command.jsonFilePath, function () { })
        return data
      })
      .catch(e => {
        fs.unlink(command.jsonFilePath, function () { })
        throw e
      })
  }
}

function promiseJavaSpawn(sArgs): Promise<string> {
  return new Promise((res, rej) => {
    const dataArray = []
    const spawn = require('child_process').spawn;

    //Hackish and may need eventual change. Real issue is Java outputting extra logging    
    //sArgs.unshift('-Xmx2048m')//set memory to prevent Java verbose log of "Picked up _JAVA_OPTIONS: -Xmx2048m -Xms512m"
    //sArgs.unshift('-Xms512m')//set memory to prevent Java verbose log of "Picked up _JAVA_OPTIONS: -Xmx2048m -Xms512m"

    const ls = spawn('java', sArgs);
    let spawnError = null

    const upgradeError = err => {
      if (!err) return err

      if (err.message) {
        let msg = err.msg
        msg += '\njava-exec-args:' + JSON.stringify(sArgs)
        err = new Error(msg)
      } else if (err.split) {
        let msg = err
        msg += '\njava-exec-args:' + JSON.stringify(sArgs)
        err = new Error(msg)
      }

      return err
    }

    ls.stdout.on('data', data => dataArray.push(data));
    ls.stderr.on('data', data => dataArray.push(data));

    ls.stdout.on('error', err => spawnError = err)
    ls.stderr.on('error', err => spawnError = err)

    ls.on('close', code => {
      if (spawnError) {
        return rej(upgradeError(spawnError))
      }

      const output = dataArray.join('')//bring all cli data together

      if (
        output.substring(0, 6) == 'Error:'
        || output.substring(0, 9) == 'Exception'
        || output.substring(0, 6) == 'Usage:'
        || output.search('java.io') >= 0
      ) {
        return rej(upgradeError(output))
      }

      res(output)
    })
  })
}

export class PdfCliWrapper {
  public static jarPath = pdfGenPath

  static promiseJavaSpawn(sArgs) {
    return promiseJavaSpawn(sArgs)
  }

  /** Returns array of objects
  @pdfPath - The PDF file to read form fields from
  */
  static getFormFields(pdfPath) {
    const sArgs = Commander.getFormFields(pdfPath).args
    return promiseJavaSpawn(sArgs)
      .then(res => trimJavaResponseToJson(res))
      .then(data => {
        data = data.trim()
        if (data.substring(data.length - 1) == ',') {
          data = data.substring(0, data.length - 1)//somehow a comma is being added?
        }

        return JSON.parse(data)
      })
  }

  /** Returns object of objects where key is fullyQualifiedName of PDF Acroform field
  @pdfPath - The PDF file to read form fields from
  */
  static getFormFieldsAsObject(pdfPath) {
    return this.getFormFields(pdfPath)
      .then(data => {
        const rtnOb = {}
        for (let x = 0; x < data.length; ++x) {
          rtnOb[data[x].fullyQualifiedName] = data[x]
        }
        return rtnOb
      })
  }

  /** Takes array of objects and sets values of PDF Acroform fields
    @pdfPath - The PDF file to read form fields from
    @fieldArray - Array of PDF field definitions
    @outPdfPath - Where to write PDF that has been filled
    @options - {
      flatten:false
    }
  */
  static embedFormFields(pdfPath: any, fieldArray: any, outPdfPath: any, options?) {
    return Commander.embedFormFields(pdfPath, fieldArray, outPdfPath, options)
      .then(command => Processor.embedFormFields(command))
  }

  /** Takes objects of objects and sets values of PDF Acroform fields
  @pdfPath - The PDF file to read form fields from
  @fieldArray - Array of PDF field definitions
  @outPdfPath - Where to write PDF that has been filled
  */
  static embedFormFieldsByObject(pdfPath, fields, outPdfPath) {
    const fieldArray = []
    for (let x in fields) {
      fieldArray.push(fields[x])
    }
    return this.embedFormFields(pdfPath, fieldArray, outPdfPath, fontPath);
  }

  /** produces png/jpg images in same folder as pdf
    @pdfPath - The PDF file to make images from
    @options{
      password      : The password to the PDF document.
      imageType=jpg : The image type to write to. Currently only jpg or png.
      outputPrefix  : Name of PDF document The prefix to the image file.
      startPage=1   : The first page to convert, one based.
      endPage=1       : The last page to convert, one based.
      nonSeq        : false Use the new non sequential parser.
    }
  */
  // static pdfToImage(pdfPath, options) {
  //   const sArgs = Commander.pdfToImage(pdfPath, options).args
  //   return promiseJavaSpawn(sArgs).then(paths => paths[0])
  // }

  /** produces png/jpg images in same folder as pdf
    @pdfPathOrBuffer - A buffer-of-pdf or pdf-file-path to work with
    @options{
      password      : The password to the PDF document.
      imageType=jpg : The image type to write to. Currently only jpg or png.
      outputPrefix  : Name of PDF document The prefix to the image file.
      startPage=1   : The first page to convert, one based.
      endPage=1     : The last page to convert, one based.
      nonSeq        : false Use the new non sequential parser.
      mode          : default=files, base64-array, buffer-array
    }
  */
  static pdfToImages(pdfPathOrBuffer, options) {
    const fromFile = pdfPathOrBuffer.constructor == String
    let buffDelete = null
    const sArgs = ['-jar', pdfGenPath, 'pdftoimage']

    let promise = Promise.resolve(pdfPathOrBuffer)
    let fileprefix = ''

    if (fromFile) {
      fileprefix = pdfPathOrBuffer.split(path.sep).pop()
      sArgs.push(pdfPathOrBuffer)
    } else {
      promise = promise.then(buffer => bufferToFile(buffer, 'pdf', 'pdfToImages'))
        .then(buffPath => {
          buffDelete = buffPath
          fileprefix = buffPath.split(path.sep).pop()
          sArgs.push(buffPath)
        })
    }

    options = options || {}
    let mode = options.mode ? options.mode : 'files'
    const imgSuffix = options.imageType || 'jpg'

    delete options.mode

    promise = promise.then(() => {
      opsOntoSpawnArgs(options, sArgs)
      return promiseJavaSpawn(sArgs)
    })
      .then(res => trimJavaResponseToJson(res))
      .then(res => JSON.parse(res))

    switch (mode) {
      case 'base64-array':
        promise = promise.then(imgPathArrayToBase64s)
        break;

      case 'buffer-array':
        promise = promise.then(imgPathArrayToBuffers)
        break;
    }

    function cleanup(input?) {
      if (buffDelete) {
        fs.unlink(buffDelete, e => e)
      }
      return input
    }

    return promise
      .catch(e => {
        cleanup()
        throw e
      })
      .then(cleanup)
  }

  /** Insert a single image into a PDF or append multi images as individual pages
    @pdfPathOrBuffer - A buffer-of-pdf or pdf-file-path to work with
    @imagesPath - The file image(s) to append to document. Allows multiple image arguments, which is great for appending photos as pages. Allows base64 strings.
    @options{
      out    : The file to save the decrypted document to. If left blank then it will be the same as the input file || options
      page   : The page number where to drop image. Use -1 to append on a new page
      x      : The x cord where to drop image
      y      : The y cord where to drop image. Use -1 for top
      width  : default is image width. Accepts percent width
      height : default is image height  
    }
  */
  static addImages(pdfPathOrBuffer, imgPathArray, options) {
    let promise = Commander.addImages(pdfPathOrBuffer, imgPathArray, options)
    let command = { cleanup: () => 0 }//foo

    return promise.then(command => Processor.addImages(command))
  }

  static promiseDelete(path, ignoreFileNotFound) {
    return new Promise(function (res, rej) {
      fs.unlink(path, e => {
        if (e) {
          if (e.message && e.message.indexOf('ENOENT') >= 0) {
            return res()//file didn't exist
          }
          return rej(e)
        }

        res()
      })
    })
  }
}

let tempCounter = 0
function getTempFileName(ext, prefix) {
  return '_' + (prefix || 'tempBufferFile') + (++tempCounter) + '.' + (ext || 'pdf')
}

function getTempFilePath(ext, prefix) {
  return path.join(process.cwd(), getTempFileName(ext, prefix))
}

const base64ImgDef = 'data:image/'
function isBase64Image(item) {
  return item.substring(0, base64ImgDef.length) == base64ImgDef
}

function base64ToFile(item) {
  const extDef = item.substring(base64ImgDef.length, base64ImgDef.length + 4)
  const ext = extDef.split(';')[0]

  const base64 = item.replace(/^[^,]+,/, "");
  item = getTempFilePath(ext, 'imgDefToPath')

  return new Promise(function (res, rej) {
    fs.writeFile(item, base64, 'base64', function (err) {
      if (err) return rej(err)
      res(item)
    })
  })
}

function imgDefToPath(item) {
  const isBase64 = isBase64Image(item)

  let promise = Promise.resolve(item)

  if (isBase64) {
    promise = promise.then(item => base64ToFile(item))
  }

  return promise
}

function imgPathArrayToBuffers(
  imgFiles
): Promise<any[]> {
  const promises = []
  imgFiles.forEach(imgPath => {
    const promise = new Promise(function (res, rej) {
      fs.readFile(imgPath, (err, data) => {
        if (err) return rej(err)
        res(data)
      })
    })
      .then(data => {
        fs.unlink(imgPath, e => e)
        return data
      })
    promises.push(promise)
  })
  return Promise.all(promises)
}

function imgPathArrayToBase64s(imgFiles) {
  return imgPathArrayToBuffers(imgFiles)
    .then(buffers => buffers.map(bufferToString))
}

function bufferToString(buffer) {
  return buffer.toString('base64')
}

function bufferToFile(buffer, ext, prefix): Promise<string> {
  const buffTempPath = getTempFilePath((ext || 'pdf'), (prefix || 'bufferToFile'))
  return new Promise(function (res, rej) {
    fs.writeFile(buffTempPath, buffer, (err) => {
      if (err) return rej(err)
      res(buffTempPath)
    })
  })
}

function fileToBuffer(readPath, deleteFile) {
  return new Promise(function (res, rej) {
    fs.readFile(readPath, (err, buffer) => {
      if (deleteFile) {
        fs.unlink(readPath, e => e)
      }

      if (err) return rej(err)

      res(buffer)
    })
  })
}

/** hack to remove JAVA verbose logging.
  TODO: we need to turn off verbose logging
  CAUSE: Sometimes we are getting Java extra message of "Picked up _JAVA_OPTIONS: -Xmx2048m -Xms512m"
*/
function trimJavaResponseToJson(string) {
  if (string.search('Picked up _JAVA_OPTIONS') >= 0) {
    return string.replace(/^[^\[\{]*/, '')
  }

  return string
}