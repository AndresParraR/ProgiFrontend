import { describe, expect, test } from "vitest";
import { formatCurrency } from "@/utils";

describe("FormatPrice", () => {
  test("FormatPrice: 1040320", () => {
    const val = formatCurrency(1040320);
    expect(val).toEqual("$1,040,320.00");
  });
});
