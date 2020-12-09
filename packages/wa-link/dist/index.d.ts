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
export declare const generateLink: (number: string | number, message: string) => string;
export declare const applyTemplate: (object: object, template: string, start?: string, end?: string) => string;
export declare const openLink: (link: string) => Window;
declare const _default: {
    generateLink: (number: string | number, message: string) => string;
    applyTemplate: (object: object, template: string, start?: string, end?: string) => string;
    openLink: (link: string) => Window;
};
export default _default;
