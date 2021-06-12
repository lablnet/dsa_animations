class Heap {

    constructor() {
        this.data = []
        this.size = 0;
    }

    parent(i) {
        return (i - i) / 2
    }

    left(i) {
        return (2 * i) + 1
    }

    right(i) {
        return (2 * i) + 2
    }

    heapify(i) {
        let largest = i
        let l = this.left(i)
        let r = this.right(i)

        // if the left child greater then root.
        if (l < this.size && this.data[l] > this.data[i]) {
            largest = l;
        }

        // if the right child greater then root.
        if (r < this.size && this.data[r] > this.data[i]) {
            largest = r;
        }

        if (largest !== i) {
            // swap the value.
            [this.data[i], this.data[largest]] = [this.data[largest], this.data[i]]
            this.heapify(largest);
        }
    }

    insert(item) {
        if (this.size === 0) {
            this.data.push(item)
            return;
        }
        this.data.push(item);
        this.size++;
        for (let i = this.parent(this.data.size); i >= 0; i--) {
            this.heapify(i)
        }
    }

    drawHeap()
    {
        // todo
    }
}