import Comparator from "../utils/comparator/Comparator";
import LinkedListNode from "./LinkedListNode";

export default class LinkedList {

    head;
    tail;
    compare:Comparator;

    constructor(comparatorFunction: Function) {
        this.head = null;
        this.tail = null;

        this.compare = new Comparator(comparatorFunction);
    };

    append(value): LinkedList {
        const newNode: LinkedListNode = new LinkedListNode(value);

        // 如果头部没有数据 则将新节点添加到头部与尾部
        if (!this.head) {
            this.head = newNode;
            this.tail = newNode;

            return this;
        }
        
        // 将新节点添加到尾部
        this.tail.next = newNode;
        this.tail  = newNode;

        return this;
    };

    prepend(value): LinkedList {
        const newNode: LinkedListNode = new LinkedListNode(value);
        
        // 让新节点成为头部
        newNode.next = this.head;
        this.head = newNode;

        // 如果还没有尾部则将其设成尾部
        if (!this.tail) {
            this.tail = newNode;
        }
        
        return this;
    };

    delete(value): LinkedList {
        if (!this.head) {
            return null;
        }

        let deleteNode = null;

        while (this.head && this.compare.equal(this.head.value, value)) {
            deleteNode = this.head;
            this.head = this.head.next;
        }

        let currentNode = this.head;

        if (currentNode !== null) {
            while (currentNode.next) {
                if (this.compare.equal(currentNode.next.value, value)) {
                    deleteNode = currentNode.next;
                    currentNode.next = currentNode.next.next;
                } else {
                    currentNode = currentNode.next;
                }
            }
        }

        if (this.compare.equal(this.tail.value, value)) {
            this.tail = currentNode;
        }

        return deleteNode;
    };
    
}

