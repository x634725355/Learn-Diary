// 有效位
class valid_bit {

    num: number;
    bit: number;
    link: [];

    constructor(b: number, i: number) {
        this.num = i; // 序号
        this.bit = b; // 数值
        this.link = []; // 组成成分, 7 = 4 + 2 + 1
    }
}

// 校验位
class check_bit {
    num: number;
    bit: number;
    link: [];

    constructor(i: number) {
        this.num = i;
        this.bit = null;
        this.link = [];
    }
}

// 根据有效位 计算校验位的最小数目r
function smallest_check_number(k: number):number {
    let r: number = 1;
    while (2 ** r - r - 1 < k) { r += 1; }
    return r;
}

// 检测输入字符串是否合乎规范
function is_standard(string: string):boolean {
    let mate0: RegExp = /0/g;
    let mate1: RegExp = /1/g;

    return string.match(mate0).length + string.match(mate1).length === string.length;
}

let valid = 1011;

let check = smallest_check_number(valid);




