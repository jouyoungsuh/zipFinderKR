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
        var add = sdata.address;
        var array = add.split(" ");

        for (let i = array[1]; i <=array[3]; i++) {
            if (value = i) {
                return true;
            }
        }
        return false;
    },

    addressParser:function(address) {
        var jsonArr = [];
        for (let i = 1; i <= address.length-1; i++) {
            var divided = address[i].split(" ", 3);
            //console.log('d1', divided[0]);
            //console.log('d2', divided[1]);
            
            var index = address[i].indexOf(divided[1]) + divided[1].length + 2;
            divided[2] = address[i].slice(index, address[i].length);
            var parsed = divided[2].split(",", 2);
            divided[2] = parsed[0]
            //console.log('d3', divided[2]);
    
            var obj = {};
            obj['city'] = divided[0];
            obj['gu'] = divided[1];
            obj['address'] = divided[2];
            jsonArr.push(obj);
        }
        //var result = JSON.stringify(jsonArr)
        return jsonArr;
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
