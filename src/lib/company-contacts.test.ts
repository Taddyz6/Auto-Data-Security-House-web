import { describe, expect, it } from "vitest";
import { companyContacts } from "@/lib/constants";

describe("companyContacts", () => {
  it("包含当前两位企业联系人及其联系方式", () => {
    expect(companyContacts).toEqual([
      {
        name: "孙权",
        phone: "18121355993",
        email: "sunquan@catarc.ac.cn",
      },
      {
        name: "路宽",
        phone: "18917034853",
        email: "lukuan@catarc.ac.cn",
      },
    ]);
  });
});
