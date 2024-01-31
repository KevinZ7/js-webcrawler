export const normalizeURL = (urlString) => {
  const urlObj = new URL(urlString);
  const hostPath = `${urlObj.hostname}${urlObj.pathname}`;

  if (hostPath.slice(-1) === "/") {
    return hostPath.slice(0, -1);
  }

  return hostPath;
};
