export default class Stack {
    constructor() {
        this.top = -1
        this.items = []
    }
    get peak()
    {
        return this.items[this.top]
    }
    push(value)
    {
        this.top++
        this.items[this.top] = value
    }
    pop()
    {
        if (this.isEmpty()) throw(new Error("No item"))
        let item = this.items[this.top]
        this.top--;
        return item
    }
    isEmpty()
    {
        return (this.items.length === 0)
    }
    contains(state)
    {
        for (let i = 0; i < this.items.length; i++) {
            if (this.items[i].state === state) return true
        }
        return false
    }
}
