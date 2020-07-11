
export class Stack {
    stack: []

    constructor() {
        this.stack = [];
    }

    push(item: any) {
        this.stack.push();
    }

    pop(item: any) {
        this.stack.pop();
    }

    peek() {
        return this.stack[this.getSize() - 1];
    }

    getSize() {
        return this.stack.length;
    }

    isEmpyt() {
        return this.stack.length;
    }

}