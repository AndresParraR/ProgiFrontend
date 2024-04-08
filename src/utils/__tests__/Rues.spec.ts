import { describe, expect, test } from "vitest";
import { isRequired, maxLength, numbersValidation } from "@/utils";

describe("Rules", () => {
  test("isRequired false", () => {
    const val = isRequired("");
    expect(val).toEqual("Field required");
  });
  test("isRequired true", () => {
    const val = isRequired("text");
    expect(val).toEqual(true);
  });
  test("maxLength false", () => {
    const val = maxLength(12345678901);
    expect(val).toEqual("Please use maximum 10 characters");
  });
  test("maxLength true", () => {
    const val = maxLength(1800);
    expect(val).toEqual(true);
  });
  test("numbersValidation false", () => {
    const val = numbersValidation('1800e');
    expect(val).toEqual('Only integers numbers');
  });
  test("numbersValidation true", () => {
    const val = numbersValidation('1800');
    expect(val).toEqual(true);
  });
});
