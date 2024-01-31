import { JSDOM } from "jsdom";

export const getURLSFromHTML = (htmlBody, baseURL) => {
  const urls = [];
  const dom = new JSDOM(htmlBody);
  const linkElements = dom.window.document.querySelectorAll("a");
  for (const linkElement of linkElements) {
    urls.push(linkElement.href);
  }

  return urls;
};

export const normalizeURL = (urlString) => {
  const urlObj = new URL(urlString);
  const hostPath = `${urlObj.hostname}${urlObj.pathname}`;

  if (hostPath.slice(-1) === "/") {
    return hostPath.slice(0, -1);
  }

  return hostPath;
};
