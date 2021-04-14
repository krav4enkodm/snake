import { LinkedListNode } from './linked-list-node';

export class LinkedList<T> {
	private head: LinkedListNode<T> | null = null;

	private tail: LinkedListNode<T> | null = null;

	public prepend(value: T): LinkedList<T> {
		const newNode = new LinkedListNode(value, this.head);

		this.head = newNode;

		if (!this.tail) {
			this.tail = newNode;
		}

		return this;
	}

	public append(value: T): LinkedList<T> {
		const newNode = new LinkedListNode(value);

		if (!this.head || !this.tail) {
			this.head = newNode;
			this.tail = newNode;

			return this;
		}

		this.tail.next = newNode;
		this.tail = newNode;

		return this;
	}

	public delete(value: T): LinkedListNode<T> | null {
		if (!this.head) {
			return null;
		}

		let deletedNode = null;

		while (this.head && this.head.value === value) {
			deletedNode = this.head;
			this.head = this.head.next;
		}

		let currentNode = this.head;

		if (currentNode !== null) {
			while (currentNode.next) {
				if (currentNode.next.value === value) {
					deletedNode = currentNode.next;
					currentNode.next = currentNode.next.next;
				} else {
					currentNode = currentNode.next;
				}
			}
		}

		if (this.tail && this.tail.value === value) {
			this.tail = currentNode;
		}

		return deletedNode;
	}

	public find(value: T): LinkedListNode<T> | null {
		if (!this.head) {
			return null;
		}

		let currentNode: LinkedListNode<T> | null = this.head;

		while (currentNode) {
			if (value !== undefined && currentNode.value === value) {
				return currentNode;
			}

			currentNode = currentNode.next;
		}

		return null;
	}

	public deleteTail(): LinkedListNode<T> | null {
		if (!this.tail) {
			return null;
		}

		const deletedTail = this.tail;

		if (this.head === this.tail) {
			this.head = null;
			this.tail = null;

			return deletedTail;
		}

		let currentNode = this.head;
		while (currentNode?.next) {
			if (!currentNode.next.next) {
				currentNode.next = null;
			} else {
				currentNode = currentNode.next;
			}
		}

		this.tail = currentNode;

		return deletedTail;
	}

	public deleteHead(): LinkedListNode<T> | null {
		if (!this.head) {
			return null;
		}

		const deletedHead = this.head;

		if (this.head.next) {
			this.head = this.head.next;
		} else {
			this.head = null;
			this.tail = null;
		}

		return deletedHead;
	}

	public fromArray(values: T[]): LinkedList<T> {
		values.forEach((value) => this.append(value));

		return this;
	}

	public toArray(): LinkedListNode<T>[] {
		const nodes = [];

		let currentNode = this.head;

		while (currentNode) {
			nodes.push(currentNode);
			currentNode = currentNode.next;
		}

		return nodes;
	}

	public toString(callback: (value: T) => string): string {
		return this.toArray().map((node) => node.toString(callback)).toString();
	}
}
