import { JSDOM } from "jsdom";

export const crawlPage = async (currentUrl) => {
  console.log(`actively crawling: ${currentUrl}`);

  try {
    const resp = await fetch(currentUrl);

    const { status, headers } = resp;
    const contentType = headers.get("Content-Type");

    if (status > 399) {
      console.log(
        `error in fetch with status code: ${resp.status} on page: ${currentUrl}`
      );
      return;
    }

    if (!contentType.includes("text/html")) {
      console.log(
        `non html response, content type: ${contentType} on page: ${currentUrl}`
      );
      return;
    }

    console.log(await resp.text());
  } catch (e) {
    console.log(`error crawling ${currentUrl}: ${e}`);
  }
};
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
