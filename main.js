import { crawlPage } from "./crawl.js";
const main = async () => {
  if (process.argv.length < 3) {
    console.log("no websites provided");
    process.exit(1);
  }

  if (process.argv.length > 3) {
    console.log("too many websites provided, expecting 1 website argument");
    process.exit(1);
  }

  const baseUrl = process.argv[2];

  const pages = await crawlPage(baseUrl, baseUrl, {});

  for (const page of Object.entries(pages)) {
    console.log(page);
  }
};

main();
