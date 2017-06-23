"use strict";

const loaderUtils = require('loader-utils');
const parse = require("./parse");
module.exports = function (source, map) {
    this.cacheable && this.cacheable();
    const data = loaderUtils.getOptions(this);
  
    try {
        source = parse(source, data);
        this.callback(null, source, map);
    }
    catch (err) {
        var errorMessage = "parse error: " + err;
        this.callback(new Error(errorMessage));
    }
};
