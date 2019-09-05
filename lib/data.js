/*
 * Library for storing and editing data
 *
 */

// Dependencies
const fs = require('fs')
const path = require('path')
const util = require('util')
const readFile = util.promisify(fs.readFile)
const writeFile = util.promisify(fs.writeFile)
const open = util.promisify(fs.open)

// Container for module (to be exported)
const lib = {}

// Base directory of data folder
lib.baseDir = path.join(__dirname,'/../.data/')

// Read data from a file
lib.read = (file,callback)=>{
    //fs.readFile(lib.baseDir+dir+'/'+file+'.json', 'utf8', (err,data)=>{
    //fs.readFile(lib.baseDir+dir+'/'+file+'.txt', 'utf8', (err,data)=>{
    fs.readFile(lib.baseDir+file+'.txt', 'utf8', (err,data)=>{
      if(!err && data){
        //const parsedData = helpers.parseJsonToObject(data)
        callback(false,data)
      } else {
        callback(err,data)
      }
    })
  }

  lib.read1 = async(file)=>{
    //fs.readFile(lib.baseDir+dir+'/'+file+'.json', 'utf8', (err,data)=>{
    //fs.readFile(lib.baseDir+dir+'/'+file+'.txt', 'utf8', (err,data)=>{
    try{
      const data= await readFile(lib.baseDir+file+'.txt', 'utf8')
      return data

    }catch(e){
      console.log(e)
    }    
  }

  // Write data to a file
  lib.create = async(fileName,data)=>{
    // Open the file for writing
    try{
      const fileDescriptor = await open(lib.baseDir+fileName+'.txt', 'w')
      if(fileDescriptor){
        const result = await writeFile(fileDescriptor,data)
        return result
      }
    }
    catch(e){
      console.log('Error writing to new file')      
    }    
  }


  // Export the module
module.exports = lib