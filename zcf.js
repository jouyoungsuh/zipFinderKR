const http = require('http');
const fs = require('fs');
const url = require('url');
const xlsx = require('xlsx');
const iconv = require('iconv-lite');
const tool = require('./tool');

//reading a db csv file and convert them into json
fs.readFile('./data/seoul.csv', function (err, output) {
  if (err) {
    return console.log(err);
  }
  //decoding korean so that it is readable
  let conv = iconv.decode(output, 'euc-kr');

  bufferStr = conv.toString(); 
  bufferArr = bufferStr.split('\n'); 

  var parsedSeoulDB = [];
  var headers = bufferArr[0].split(',');
  for(var i = 1; i < bufferArr.length; i++) {
    var output = bufferArr[i].split(',');
    var obj = {};
    for(var j = 0; j < output.length; j++) {
      obj[headers[j].trim()] = output[j].trim();
    }
    parsedSeoulDB.push(obj);
  }

  JSON.stringify(parsedSeoulDB);
  //console.log('parsedSeoulDB :');
  //console.log(parsedSeoulDB);
  //console.log('range checker :' + tool.rangeChecker(parsedSeoulDB[1], 253));


  //reading and extracting raw data
  var rawDB = xlsx.readFile('./data/raw data.xls');
  var rawDBSheet = rawDB.Sheets[rawDB.SheetNames[0]];
  var address = [];
  for (let i in rawDBSheet) {
    if(i.toString()[0] === 'G') {
      address.push(rawDBSheet[i].v);
    }
  }
  var parsedRawDB = tool.addressParser(address);
  //console.log('parsedRawDB');
  //console.log(parsedRawDB);


  console.log(parsedSeoulDB[1]);
  console.log(parsedRawDB[1]);
})


