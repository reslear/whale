export interface socialShareOptions {
  title?: string;
  description?: string;
}

export const socialShare = (
  name: "vk" | "twitter" | "facebook",
  { title = "", description = "" }: socialShareOptions = {}
): void => {
  const url = window.location.href;

  const socialDataList = {
    vk: {
      url: "https://vk.com/share.php",
      params: { url, title },
      w: 550,
      h: 420,
    },
    twitter: {
      url: "https://twitter.com/share",
      params: { url, text: description },
      w: 550,
      h: 420,
    },
    facebook: {
      url: "https://www.facebook.com/sharer/sharer.php",
      params: { u: url },
      w: 800,
      h: 520,
    },
  };

  const socialData = socialDataList[name];
  if (!socialData) return;

  const socialQuery = new URLSearchParams(socialData.params as any).toString();
  const socialUrl = `${socialData.url}?${socialQuery}`;

  console.log(socialUrl);

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
    .map((key: any) => `${key}=${(featuresWindow as any)[key]}`)
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
