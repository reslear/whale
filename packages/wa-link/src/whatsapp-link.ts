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
const generateLink = (number: string | number, message: string): string => {
  let tel = `${number}`.replace(/\D/g, "");
  let text = encodeURIComponent(message);

  return `https://wa.me/${tel}?text=${text}`;
};

export default { generateLink };
