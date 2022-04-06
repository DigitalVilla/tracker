import { formatDate } from "./formatDate";

describe("formatDate Test", () => {
  test("returns a valid string date", () => {
    const expectedString = "15/02/22";
    const value = formatDate("{{dd}}/{{mm}}/{{yy}}", "feb 15 2022");
    expect(value).toBe(expectedString);
  });

  test("returns the birth day", () => {
    const expectedString = "You were born in Wednesday!";
    const value = formatDate("You were born in {{day}}!", "Jul 12 1989");
    expect(value).toBe(expectedString);
  });

  test("returns a valid string by timestamp", () => {
    const expectedString = "19/10/21 - 18:21:27";
    const value = formatDate(
      "{{dd}}/{{mm}}/{{yy}} - {{hr}}:{{min}}:{{sec}}",
      1634685687123,
    );
    expect(value).toBe(expectedString);
  });

  test("returns a valid string by object Date", () => {
    const expectedString = "Tomorrow is Feb 11, 22";
    const value = formatDate(
      "Tomorrow is {{mmm}} {{d}}, {{yy}}",
      new Date(1644603180856),
    );
    expect(value).toBe(expectedString);
  });

  test("error on missing template", () => {
    const expectedString =
      "Missing template. try something like: {{yyyy}}/{{mm}}/{{dd}}";
    const value = formatDate();
    expect(value).toBe(expectedString);
  });

  test("error on unknown format key", () => {
    const expectedString = "Unknown format type: test";
    const value = formatDate("{{month}}{{test}}{{year}}");
    expect(value).toBe(expectedString);
  });
});
