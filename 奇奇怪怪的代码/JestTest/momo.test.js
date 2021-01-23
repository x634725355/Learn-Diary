import { kaka, momo } from "./momo";

test("momo 测试", () => {
    expect(momo(4000)).toBe("这里是momo");
});

test("kaka 测试", () => {
    expect(kaka(2000)).toBe("这里是kaka");
});
