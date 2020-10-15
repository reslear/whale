"use strict";Object.defineProperty(exports, "__esModule", {value: true});// src/index.ts
var generateLink = function (number, message) {
  var tel = ("" + number).replace(/\D/g, "");
  var text = encodeURIComponent(message);
  return ("https://wa.me/" + tel + "?text=" + text);
};
var src_default = {generateLink: generateLink};


exports.default = src_default;
