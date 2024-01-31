import { JSDOM } from "jsdom";

export const getURLSFromHTML = (htmlBody, baseURL) => {
  const urls = [];
  const dom = new JSDOM(htmlBody);
  const linkElements = dom.window.document.querySelectorAll("a");
  for (const linkElement of linkElements) {
    if (linkElement.href.slice(0, 1) == "/") {
      try {
        const urlObj = new URL(`${baseURL}${linkElement.href}`);
        urls.push(`${baseURL}${linkElement.href}`);
      } catch (e) {
        console.log(`error with relative url: ${e.message}`);
      }
    } else {
      try {
        const urlObj = new URL(linkElement.href);
        urls.push(linkElement.href);
      } catch (e) {
        console.log(`error with absolute url: ${e.message}`);
      }
    }
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
