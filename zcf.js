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
  var parsedSeoulData = [];
  var headers = bufferArr[0].split(',');
  for(var i = 1; i < bufferArr.length; i++) {
    var output = bufferArr[i].split(',');
    var obj = {};
    for(var j = 0; j < output.length; j++) {
      obj[headers[j].trim()] = output[j].trim();
    }
    parsedSeoulData.push(obj);
  }
  JSON.stringify(parsedSeoulData);
  //console.log(parsedSeoulData[1]);
  //console.log(tool.rangeChecker(parsedSeoulData[1], 253));


  //reading and extracting raw data
  var rawData = xlsx.readFile('./data/raw data.xls');
  var rawDataSheet = rawData.Sheets[rawData.SheetNames[0]];
  var address = [];
  for (let i in rawDataSheet) {
    if(i.toString()[0] === 'G') {
      address.push(rawDataSheet[i].v);
    }
  }
  var parsedRawData = tool.addressParser(address);
  //console.log(parsedRawData);


})


