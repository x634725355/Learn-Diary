class RomanNumerals {



    constructor() {

    }

    toRoman(data: number) {
        let str: string = data.toString();
        let four: number = Number(str[0]) * 1000;
        let three: number = Number(str[1]) * 100;
        let two: number = Number(str[2]) * 100;
        let one: number = Number(str[3]) * 100;
    }

}