const path = require('path');
const PdfCliWrapper = require('../index');

const readablePdf = path.join(__dirname, 'template.pdf')
const outputPdf = path.join(__dirname, 'out/filled.pdf')
const options = {
  x: 100.663,
  y: 142.162,
  page: 0,
  width: 129.62,
  height: 27.992996,
  out: outputPdf
}

const base64Image = 'data:image/png;base64,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HgLO0FPMfNCgQTJhwoQsYXHqqaeqyqY0EiABEkgiAQqLJK4q5xQZgTPOOEOWLVuW1T+ycR522GECPwwYj0IiWx52TAIkEAIBCosQILOL9BBw27Xo1auXnH766TJ48GAFAmGo77zzTnqgcKYkQAKpIkBhkarl5mTDIDBs2DAZN25cVlc/+9nPZP369ep3hx56qEqQRSMBEiCBJBKgsEjiqnJOkRKYN2+eSvP9/fffZ8ax//77yxdffKH+jnohKEhGIwESIIEkEqCwSOKqck6RE0ByrKlTp7qOA8ciTj+MyAfMAZAACZCATwQoLHwCyWZIwEmgUqVKrlBYMp3PCgmQQJIJUFgkeXU5t0gJmNVMzYHMnDlT+vfvH+nY2DkJkAAJBEWAwiIosmyXBETkpptuEuxQaGvSpIls3LhRqlatSj4kQAIkkEgCFBaJXFZOyiYC27Ztk8WLFwvKqyM5FmqF0EiABEggqQQoLJK6spwXCZAACZAACURAgMIiAujskgRIgARIgASSSoDCIqkry3mRAAmQAAmQQAQEKCwigM4uSYAESIAESCCpBCgskrqynBcJkAAJkAAJRECAwiIC6OySBEiABEiABJJKgMIiqSvLeZEACZAACZBABAQoLCKAzi5JgARIgARIIKkEKCySurKcFwmQAAmQAAlEQIDCIgLo7JIESIAESIAEkkqAwiKpK8t5kQAJkAAJkEAEBCgsIoDOLkmABEiABEggqQQoLJK6spwXCZAACZAACURAgMIiAujskgRIgARIgASSSoDCIqkry3mRAAmQAAmQQAQEKCwigM4uSYAESIAESCCpBCgskrqynBcJkAAJkAAJRECAwiIC6OySBEiABEiABJJKgMIiqSvLeZEACZAACZBABAQoLCKAzi5JgARIgARIIKkEKCySurKcFwmQAAmQAAlEQIDCIgLo7JIESIAESIAEkkqAwiKpK8t5kQAJkAAJkEAEBCgsIoDOLkmABEiABEggqQQoLJK6spwXCZAACZAACURAgMIiAujskgRIgARIgASSSoDCIqkry3mRAAmQAAmQQAQEKCwigM4uSYAESIAESCCpBCgskrqynBcJkAAJkAAJRECAwiIC6OySBEiABEiABJJKgMIiqSvLeZEACZAACZBABAQoLCKAzi5JgARIgARIIKkEKCySurKcFwmQAAmQAAlEQIDCIgLo7JIESIAESIAEkkqAwiKpK8t5kQAJkAAJkEAEBP4PJQLG0iWez5YAAAAASUVORK5CYII='


PdfCliWrapper.addImages(readablePdf, base64Image, options)
  .then(() => {
    console.log('success');
  }).catch(error => {
    console.log(error);
  })

// pdfCliWrap.getFormFields(readablePdf)
//   .then(files => {
//     console.log(files);
//   }).catch(error => {
//     console.log(error);
//   });


// const data = [
//   {
//     "fullyQualifiedName": "bookNo",
//     "partialName": "bookNo",
//     "type": "org.apache.pdfbox.pdmodel.interactive.form.PDTextField",
//     "isRequired": false,
//     "page": 0,
//     "cords": {
//       "x": "96.72",
//       "y": "736.8",
//       "width": "49.08",
//       "height": "13.919983"
//     },
//     "value": "9009"
//   },
//   {
//     "fullyQualifiedName": "certificateNo",
//     "partialName": "certificateNo",
//     "type": "org.apache.pdfbox.pdmodel.interactive.form.PDTextField",
//     "isRequired": false,
//     "page": 0,
//     "cords": {
//       "x": "484.08",
//       "y": "736.8",
//       "width": "54.48001",
//       "height": "13.919983"
//     },
//     "value": "910009"
//   },
//   {
//     "fullyQualifiedName": "requestFullname",
//     "partialName": "requestFullname",
//     "type": "org.apache.pdfbox.pdmodel.interactive.form.PDTextField",
//     "isRequired": false,
//     "page": 0,
//     "cords": {
//       "x": "116.823",
//       "y": "681.12",
//       "width": "367.32",
//       "height": "13.919983"
//     },
//     "value": "สถิตย์ เรียนพิศ"
//   },
//   {
//     "fullyQualifiedName": "requestCID",
//     "partialName": "requestCID",
//     "type": "org.apache.pdfbox.pdmodel.interactive.form.PDTextField",
//     "isRequired": false,
//     "page": 0,
//     "cords": {
//       "x": "204.393",
//       "y": "618.685",
//       "width": "333.213",
//       "height": "14.564026"
//     },
//     "value": "3440400989990"
//   },
//   {
//     "fullyQualifiedName": "requestAddress1",
//     "partialName": "requestAddress1",
//     "type": "org.apache.pdfbox.pdmodel.interactive.form.PDTextField",
//     "isRequired": false,
//     "page": 0,
//     "cords": {
//       "x": "191.674",
//       "y": "664.109",
//       "width": "345.781",
//       "height": "11.880005"
//     },
//     "value": "44 หมู่ 24"
//   },
//   {
//     "fullyQualifiedName": "requestAddress2",
//     "partialName": "requestAddress2",
//     "type": "org.apache.pdfbox.pdmodel.interactive.form.PDTextField",
//     "isRequired": false,
//     "page": 0,
//     "cords": {
//       "x": "71.76",
//       "y": "648.72",
//       "width": "392.75998",
//       "height": "11.880005"
//     },
//     "value": "ต.นาสีนวน อ.กันทรวิขัย จ.มหาสารคาม"
//   },
//   {
//     "fullyQualifiedName": "toggleNoChronic",
//     "partialName": "toggleNoChronic",
//     "type": "org.apache.pdfbox.pdmodel.interactive.form.PDCheckBox",
//     "isRequired": false,
//     "page": 0,
//     "cords": {
//       "x": "252.0",
//       "y": "578.52",
//       "width": "9.720001",
//       "height": "9.643005"
//     },
//     "value": "On"
//   },
//   {
//     "fullyQualifiedName": "toggleChronic",
//     "partialName": "toggleChronic",
//     "type": "org.apache.pdfbox.pdmodel.interactive.form.PDCheckBox",
//     "isRequired": false,
//     "page": 0,
//     "cords": {
//       "x": "285.48",
//       "y": "578.52",
//       "width": "9.720001",
//       "height": "9.0"
//     },
//     "value": "Off"
//   },
//   {
//     "fullyQualifiedName": "otherChronic",
//     "partialName": "otherChronic",
//     "type": "org.apache.pdfbox.pdmodel.interactive.form.PDTextField",
//     "isRequired": false,
//     "page": 0,
//     "cords": {
//       "x": "338.4",
//       "y": "578.52",
//       "width": "195.24002",
//       "height": "13.919983"
//     },
//     "value": "-"
//   },
//   {
//     "fullyQualifiedName": "toggleNoAccident",
//     "partialName": "toggleNoAccident",
//     "type": "org.apache.pdfbox.pdmodel.interactive.form.PDCheckBox",
//     "isRequired": false,
//     "page": 0,
//     "cords": {
//       "x": "252.0",
//       "y": "557.88",
//       "width": "9.720001",
//       "height": "9.0"
//     },
//     "value": "On"
//   },
//   {
//     "fullyQualifiedName": "toggleAccident",
//     "partialName": "toggleAccident",
//     "type": "org.apache.pdfbox.pdmodel.interactive.form.PDCheckBox",
//     "isRequired": false,
//     "page": 0,
//     "cords": {
//       "x": "285.48",
//       "y": "557.88",
//       "width": "9.720001",
//       "height": "9.0"
//     },
//     "value": "Off"
//   },
//   {
//     "fullyQualifiedName": "otherAccident",
//     "partialName": "otherAccident",
//     "type": "org.apache.pdfbox.pdmodel.interactive.form.PDTextField",
//     "isRequired": false,
//     "page": 0,
//     "cords": {
//       "x": "338.4",
//       "y": "557.88",
//       "width": "195.36002",
//       "height": "13.919983"
//     },
//     "value": "-"
//   },
//   {
//     "fullyQualifiedName": "toggleNoAdmitted",
//     "partialName": "toggleNoAdmitted",
//     "type": "org.apache.pdfbox.pdmodel.interactive.form.PDCheckBox",
//     "isRequired": false,
//     "page": 0,
//     "cords": {
//       "x": "252.0",
//       "y": "537.24",
//       "width": "9.720001",
//       "height": "9.0"
//     },
//     "value": "On"
//   },
//   {
//     "fullyQualifiedName": "toggleAdmitted",
//     "partialName": "toggleAdmitted",
//     "type": "org.apache.pdfbox.pdmodel.interactive.form.PDCheckBox",
//     "isRequired": false,
//     "page": 0,
//     "cords": {
//       "x": "285.48",
//       "y": "537.24",
//       "width": "9.720001",
//       "height": "9.0"
//     },
//     "value": "Off"
//   },
//   {
//     "fullyQualifiedName": "otherAdmitted",
//     "partialName": "otherAdmitted",
//     "type": "org.apache.pdfbox.pdmodel.interactive.form.PDTextField",
//     "isRequired": false,
//     "page": 0,
//     "cords": {
//       "x": "338.52",
//       "y": "537.24",
//       "width": "195.24002",
//       "height": "13.919983"
//     },
//     "value": "-"
//   },
//   {
//     "fullyQualifiedName": "otherHistory",
//     "partialName": "otherHistory",
//     "type": "org.apache.pdfbox.pdmodel.interactive.form.PDTextField",
//     "isRequired": false,
//     "page": 0,
//     "cords": {
//       "x": "164.16",
//       "y": "517.32",
//       "width": "370.19998",
//       "height": "13.919983"
//     },
//     "value": "-"
//   },
//   {
//     "fullyQualifiedName": "doctorHospital",
//     "partialName": "doctorHospital",
//     "type": "org.apache.pdfbox.pdmodel.interactive.form.PDTextField",
//     "isRequired": false,
//     "page": 0,
//     "cords": {
//       "x": "360.36",
//       "y": "380.88",
//       "width": "178.32",
//       "height": "13.919983"
//     },
//     "value": "โรงพยาบาลกันทรวิชัย"
//   },
//   {
//     "fullyQualifiedName": "checkupPlace",
//     "partialName": "checkupPlace",
//     "type": "org.apache.pdfbox.pdmodel.interactive.form.PDTextField",
//     "isRequired": false,
//     "page": 0,
//     "cords": {
//       "x": "125.138",
//       "y": "415.327",
//       "width": "220.794",
//       "height": "12.632996"
//     },
//     "value": "โรงพยาบาลกันทรวิชัย"
//   },
//   {
//     "fullyQualifiedName": "doctorName",
//     "partialName": "doctorName",
//     "type": "org.apache.pdfbox.pdmodel.interactive.form.PDTextField",
//     "isRequired": false,
//     "page": 0,
//     "cords": {
//       "x": "190.2",
//       "y": "398.4",
//       "width": "348.47998",
//       "height": "13.920013"
//     },
//     "value": "ทดสอบ ไม่เอาจริง"
//   },
//   {
//     "fullyQualifiedName": "doctorLicenseNo",
//     "partialName": "doctorLicenseNo",
//     "type": "org.apache.pdfbox.pdmodel.interactive.form.PDTextField",
//     "isRequired": false,
//     "page": 0,
//     "cords": {
//       "x": "227.4",
//       "y": "380.88",
//       "width": "66.119995",
//       "height": "13.919983"
//     },
//     "value": "41223"
//   },
//   {
//     "fullyQualifiedName": "doctorHospitalAddress",
//     "partialName": "doctorHospitalAddress",
//     "type": "org.apache.pdfbox.pdmodel.interactive.form.PDTextField",
//     "isRequired": false,
//     "page": 0,
//     "cords": {
//       "x": "90.48",
//       "y": "363.36",
//       "width": "448.80002",
//       "height": "13.920013"
//     },
//     "value": "294 หมู่ 2 ต.โคกพระ อ.กันทรวิชัย จ.มหาสารคาม"
//   },
//   {
//     "fullyQualifiedName": "patientName",
//     "partialName": "patientName",
//     "type": "org.apache.pdfbox.pdmodel.interactive.form.PDTextField",
//     "isRequired": false,
//     "page": 0,
//     "cords": {
//       "x": "202.56",
//       "y": "345.84",
//       "width": "336.59998",
//       "height": "13.920013"
//     },
//     "value": "สถิตย์ เรียนพิศ"
//   },
//   {
//     "fullyQualifiedName": "checkupDate",
//     "partialName": "checkupDate",
//     "type": "org.apache.pdfbox.pdmodel.interactive.form.PDTextField",
//     "isRequired": false,
//     "page": 0,
//     "cords": {
//       "x": "119.642",
//       "y": "328.45",
//       "width": "47.089996",
//       "height": "13.919983"
//     },
//     "value": "27"
//   },
//   {
//     "fullyQualifiedName": "checkupMonth",
//     "partialName": "checkupMonth",
//     "type": "org.apache.pdfbox.pdmodel.interactive.form.PDTextField",
//     "isRequired": false,
//     "page": 0,
//     "cords": {
//       "x": "193.327",
//       "y": "328.45",
//       "width": "73.47601",
//       "height": "13.919983"
//     },
//     "value": "เมษายน"
//   },
//   {
//     "fullyQualifiedName": "checkupYear",
//     "partialName": "checkupYear",
//     "type": "org.apache.pdfbox.pdmodel.interactive.form.PDTextField",
//     "isRequired": false,
//     "page": 0,
//     "cords": {
//       "x": "289.126",
//       "y": "327.251",
//       "width": "41.941986",
//       "height": "15.207001"
//     },
//     "value": "2563"
//   },
//   {
//     "fullyQualifiedName": "height",
//     "partialName": "height",
//     "type": "org.apache.pdfbox.pdmodel.interactive.form.PDTextField",
//     "isRequired": false,
//     "page": 0,
//     "cords": {
//       "x": "205.233",
//       "y": "311.396",
//       "width": "36.149994",
//       "height": "14.563019"
//     },
//     "value": "160"
//   },
//   {
//     "fullyQualifiedName": "bp",
//     "partialName": "bp",
//     "type": "org.apache.pdfbox.pdmodel.interactive.form.PDTextField",
//     "isRequired": false,
//     "page": 0,
//     "cords": {
//       "x": "341.574",
//       "y": "311.484",
//       "width": "43.872986",
//       "height": "13.276978"
//     },
//     "value": "120/80"
//   },
//   {
//     "fullyQualifiedName": "weight",
//     "partialName": "weight",
//     "type": "org.apache.pdfbox.pdmodel.interactive.form.PDTextField",
//     "isRequired": false,
//     "page": 0,
//     "cords": {
//       "x": "112.708",
//       "y": "311.895",
//       "width": "36.15",
//       "height": "14.563019"
//     },
//     "value": "55"
//   },
//   {
//     "fullyQualifiedName": "pulse",
//     "partialName": "pulse",
//     "type": "org.apache.pdfbox.pdmodel.interactive.form.PDTextField",
//     "isRequired": false,
//     "page": 0,
//     "cords": {
//       "x": "451.531",
//       "y": "312.216",
//       "width": "49.664",
//       "height": "14.563995"
//     },
//     "value": "70"
//   },
//   {
//     "fullyQualifiedName": "toggleNormal",
//     "partialName": "toggleNormal",
//     "type": "org.apache.pdfbox.pdmodel.interactive.form.PDCheckBox",
//     "isRequired": false,
//     "page": 0,
//     "cords": {
//       "x": "193.68",
//       "y": "287.52",
//       "width": "12.12001",
//       "height": "11.279999"
//     },
//     "value": "On"
//   },
//   {
//     "fullyQualifiedName": "toggleAbnormal",
//     "partialName": "toggleAbnormal",
//     "type": "org.apache.pdfbox.pdmodel.interactive.form.PDCheckBox",
//     "isRequired": false,
//     "page": 0,
//     "cords": {
//       "x": "237.6",
//       "y": "287.52",
//       "width": "12.119995",
//       "height": "11.279999"
//     },
//     "value": "Off"
//   },
//   {
//     "fullyQualifiedName": "checkupRemark",
//     "partialName": "checkupRemark",
//     "type": "org.apache.pdfbox.pdmodel.interactive.form.PDTextField",
//     "isRequired": false,
//     "page": 0,
//     "cords": {
//       "x": "305.16",
//       "y": "287.52",
//       "width": "234.36002",
//       "height": "13.920013"
//     },
//     "value": "-"
//   },
//   {
//     "fullyQualifiedName": "denyRemark1",
//     "partialName": "denyRemark1",
//     "type": "org.apache.pdfbox.pdmodel.interactive.form.PDTextField",
//     "isRequired": false,
//     "page": 0,
//     "cords": {
//       "x": "157.92",
//       "y": "165.36",
//       "width": "379.8",
//       "height": "13.919998"
//     },
//     "value": ""
//   },
//   {
//     "fullyQualifiedName": "denyRemark2",
//     "partialName": "denyRemark2",
//     "type": "org.apache.pdfbox.pdmodel.interactive.form.PDTextField",
//     "isRequired": false,
//     "page": 0,
//     "cords": {
//       "x": "71.28",
//       "y": "150.36",
//       "width": "466.80002",
//       "height": "12.2400055"
//     },
//     "value": ""
//   },
//   {
//     "fullyQualifiedName": "doctorNote1",
//     "partialName": "doctorNote1",
//     "type": "org.apache.pdfbox.pdmodel.interactive.form.PDTextField",
//     "isRequired": false,
//     "page": 0,
//     "cords": {
//       "x": "218.4",
//       "y": "134.16",
//       "width": "320.63998",
//       "height": "13.919998"
//     },
//     "value": "สุขภาพดี สมบูรณ์ แข็งแรง"
//   },
//   {
//     "fullyQualifiedName": "doctorNote2",
//     "partialName": "doctorNote2",
//     "type": "org.apache.pdfbox.pdmodel.interactive.form.PDTextField",
//     "isRequired": false,
//     "page": 0,
//     "cords": {
//       "x": "72.0",
//       "y": "119.16",
//       "width": "466.8",
//       "height": "12.23999"
//     },
//     "value": ""
//   },
//   {
//     "fullyQualifiedName": "doctorNote3",
//     "partialName": "doctorNote3",
//     "type": "org.apache.pdfbox.pdmodel.interactive.form.PDTextField",
//     "isRequired": false,
//     "page": 0,
//     "cords": {
//       "x": "72.48",
//       "y": "105.48",
//       "width": "466.80002",
//       "height": "11.399994"
//     },
//     "value": ""
//   }
// ];

// PdfCliWrapper.embedFormFields(readablePdf, data, outputPdf, { flatten: true })
//   .then(() => {
//     console.log('success');
//   }).catch(error => {
//     console.log(error);
//   })