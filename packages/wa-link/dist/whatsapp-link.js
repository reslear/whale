"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 *
 * Generate link for send WhatsApp message
 * @param {(string | number)} tel - tel number send text TO ex: +375 (25) 699-00-34
 * @param {string} text - sended message
 * - `\n` - newline
 * - `*bold*`
 * - `_italic_`
 * - `~strike~`
 * - ` ```mono``` `
 * @return {*}  {string} - https://wa.me/number?text=text
 */
var generateLink = function (number, message) {
    var tel = ("" + number).replace(/\D/g, "");
    var text = encodeURIComponent(message);
    return "https://wa.me/" + tel + "?text=" + text;
};
exports.default = { generateLink: generateLink };
