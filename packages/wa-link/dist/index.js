"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.openLink = exports.applyTemplate = exports.generateLink = void 0;
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
exports.generateLink = function (number, message) {
    var tel = ("" + number).replace(/\D/g, "");
    var text = encodeURIComponent(message);
    return "https://wa.me/" + tel + "?text=" + text;
};
exports.applyTemplate = function (object, template, start, end) {
    if (start === void 0) { start = "{"; }
    if (end === void 0) { end = "}"; }
    var message = template;
    Object.keys(object).map(function (tag) {
        message = message.replace(new RegExp("" + start + tag + end, "g"), object[tag]);
    });
    return message;
};
exports.openLink = function (link) {
    return window.open(link, "_blank");
};
exports.default = { generateLink: exports.generateLink, applyTemplate: exports.applyTemplate, openLink: exports.openLink };
