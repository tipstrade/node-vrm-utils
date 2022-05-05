import { canFormat, formatVrm } from "./index";

describe("VRM Formatter", () => {
  it("Supported countries are valid", () => {
    expect(canFormat("gb")).toBe(true);
    expect(canFormat("GB")).toBe(true);
    expect(canFormat("gbr")).toBe(true);
    expect(canFormat("GBR")).toBe(true);
  });

  it("Unspported countries are valid", () => {
    expect(canFormat("DE")).toBe(false);
    expect(canFormat("DEU")).toBe(false);
  });

  it("Formats GBR VRM correctly", () => {
    expect(formatVrm("gbr", "A 1")).toBe("A 1");
    expect(formatVrm("gbr", "A1")).toBe("A 1");
    expect(formatVrm("gbr", "100E")).toBe("100 E");
    expect(formatVrm("gbr", "JIM1")).toBe("JIM 1");
    expect(formatVrm("gbr", "abc1x")).toBe("ABC 1X");
    expect(formatVrm("gbr", "v547abc")).toBe("V547 ABC");
    expect(formatVrm("gbr", "ND19abc")).toBe("ND19 ABC");
  });

  it("Formats IRL VRM correctly", () => {
    expect(formatVrm("irl", "87D1000")).toBe("87-D-1000");
    expect(formatVrm("irl", "87 D 1000")).toBe("87-D-1000");
    expect(formatVrm("irl", "87-D-1000")).toBe("87-D-1000");

    expect(formatVrm("irl", "131D1000")).toBe("131-D-1000");
    expect(formatVrm("irl", "131 D 1000")).toBe("131-D-1000");
    expect(formatVrm("irl", "131-D-1000")).toBe("131-D-1000");

    expect(formatVrm("irl", "ic 1")).toBe("IC1");
  });
});
