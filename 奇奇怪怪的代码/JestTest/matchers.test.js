
// toBe 相当于 严格匹配 === 

test("红豆生南国下一句", () => {
    expect("春来发几枝").toBe("春来发几枝");
});

// toEqual 相当于 不严格匹配 ==
test("测试严格相等", () => {
    const momo = { number: 77 };

    expect(momo).toEqual({number: 77});
});

// toBeNul() 匹配 null
test("toBeNull测试", () => {
    const a = null;
    expect(a).toBeNull();
});

// toBeUndifined()  匹配 undefined
test('toBeUndifined测试', () => {
    const momo = undefined;
    expect(momo).toBeUndefined();
});

// toBeDefined() 匹配 定义了的变量
test("toBeDefined测试", () => {
    const momo = "kaka";
    expect(momo).toBeDefined();
});

// toBeTruthy() 匹配 真
test("toBeTruthy 测试", () => {
    const momo = 1;
    expect(momo).toBeTruthy();
});

// toBeFalsy() 匹配 假
test("toBeFalsy 测试", () => {
    const momo = 0;
    expect(momo).toBeFalsy();
});

// toBeGreaterThan() 最大值限制 相当于momo< 
test("toBeGreaterThan 匹配器", () => {
    const momo = 10;
    expect(momo).toBeGreaterThan(9);
});

// toBeLessThan() 最小值限制 相当于momo>
test("toBeLessThan匹配器", () => {
    const momo = 10;
    expect(momo).toBeLessThan(11);
});

// toBeGreaterThanOrEqual() 匹配 momo<=
test("toBeGreaterThanEqual匹配", () => {
    const momo = 10;
    expect(momo).toBeGreaterThanOrEqual(10);
    expect(momo).toBeGreaterThanOrEqual(9);
});

// toBeLessThanOrEqual() momo>=
test("toBeLessThanOrEqual", () => {
    const momo = 12;
    expect(momo).toBeLessThanOrEqual(12);
    expect(momo).toBeLessThanOrEqual(13);
});

// toBeCloseTo() 会消除浮点精度错误
test("toBeCloseTo", () => {
    const one = 0.1;
    const two = 0.2;
    expect(one + two).toBeCloseTo(0.3);
});

// toMatch 字符串包含匹配器 也能用正则匹配器
test("toMatch", () => {
    const str = "momo,kaka,lili";
    expect(str).toMatch(/momo/);
});

// toContain 数组包含关系
test("toContain", () => {
    const arr = ["nana", "momo", "koko"];
    expect(arr).toContain("nana");
});

// toThrow  也可以加一些字符串，意思就是抛出的异常必须和字符串相对应
test("toThrow", () => {
    const throwNewErrorFunc = () => {
        throw new Error("this is a new error");
    };

    expect(throwNewErrorFunc).toThrow("this is a new error");
});

// not匹配 取反匹配器
test("toThrow", () => {
    const throwNewErrorFunc = () => {
        // throw new Error("this is a new error");
    };

    expect(throwNewErrorFunc).not.toThrow();
});

