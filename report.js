export const printReport = (pages) => {
  console.log("==========");
  console.log("REPORT");
  console.log("==========");
  const sortedPages = sortPages(pages);
  for (const page of sortedPages) {
    const url = page[0];
    const hits = page[1];

    console.log(`Found ${hits} to page: ${url}`);
  }
  console.log("==========");
  console.log("END OF REPORT");
  console.log("==========");
};

export const sortPages = (pages) => {
  const pagesArr = Object.entries(pages);

  pagesArr.sort((a, b) => {
    return b[1] - a[1];
  });

  return pagesArr;
};
