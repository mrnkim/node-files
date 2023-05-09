"use strict";

const fsP = require("fs/promises");
const axios = require("axios");
const isUrl = require("is-url");

/**
 * Read file from a given path
 */

async function cat(path) {
  try {
    let contents = await fsP.readFile(path, "utf8");
    return contents;
  } catch (err) {
    console.log(err.message);
    process.exit(1);
  }
}

/**
 * Read file from a given url
 */

async function webCat(url) {
  try {
    let contents = await axios.get(url);
    return contents;
  } catch (err) {
    console.log(err.message);
    process.exit(1);
  }
}

/**
 * Check if str is local path or url and run appropriate cat function
 */

async function catOrWebCat(str) {
  return(isUrl(str) ? await webCat(str) : await cat(str));
}

/**
 * Reads from source and writes to file
 * OR reads from source and prints contents
 */
async function readOrWrite(args){

  if (args[2] === '--out'){
    //console.log("writing to file:",args[3])
    const content = await catOrWebCat(args[4])
    writeToFile(args[3], content)
  }
  else{
    //console.log("reading from:",args[2])
    console.log(catOrWebCat(args[2]))
  }
}

/**
 * Writes contents to file
 */
async function writeToFile(fileName, content){
  try{
    await fsP.writeFile(fileName, String(content), "utf8");
  }
  catch(err){
    console.log(err.message)
  }
}


readOrWrite(process.argv);
