const http = require('http');
const fs = require('fs');
const url = require('url');
const xlsx = require('xlsx');
const iconv = require('iconv-lite');
const tool = require('./tool');

var global_data = fs.readFileSync('./data/seoul.csv');
var parsedSeoulDB = tool.CSVaddressParser(global_data);
/*
  console.log('parsedSeoulDB :');
  console.log(parsedSeoulDB);
*/
console.log(parsedSeoulDB[1]);


var rawDBbook = xlsx.readFile('./data/raw data.xls');
var parsedRawDB = tool.addressParser(rawDBbook);
/*
  console.log('parsedRawDB :');
  console.log(parsedRawDB);
*/
console.log(parsedRawDB[1]);

//console.log(tool.rangeChecker(parsedSeoulDB[1], 255));
console.log('checking::' + tool.rangeChecker2(parsedSeoulDB[1], parsedRawDB[1]));