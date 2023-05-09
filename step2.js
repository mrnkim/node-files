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
    console.log(contents)
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
    console.log(contents)
  } catch (err) {
    console.log(err.message);
    process.exit(1);
  }
}

/**
 * Check if str is local path or url and run appropriate cat function
 */

async function catOrWebCat(str) {
  isUrl(str) ? webCat(str) : cat(str)
}

catOrWebCat(process.argv[2]);
