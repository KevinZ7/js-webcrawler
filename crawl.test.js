import exp from "constants";
import { normalizeURL, getURLSFromHTML } from "./crawl";

const INPUT_URL = "https://test.dev/path";
const EXPECTED_URL = "test.dev/path";

describe("normalizeUrl function", () => {
  test("normalizeUrl strip protocol", () => {
    const input = "https://test.dev/path";
    const output = normalizeURL(input);
    const expectedOutput = "test.dev/path";
    expect(output).toEqual(expectedOutput);
  });

  test("normalizeUrl strip trailing slash in path", () => {
    const input = "https://test.dev/path/";
    const output = normalizeURL(input);
    const expectedOutput = "test.dev/path";
    expect(output).toEqual(expectedOutput);
  });

  test("normalizeUrl capitals ", () => {
    const input = "https://Test.Dev/path";
    const output = normalizeURL(input);
    const expectedOutput = "test.dev/path";
    expect(output).toEqual(expectedOutput);
  });

  test("normalizeUrl strip http ", () => {
    const input = "http://Test.Dev/path";
    const output = normalizeURL(input);
    const expectedOutput = "test.dev/path";
    expect(output).toEqual(expectedOutput);
  });
});

describe("getURLSFromHTML function", () => {
  test("get urls from html", () => {
    const inputHTMLBody = `
    <html>
      <body>
        <a href="${INPUT_URL}">
          test.dev
        </a>
      </body>
    </html>
    `;

    const inputBaseUrl = INPUT_URL;
    const actual = getURLSFromHTML(inputHTMLBody, inputBaseUrl);
    const expected = [INPUT_URL];
    expect(actual).toEqual(expected);
  });
});
