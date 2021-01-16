interface numStr {
    a: string | number,
    b: string | number
}

export default class Comparator {

    compare: Function

    /**
     * @param {function (a: *, b: *)} [compareFunction]
     */
    constructor(compareFunction) {
        this.compare = compareFunction || Comparator.defaultCompareFunction;
    }

    static defaultCompareFunction(a: numStr, b: numStr): Number {
        if (a === b) return 0;

        return a < b ? -1 : 1;
    }

    equal(a, b): boolean {
        return this.compare(a, b) === 0;
    }

    /**
     * 检查 a 小于 b 吗
     */
    lessThan(a, b): boolean {
        return this.compare(a, b) < 0;
    }

    /**
     * 检查 a 大于 b吗
     * @param a 
     * @param b 
     */
    greaterThan(a, b): boolean {
        return this.compare(a, b) > 0;
    }
}