import { socialSettings } from "./presets/social";

export interface ISocialOptions {
  title?: string;
  description?: string;
}

export const share = (name: string, options: ISocialOptions) => {};

export const socialShare = (
  name: string,
  { title = "", description = "" }: ISocialOptions = {}
): void => {
  const url = window.location.href;

  let params = { url, description, title };

  let socialDataList = socialSettings.map((item) => {
    const result = item;
    result.params = Object.assign(item.params, params);
    return result;
  });

  const socialData = socialDataList.find((item) => item.key === name);
  if (!socialData) return;

  const socialQuery = new URLSearchParams(socialData.params).toString();
  const socialUrl = `${socialData.url}?${socialQuery}`;

  let featuresWindow = {
    scrollbars: 1,
    resizable: 1,
    menubar: 0,
    toolbar: 0,
    status: 0,
    left: (screen.width - socialData.w) / 2,
    top: (screen.height - socialData.h) / 2,
    width: socialData.w,
    height: socialData.h,
  };

  let featuresWindowQuery = Object.keys(featuresWindow)
    .map((key) => `${key}=${featuresWindow[key]}`)
    .join(",");

  window.open(socialUrl, "Share", featuresWindowQuery);
};

export interface mailShareOptions {
  mailto?: string;
  subject?: string;
  body?: string;
}

export const mailShare = ({
  mailto = "",
  subject = "",
  body = "",
}: mailShareOptions = {}) => {
  let link = `mailto:${mailto}?subject=${subject}&body=${body}`;

  let el = document.createElement("a");
  el.href = link;

  el.click();
};
