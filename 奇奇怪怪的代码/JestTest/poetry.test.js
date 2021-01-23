import { TestScheduler } from "jest";
import Poetry from "./poetry";

const poetry = new Poetry();

// 所有测试用例之前进行执行
beforeAll(() => {
    console.log("李白");
});

// 在完成所以测试用例之后才执行的函数
afterAll(() => {
    console.log("字太白");
});

// 每个测试用例前都会执行一次的钩子函数
beforeEach(() => {
    console.log("朗诵开始");
});

// 每个测试用例完成测试之后会执行一次
afterEach(() => {
    console.log("朗诵结束");
});



describe("诗词前一段", () => {
    test("测试 诗歌 前两句", () => {
        poetry.topic(true);
        poetry.sentence();
        console.log(poetry.momo);
        expect(poetry.momo).toEqual("云想衣裳花想容春风拂槛露华浓");
    });

    test("测试 词 青玉案 前一段", () => {
        poetry.wordSentence();
        console.log(poetry.momo);
        expect(poetry.momo).toEqual("东风夜放花千树，更吹落，星如雨。宝马雕车香满路，凤箫声动，玉壶光转，一夜鱼龙舞");
    });
});

describe("诗词后一段", () => {
    test("测试 诗歌 后两句", () => {
        poetry.topic(false);
        poetry.sentenceNext();
        console.log(poetry.momo);
        expect(poetry.momo).toEqual("若非群玉山头见会向瑶台月下逢");
    });

    test("测试 词 青玉案 后一段", () => {
        poetry.wordNext();
        console.log(poetry.momo);
        expect(poetry.momo).toEqual("蛾儿雪柳黄金缕，笑语盈盈暗香去。众里寻她千百度，蓦然回首，那人却在，灯火阑珊处");
    });
})









