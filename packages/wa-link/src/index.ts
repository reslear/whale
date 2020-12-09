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
export const generateLink = (
  number: string | number,
  message: string
): string => {
  let tel = `${number}`.replace(/\D/g, "");
  let text = encodeURIComponent(message);

  return `https://wa.me/${tel}?text=${text}`;
};

export const applyTemplate = (
  object: object,
  template: string,
  start = "{",
  end = "}"
) => {
  let message = template;

  Object.keys(object).map((tag) => {
    message = message.replace(
      new RegExp(`${start}${tag}${end}`, "g"),
      object[tag]
    );
  });

  return message;
};

export const openLink = (link: string) => {
  return window.open(link, "_blank");
};

export default { generateLink, applyTemplate, openLink };
