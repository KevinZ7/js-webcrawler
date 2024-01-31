import { normalizeURL } from "./crawl";

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
