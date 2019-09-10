/**
 * Library for storing and  rotating logs
 */
const fs = require('fs')
const path = require('path')
const util = require('util')
const open = util.promisify(fs.open)
const appendFile = util.promisify(fs.appendFile)
const close = util.promisify(fs.close)

//Container for the module
const lib = {}



// Base directory of logs folder
lib.baseDir = path.join(__dirname,'/../logs/');
//Append a string to a file. Create a file if it does not exist
lib.append = async(file, str) =>{
    try{
        //Openind the file for appending
        const fileDescriptor = await open(lib.baseDir + file + '.csv','a')
        await appendFile(fileDescriptor,str+'\n')
        await close(fileDescriptor)
        return null
    }catch(e){
        return e.message
    }
}

module.exports = lib