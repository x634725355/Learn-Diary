// 有效位
class valid_bit {
    num: number;
    bit: string;
    link: [];

    constructor(b: string, i: number) {
        this.bit = b; // 数值
        this.num = i; // 序号
        this.link = []; // 组成成分, 7 = 4 + 2 + 1
    }
}

// 校验位
class check_bit {
    num: number;
    bit: string;
    link: [];

    constructor(i: number) {
        this.bit = null;
        this.num = i;
        this.link = [];
    }
}

// 根据有效位 计算校验位的最小数目r
function smallest_check_number(k: number):number {
    let r: number = 1;
    while (2 ** r - r - 1 < k) { r += 1; }
    return r;
}

// 有效位
let valid: string = "1011";
// 校验位 最小数目
let check_num = smallest_check_number(Number(valid));

// 存储字典
const hammingDictionary = {};
// 存储海明码
const hammingCode = [];
// 储存校验码
const checkList = [];

hammingCode.push(0);

for (let index = 1; index < valid.length; index++) {
    const element = new valid_bit(valid[index], index);

    // 向字典中添加位号对应的数值
    hammingDictionary[`b${index}`] = element;
    
    // 向字典中添加
    hammingCode[index].push(element);



}

