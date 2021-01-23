export default class Poetry {
    topic(flag) {
        this.poetry = flag ? "云想衣裳花想容" : "若非群玉山头见";
    }

    sentence() {
        this.momo = this.poetry + "春风拂槛露华浓";
    }

    sentenceNext() {
        this.momo = this.poetry + "会向瑶台月下逢";
    }

    word() {
        this.momo = "青玉案·元夕";
    }

    wordSentence() {
        this.momo = "东风夜放花千树，更吹落，星如雨。宝马雕车香满路，凤箫声动，玉壶光转，一夜鱼龙舞";
    }

    wordNext() {
        this.momo = "蛾儿雪柳黄金缕，笑语盈盈暗香去。众里寻她千百度，蓦然回首，那人却在，灯火阑珊处";
    }


}


