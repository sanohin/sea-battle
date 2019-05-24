import { shipIntersects } from "./deck";

describe("shipIntersects", () => {
  it("no intersection", () => {
    const int = shipIntersects({ x1: 1, x2: 1, y1: 4, y2: 7 });
    expect(int({ x1: 1, x2: 1, y1: 1, y2: 1 })).toBeFalsy();
    expect(int({ x1: 5, x2: 5, y1: 4, y2: 7 })).toBeFalsy();
    expect(int({ x1: 5, x2: 5, y1: 0, y2: 7 })).toBeFalsy();
  });
  it("has direct intersection", () => {
    const int = shipIntersects({ x1: 3, x2: 3, y1: 4, y2: 7 });
    expect(int({ x1: 2, x2: 4, y1: 5, y2: 5 })).toBeTruthy();
    expect(int({ x1: 2, x2: 3, y1: 4, y2: 5 })).toBeTruthy();
  });
  it("has intersection in nearest area", () => {
    const int = shipIntersects({ x1: 3, x2: 3, y1: 4, y2: 7 });
    expect(int({ x1: 4, x2: 6, y1: 5, y2: 5 })).toBeTruthy();
    expect(int({ x1: 4, x2: 4, y1: 5, y2: 6 })).toBeTruthy();
  });
});
