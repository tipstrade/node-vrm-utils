import { getPlate, canGetPlate } from "./index";

describe("Plate utils", () => {
  it("Supported countries are valid", () => {
    expect(canGetPlate("gb")).toBe(true);
    expect(canGetPlate("GB")).toBe(true);
    expect(canGetPlate("gbr")).toBe(true);
    expect(canGetPlate("GBR")).toBe(true);
  });

  it("Unspported countries are valid", () => {
    expect(canGetPlate("DE")).toBe(false);
    expect(canGetPlate("DEU")).toBe(false);
  });

  it("Returns correct GBR plates", () => {
    const p1963 = getPlate("gbr", 1963);
    const p1998 = getPlate("gbr", 1998);
    const p2001 = getPlate("gbr", 2001);
    const p2010 = getPlate("gbr", 2010);

    expect(getPlate("gbr", 1962).length).toBe(0);

    expect(p1963.length).toBe(1);
    expect(p1963[0].serial).toBe("A");

    expect(p1998.length).toBe(2);
    expect(p1998[0].serial).toBe("R");
    expect(p1998[1].serial).toBe("S");

    expect(p2001.length).toBe(3);
    expect(p2001[0].serial).toBe("X");
    expect(p2001[1].serial).toBe("Y");
    expect(p2001[2].serial).toBe("51");

    expect(p2010.length).toBe(3);
    expect(p2010[0].serial).toBe("59");
    expect(p2010[0].issued.getFullYear()).toBe(2009);
    expect(p2010[1].serial).toBe("10");
    expect(p2010[1].issued.getFullYear()).toBe(2010);
    expect(p2010[2].serial).toBe("60");
    expect(p2010[2].issued.getFullYear()).toBe(2010);
  });

  it("Returns correct IRL plates", () => {
    const p2013 = getPlate("irl", 2013);

    expect(getPlate("irl", 1986).length).toBe(0);

    expect(getPlate("irl", 1987)[0].serial).toBe("87");
    expect(getPlate("irl", 2012)[0].serial).toBe("12");

    expect(p2013.length).toBe(2);
    expect(p2013[0].serial).toBe("131");
    expect(p2013[0].issued.getFullYear()).toBe(2013);
    expect(p2013[1].serial).toBe("132");
    expect(p2013[1].issued.getFullYear()).toBe(2013);
  });
});
