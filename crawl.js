import { JSDOM } from "jsdom";

export const crawlPage = async (baseUrl, currentUrl, pages) => {
  const baseUrlObj = new URL(baseUrl);
  const currentUrlObj = new URL(currentUrl);
  if (baseUrlObj.hostname !== currentUrlObj.hostname) {
    return pages;
  }

  const normalizedCurrentUrl = normalizeURL(currentUrl);
  if (pages[normalizedCurrentUrl] > 0) {
    pages[normalizedCurrentUrl]++;
    return pages;
  }

  pages[normalizedCurrentUrl] = 1;

  console.log(`actively crawling: ${currentUrl}`);
  try {
    const resp = await fetch(currentUrl);

    const { status, headers } = resp;
    const contentType = headers.get("Content-Type");

    if (status > 399) {
      console.log(
        `error in fetch with status code: ${resp.status} on page: ${currentUrl}`
      );
      return pages;
    }

    if (!contentType.includes("text/html")) {
      console.log(
        `non html response, content type: ${contentType} on page: ${currentUrl}`
      );
      return pages;
    }

    const htmlBody = await resp.text();
    const nextUrls = getURLSFromHTML(htmlBody, baseUrl);

    for (const nextUrl of nextUrls) {
      pages = await crawlPage(baseUrl, nextUrl, pages);
    }
  } catch (e) {
    console.log(`error crawling ${currentUrl}: ${e}`);
  }

  return pages;
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
