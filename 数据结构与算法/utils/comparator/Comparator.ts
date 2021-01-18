interface Any {
    a: any,
    b: any
}

export default class Comparator {

    compare: Function

    /**
     * @param {function (a: *, b: *)} [compareFunction]
     */
    constructor(compareFunction) {
        this.compare = compareFunction || Comparator.defaultCompareFunction;
    }

    static defaultCompareFunction(a: Any, b: Any): Number {
        if (a === b) return 0;

        return a < b ? -1 : 1;
    }

    equal(a: Any, b: Any): boolean {
        return this.compare(a, b) === 0;
    }

    /**
     * 检查 a 小于 b 吗
     */
    lessThan(a: Any, b: Any): boolean {
        return this.compare(a, b) < 0;
    }

    /**
     * 检查 a 大于 b吗
     * @param a 
     * @param b 
     */
    greaterThan(a: Any, b: Any): boolean {
        return this.compare(a, b) > 0;
    }

    /**
     * 检查变量“a”是否小于或等于“b”。
     * @param a 
     * @param b 
     */
    lessThanOrEqual(a: Any, b: Any): boolean {
        return this.lessThan(a, b) || this.equal(a, b);
    }

    /**
     * 检测变量a是否大于等于b
     * @param a 
     * @param b 
     */
    greaterThanOrEqual(a: Any, b: Any): boolean {
        return this.greaterThan(a, b) || this.equal(a, b);
    }

    /**
     * 反转比较顺序
     */
    reveres(): void {
        const compareOriginal = this.compare;
        this.compare = (a, b) => compareOriginal(b, a);
    }
}