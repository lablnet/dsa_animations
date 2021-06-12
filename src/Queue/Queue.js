import Stack from "../Stack/Stack.js"

export default class Queue extends Stack {
    constructor()
    {
        super();
        this.tail = -1
        this.top = 0
    }
    push(val)
    {
        this.tail++
        this.items[this.tail] = val
    }
    pop()
    {
        if (this.isEmpty()) throw(new Error("No item"))
        const value = this.items[this.top]
        this.top++
        return value
    }
}

export {Queue, Stack}
