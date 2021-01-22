"use strict";
exports.__esModule = true;
var Comparator_1 = require("../utils/comparator/Comparator");
var LinkedListNode_1 = require("./LinkedListNode");
var LinkedList = /** @class */ (function () {
    function LinkedList(comparatorFunction) {
        this.head = null;
        this.tail = null;
        this.compare = new Comparator_1["default"](comparatorFunction);
    }
    ;
    LinkedList.prototype.append = function (value) {
        var newNode = new LinkedListNode_1["default"](value);
        // 如果头部没有数据 则将新节点添加到头部与尾部
        if (!this.head) {
            this.head = newNode;
            this.tail = newNode;
            return this;
        }
        // 将新节点添加到尾部
        this.tail.next = newNode;
        this.tail = newNode;
        return this;
    };
    ;
    LinkedList.prototype.prepend = function (value) {
        var newNode = new LinkedListNode_1["default"](value);
        // 让新节点成为头部
        newNode.next = this.head;
        this.head = newNode;
        // 如果还没有尾部则将其设成尾部
        if (!this.tail) {
            this.tail = newNode;
        }
        return this;
    };
    ;
    LinkedList.prototype["delete"] = function (value) {
        if (!this.head) {
            return null;
        }
        var deleteNode = null;
        while (this.head && this.compare.equal(this.head.value, value)) {
            deleteNode = this.head;
            this.head = this.head.next;
        }
        var currentNode = this.head;
        if (currentNode !== null) {
            while (currentNode.next) {
                if (this.compare.equal(currentNode.next.value, value)) {
                    deleteNode = currentNode.next;
                    currentNode.next = currentNode.next.next;
                }
                else {
                    currentNode = currentNode.next;
                }
            }
        }
        if (this.compare.equal(this.tail.value, value)) {
            this.tail = currentNode;
        }
        return deleteNode;
    };
    ;
    return LinkedList;
}());
exports["default"] = LinkedList;
