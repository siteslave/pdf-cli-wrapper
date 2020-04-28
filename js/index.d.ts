export declare class PdfCliWrapper {
    static jarPath: string;
    static promiseJavaSpawn(sArgs: any): Promise<string>;
    /** Returns array of objects
    @pdfPath - The PDF file to read form fields from
    */
    static getFormFields(pdfPath: any): Promise<any>;
    /** Returns object of objects where key is fullyQualifiedName of PDF Acroform field
    @pdfPath - The PDF file to read form fields from
    */
    static getFormFieldsAsObject(pdfPath: any): Promise<{}>;
    /** Takes array of objects and sets values of PDF Acroform fields
      @pdfPath - The PDF file to read form fields from
      @fieldArray - Array of PDF field definitions
      @outPdfPath - Where to write PDF that has been filled
      @options - {
        flatten:false
      }
    */
    static embedFormFields(pdfPath: any, fieldArray: any, outPdfPath: any, options?: any): Promise<string>;
    /** Takes objects of objects and sets values of PDF Acroform fields
    @pdfPath - The PDF file to read form fields from
    @fieldArray - Array of PDF field definitions
    @outPdfPath - Where to write PDF that has been filled
    */
    static embedFormFieldsByObject(pdfPath: any, fields: any, outPdfPath: any): Promise<string>;
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
    static pdfToImages(pdfPathOrBuffer: any, options: any): Promise<any>;
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
    static addImages(pdfPathOrBuffer: any, imgPathArray: any, options: any): Promise<any>;
    static promiseDelete(path: any, ignoreFileNotFound: any): Promise<unknown>;
}
