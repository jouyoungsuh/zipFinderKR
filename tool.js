const iconv = require('iconv-lite');

module.exports = {
    rangeChecker:function(arr, value) {
        var add = arr.address;
        //first array is name of address, second is the start range, third is tilde(~), fourth is end range.
        var array = add.split(" ");

        for (let i = array[1]; i <=array[3]; i++) {
            if (value = i) {
                return true;
            }
        }
        return false;
    },

    rangeChecker2:function(sdata, rdata) {
        var rdataAddress = rdata.address;
        //rsplitted[0] will be showing its street name, and rsplitted[1] will be showing specific id
        var rsplitted = rdataAddress.split(" ");
        //console.log(rsplitted[0] +' '+ rsplitted[1]);

        var sdataAddress = sdata.address;
        //first array is name of address, second is the start range, third is tilde(~), fourth is end range.
        var ssplitted = sdataAddress.split(" ");

        var target = parseInt(rsplitted[1], 10);
        var a = parseInt(ssplitted[1], 10);
        var b = parseInt(ssplitted[3], 10)
        //console.log('target :' + target + ' a :' + a + ' b :' + b);

        for (let i = a; i <= b; i++) {
            console.log(i);
            if (target == i) {
                return true;
            }
        }
        return false
    },

    addressParser:function(rawDBbook) {
        var rawDBSheet = rawDBbook.Sheets[rawDBbook.SheetNames[0]];
        var rawDB = [];
        for (let i in rawDBSheet) {
            if(i.toString()[0] === 'G') {
                rawDB.push(rawDBSheet[i].v);
            }
        }

        var parsedRawDB = [];
        for (let i = 1; i <= rawDB.length-1; i++) {
            var divided = rawDB[i].split(" ", 3);
            //console.log('d1', divided[0]);
            //console.log('d2', divided[1]);
            
            var index = rawDB[i].indexOf(divided[1]) + divided[1].length + 2;
            divided[2] = rawDB[i].slice(index, rawDB[i].length);
            var parsed = divided[2].split(",", 2);
            divided[2] = parsed[0]
            //console.log('d3', divided[2]);
    
            var obj = {};
            obj['city'] = divided[0];
            obj['gu'] = divided[1];
            obj['address'] = divided[2];
            parsedRawDB.push(obj);
        }
        //var result = JSON.stringify(parsedRawDB)
        return parsedRawDB;
    }, 

    CSVaddressParser:function(output) {
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

        //JSON.stringify(parsedSeoulDB);
        //var result = JSON.stringify(parsedSeoulDB)
        return parsedSeoulDB;
    }
}
