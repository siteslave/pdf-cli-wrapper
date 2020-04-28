const path = require('path');
const PdfCliWrapper = require('../index');

const readablePdf = path.join(__dirname, 'template.pdf')
const outputPdf = path.join(__dirname, 'out/filled.pdf')

// pdfCliWrap.getFormFields(readablePdf)
//   .then(files => {
//     console.log(files);
//   }).catch(error => {
//     console.log(error);
//   });


const data = [
  {
    "fullyQualifiedName": "bookNo",
    "partialName": "bookNo",
    "type": "org.apache.pdfbox.pdmodel.interactive.form.PDTextField",
    "isRequired": false,
    "page": 0,
    "cords": {
      "x": "96.72",
      "y": "736.8",
      "width": "49.08",
      "height": "13.919983"
    },
    "value": "9009"
  },
  {
    "fullyQualifiedName": "certificateNo",
    "partialName": "certificateNo",
    "type": "org.apache.pdfbox.pdmodel.interactive.form.PDTextField",
    "isRequired": false,
    "page": 0,
    "cords": {
      "x": "484.08",
      "y": "736.8",
      "width": "54.48001",
      "height": "13.919983"
    },
    "value": "910009"
  },
  {
    "fullyQualifiedName": "requestFullname",
    "partialName": "requestFullname",
    "type": "org.apache.pdfbox.pdmodel.interactive.form.PDTextField",
    "isRequired": false,
    "page": 0,
    "cords": {
      "x": "116.823",
      "y": "681.12",
      "width": "367.32",
      "height": "13.919983"
    },
    "value": "สถิตย์ เรียนพิศ"
  },
  {
    "fullyQualifiedName": "requestCID",
    "partialName": "requestCID",
    "type": "org.apache.pdfbox.pdmodel.interactive.form.PDTextField",
    "isRequired": false,
    "page": 0,
    "cords": {
      "x": "204.393",
      "y": "618.685",
      "width": "333.213",
      "height": "14.564026"
    },
    "value": "3440400989990"
  },
  {
    "fullyQualifiedName": "requestAddress1",
    "partialName": "requestAddress1",
    "type": "org.apache.pdfbox.pdmodel.interactive.form.PDTextField",
    "isRequired": false,
    "page": 0,
    "cords": {
      "x": "191.674",
      "y": "664.109",
      "width": "345.781",
      "height": "11.880005"
    },
    "value": "44 หมู่ 24"
  },
  {
    "fullyQualifiedName": "requestAddress2",
    "partialName": "requestAddress2",
    "type": "org.apache.pdfbox.pdmodel.interactive.form.PDTextField",
    "isRequired": false,
    "page": 0,
    "cords": {
      "x": "71.76",
      "y": "648.72",
      "width": "392.75998",
      "height": "11.880005"
    },
    "value": "ต.นาสีนวน อ.กันทรวิขัย จ.มหาสารคาม"
  },
  {
    "fullyQualifiedName": "toggleNoChronic",
    "partialName": "toggleNoChronic",
    "type": "org.apache.pdfbox.pdmodel.interactive.form.PDCheckBox",
    "isRequired": false,
    "page": 0,
    "cords": {
      "x": "252.0",
      "y": "578.52",
      "width": "9.720001",
      "height": "9.643005"
    },
    "value": "On"
  },
  {
    "fullyQualifiedName": "toggleChronic",
    "partialName": "toggleChronic",
    "type": "org.apache.pdfbox.pdmodel.interactive.form.PDCheckBox",
    "isRequired": false,
    "page": 0,
    "cords": {
      "x": "285.48",
      "y": "578.52",
      "width": "9.720001",
      "height": "9.0"
    },
    "value": "Off"
  },
  {
    "fullyQualifiedName": "otherChronic",
    "partialName": "otherChronic",
    "type": "org.apache.pdfbox.pdmodel.interactive.form.PDTextField",
    "isRequired": false,
    "page": 0,
    "cords": {
      "x": "338.4",
      "y": "578.52",
      "width": "195.24002",
      "height": "13.919983"
    },
    "value": "-"
  },
  {
    "fullyQualifiedName": "toggleNoAccident",
    "partialName": "toggleNoAccident",
    "type": "org.apache.pdfbox.pdmodel.interactive.form.PDCheckBox",
    "isRequired": false,
    "page": 0,
    "cords": {
      "x": "252.0",
      "y": "557.88",
      "width": "9.720001",
      "height": "9.0"
    },
    "value": "On"
  },
  {
    "fullyQualifiedName": "toggleAccident",
    "partialName": "toggleAccident",
    "type": "org.apache.pdfbox.pdmodel.interactive.form.PDCheckBox",
    "isRequired": false,
    "page": 0,
    "cords": {
      "x": "285.48",
      "y": "557.88",
      "width": "9.720001",
      "height": "9.0"
    },
    "value": "Off"
  },
  {
    "fullyQualifiedName": "otherAccident",
    "partialName": "otherAccident",
    "type": "org.apache.pdfbox.pdmodel.interactive.form.PDTextField",
    "isRequired": false,
    "page": 0,
    "cords": {
      "x": "338.4",
      "y": "557.88",
      "width": "195.36002",
      "height": "13.919983"
    },
    "value": "-"
  },
  {
    "fullyQualifiedName": "toggleNoAdmitted",
    "partialName": "toggleNoAdmitted",
    "type": "org.apache.pdfbox.pdmodel.interactive.form.PDCheckBox",
    "isRequired": false,
    "page": 0,
    "cords": {
      "x": "252.0",
      "y": "537.24",
      "width": "9.720001",
      "height": "9.0"
    },
    "value": "On"
  },
  {
    "fullyQualifiedName": "toggleAdmitted",
    "partialName": "toggleAdmitted",
    "type": "org.apache.pdfbox.pdmodel.interactive.form.PDCheckBox",
    "isRequired": false,
    "page": 0,
    "cords": {
      "x": "285.48",
      "y": "537.24",
      "width": "9.720001",
      "height": "9.0"
    },
    "value": "Off"
  },
  {
    "fullyQualifiedName": "otherAdmitted",
    "partialName": "otherAdmitted",
    "type": "org.apache.pdfbox.pdmodel.interactive.form.PDTextField",
    "isRequired": false,
    "page": 0,
    "cords": {
      "x": "338.52",
      "y": "537.24",
      "width": "195.24002",
      "height": "13.919983"
    },
    "value": "-"
  },
  {
    "fullyQualifiedName": "otherHistory",
    "partialName": "otherHistory",
    "type": "org.apache.pdfbox.pdmodel.interactive.form.PDTextField",
    "isRequired": false,
    "page": 0,
    "cords": {
      "x": "164.16",
      "y": "517.32",
      "width": "370.19998",
      "height": "13.919983"
    },
    "value": "-"
  },
  {
    "fullyQualifiedName": "doctorHospital",
    "partialName": "doctorHospital",
    "type": "org.apache.pdfbox.pdmodel.interactive.form.PDTextField",
    "isRequired": false,
    "page": 0,
    "cords": {
      "x": "360.36",
      "y": "380.88",
      "width": "178.32",
      "height": "13.919983"
    },
    "value": "โรงพยาบาลกันทรวิชัย"
  },
  {
    "fullyQualifiedName": "checkupPlace",
    "partialName": "checkupPlace",
    "type": "org.apache.pdfbox.pdmodel.interactive.form.PDTextField",
    "isRequired": false,
    "page": 0,
    "cords": {
      "x": "125.138",
      "y": "415.327",
      "width": "220.794",
      "height": "12.632996"
    },
    "value": "โรงพยาบาลกันทรวิชัย"
  },
  {
    "fullyQualifiedName": "doctorName",
    "partialName": "doctorName",
    "type": "org.apache.pdfbox.pdmodel.interactive.form.PDTextField",
    "isRequired": false,
    "page": 0,
    "cords": {
      "x": "190.2",
      "y": "398.4",
      "width": "348.47998",
      "height": "13.920013"
    },
    "value": "ทดสอบ ไม่เอาจริง"
  },
  {
    "fullyQualifiedName": "doctorLicenseNo",
    "partialName": "doctorLicenseNo",
    "type": "org.apache.pdfbox.pdmodel.interactive.form.PDTextField",
    "isRequired": false,
    "page": 0,
    "cords": {
      "x": "227.4",
      "y": "380.88",
      "width": "66.119995",
      "height": "13.919983"
    },
    "value": "41223"
  },
  {
    "fullyQualifiedName": "doctorHospitalAddress",
    "partialName": "doctorHospitalAddress",
    "type": "org.apache.pdfbox.pdmodel.interactive.form.PDTextField",
    "isRequired": false,
    "page": 0,
    "cords": {
      "x": "90.48",
      "y": "363.36",
      "width": "448.80002",
      "height": "13.920013"
    },
    "value": "294 หมู่ 2 ต.โคกพระ อ.กันทรวิชัย จ.มหาสารคาม"
  },
  {
    "fullyQualifiedName": "patientName",
    "partialName": "patientName",
    "type": "org.apache.pdfbox.pdmodel.interactive.form.PDTextField",
    "isRequired": false,
    "page": 0,
    "cords": {
      "x": "202.56",
      "y": "345.84",
      "width": "336.59998",
      "height": "13.920013"
    },
    "value": "สถิตย์ เรียนพิศ"
  },
  {
    "fullyQualifiedName": "checkupDate",
    "partialName": "checkupDate",
    "type": "org.apache.pdfbox.pdmodel.interactive.form.PDTextField",
    "isRequired": false,
    "page": 0,
    "cords": {
      "x": "119.642",
      "y": "328.45",
      "width": "47.089996",
      "height": "13.919983"
    },
    "value": "27"
  },
  {
    "fullyQualifiedName": "checkupMonth",
    "partialName": "checkupMonth",
    "type": "org.apache.pdfbox.pdmodel.interactive.form.PDTextField",
    "isRequired": false,
    "page": 0,
    "cords": {
      "x": "193.327",
      "y": "328.45",
      "width": "73.47601",
      "height": "13.919983"
    },
    "value": "เมษายน"
  },
  {
    "fullyQualifiedName": "checkupYear",
    "partialName": "checkupYear",
    "type": "org.apache.pdfbox.pdmodel.interactive.form.PDTextField",
    "isRequired": false,
    "page": 0,
    "cords": {
      "x": "289.126",
      "y": "327.251",
      "width": "41.941986",
      "height": "15.207001"
    },
    "value": "2563"
  },
  {
    "fullyQualifiedName": "height",
    "partialName": "height",
    "type": "org.apache.pdfbox.pdmodel.interactive.form.PDTextField",
    "isRequired": false,
    "page": 0,
    "cords": {
      "x": "205.233",
      "y": "311.396",
      "width": "36.149994",
      "height": "14.563019"
    },
    "value": "160"
  },
  {
    "fullyQualifiedName": "bp",
    "partialName": "bp",
    "type": "org.apache.pdfbox.pdmodel.interactive.form.PDTextField",
    "isRequired": false,
    "page": 0,
    "cords": {
      "x": "341.574",
      "y": "311.484",
      "width": "43.872986",
      "height": "13.276978"
    },
    "value": "120/80"
  },
  {
    "fullyQualifiedName": "weight",
    "partialName": "weight",
    "type": "org.apache.pdfbox.pdmodel.interactive.form.PDTextField",
    "isRequired": false,
    "page": 0,
    "cords": {
      "x": "112.708",
      "y": "311.895",
      "width": "36.15",
      "height": "14.563019"
    },
    "value": "55"
  },
  {
    "fullyQualifiedName": "pulse",
    "partialName": "pulse",
    "type": "org.apache.pdfbox.pdmodel.interactive.form.PDTextField",
    "isRequired": false,
    "page": 0,
    "cords": {
      "x": "451.531",
      "y": "312.216",
      "width": "49.664",
      "height": "14.563995"
    },
    "value": "70"
  },
  {
    "fullyQualifiedName": "toggleNormal",
    "partialName": "toggleNormal",
    "type": "org.apache.pdfbox.pdmodel.interactive.form.PDCheckBox",
    "isRequired": false,
    "page": 0,
    "cords": {
      "x": "193.68",
      "y": "287.52",
      "width": "12.12001",
      "height": "11.279999"
    },
    "value": "On"
  },
  {
    "fullyQualifiedName": "toggleAbnormal",
    "partialName": "toggleAbnormal",
    "type": "org.apache.pdfbox.pdmodel.interactive.form.PDCheckBox",
    "isRequired": false,
    "page": 0,
    "cords": {
      "x": "237.6",
      "y": "287.52",
      "width": "12.119995",
      "height": "11.279999"
    },
    "value": "Off"
  },
  {
    "fullyQualifiedName": "checkupRemark",
    "partialName": "checkupRemark",
    "type": "org.apache.pdfbox.pdmodel.interactive.form.PDTextField",
    "isRequired": false,
    "page": 0,
    "cords": {
      "x": "305.16",
      "y": "287.52",
      "width": "234.36002",
      "height": "13.920013"
    },
    "value": "-"
  },
  {
    "fullyQualifiedName": "denyRemark1",
    "partialName": "denyRemark1",
    "type": "org.apache.pdfbox.pdmodel.interactive.form.PDTextField",
    "isRequired": false,
    "page": 0,
    "cords": {
      "x": "157.92",
      "y": "165.36",
      "width": "379.8",
      "height": "13.919998"
    },
    "value": ""
  },
  {
    "fullyQualifiedName": "denyRemark2",
    "partialName": "denyRemark2",
    "type": "org.apache.pdfbox.pdmodel.interactive.form.PDTextField",
    "isRequired": false,
    "page": 0,
    "cords": {
      "x": "71.28",
      "y": "150.36",
      "width": "466.80002",
      "height": "12.2400055"
    },
    "value": ""
  },
  {
    "fullyQualifiedName": "doctorNote1",
    "partialName": "doctorNote1",
    "type": "org.apache.pdfbox.pdmodel.interactive.form.PDTextField",
    "isRequired": false,
    "page": 0,
    "cords": {
      "x": "218.4",
      "y": "134.16",
      "width": "320.63998",
      "height": "13.919998"
    },
    "value": "สุขภาพดี สมบูรณ์ แข็งแรง"
  },
  {
    "fullyQualifiedName": "doctorNote2",
    "partialName": "doctorNote2",
    "type": "org.apache.pdfbox.pdmodel.interactive.form.PDTextField",
    "isRequired": false,
    "page": 0,
    "cords": {
      "x": "72.0",
      "y": "119.16",
      "width": "466.8",
      "height": "12.23999"
    },
    "value": ""
  },
  {
    "fullyQualifiedName": "doctorNote3",
    "partialName": "doctorNote3",
    "type": "org.apache.pdfbox.pdmodel.interactive.form.PDTextField",
    "isRequired": false,
    "page": 0,
    "cords": {
      "x": "72.48",
      "y": "105.48",
      "width": "466.80002",
      "height": "11.399994"
    },
    "value": ""
  }
];

PdfCliWrapper.embedFormFields(readablePdf, data, outputPdf, { flatten: true })
  .then(() => {
    console.log('success');
  }).catch(error => {
    console.log(error);
  })