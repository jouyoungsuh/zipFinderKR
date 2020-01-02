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
  var parsedSeoulDB = tool.CSVaddressParser(output);

  /*
    console.log('parsedSeoulDB :');
    console.log(parsedSeoulDB);
  */
  console.log(parsedSeoulDB[1].address);
})


//reading and extracting raw data
var rawDBbook = xlsx.readFile('./data/raw data.xls');
var rawDBSheet = rawDBbook.Sheets[rawDBbook.SheetNames[0]];
var rawDB = [];
for (let i in rawDBSheet) {
  if(i.toString()[0] === 'G') {
    rawDB.push(rawDBSheet[i].v);
  }
}
var parsedRawDB = tool.addressParser(rawDB);

/*
  console.log('parsedRawDB :');
  console.log(parsedRawDB);
*/
console.log(parsedRawDB[1].address);

