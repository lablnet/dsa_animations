import {is_in_solution, is_not_contains} from "./helper.js"
import {Stack, Queue} from "./Queue/Queue.js"
import {Draw} from "./html/Draw"
const delay = ms => new Promise(res => setTimeout(res, ms));

// Class to represent Node.
class Node {
    constructor(state, parent, action) {
        this.state = state
        this.parent = parent
        this.action = action
    }
}

// Class for define mazes representations.
class Problem {
    constructor() {
        this.maze0 = [
            /*
                ##Z
                ##
                A
             */
            ["#", "#", "Z"],
            ["#", " ", " "],
            ["A", " ", " "],
        ]
        this.maze1 = [
            /*
                #####Z#
                ##### #
                ####  #
                #### ##
                     ##
                A######
            */
            ['#', '#', '#', '#', '#', '#', 'Z', '#'],
            ['#', '#', '#', '#', '#', '#', ' ', '#'],
            ['#', '#', '#', '#', '#', ' ', ' ', '#'],
            ['#', '#', '#', '#', '#', ' ', '#', '#'],
            [' ', ' ', ' ', ' ', ' ', ' ', '#', '#'],
            ['A', '#', '#', '#', '#', '#', '#', '#'],
        ]
        this.maze2 = [
            /*
                ##    #
                ## ## #
                #B #  #
                # ## ##
                     ##
                A#####
             */
                ['#', '#', ' ', ' ', ' ', ' ', '#'],
                ['#', '#', ' ', '#', '#', ' ', '#'],
                ['#', 'Z', ' ', '#', ' ', ' ', '#'],
                ['#', ' ', '#', '#', ' ', '#', '#'],
                [' ', ' ', ' ', ' ', ' ', '#', '#'],
                ['A', '#', '#', '#', '#', '#', '#'],
        ]
    }
}

// Class to solve maze.
class Maze extends Problem {
    constructor() {
        super();
        let maze = this.maze2
        this.height = maze.length
        this.width = maze[0].length
        this.walks = []
        this.start = []
        this.goal = []
        this.solution = null
        this.explored = new Set()
        this.num_explored = 0
        this.draw = new Draw()

        // iterate over maze and identity walls, goal, start and path.
        for (let i = 0; i < this.height; i++) {
            let row = []
            for (let j = 0; j < this.width; j++) {
                try {
                    if (maze[i][j] === 'A') {
                        this.start = [i, j]
                        this.draw.mark(i, j, 'green')
                        row.push(false)
                    } else if (maze[i][j] === 'Z') {
                        this.goal = [i, j]
                        row.push(false)
                        this.draw.mark(i, j, 'blue')
                    } else if (maze[i][j] === ' ') {
                        row.push(false)
                    } else {
                        row.push(true)
                    }
                } catch (e) {
                    row.push(false)
                }
            }
            this.walks.push(row)
        }
    }

    /*
    * @purpose to print in console.
    * */
    print()
    {
        let sol = null
        if (this.solution !== null) sol = this.solution[1]
        for (let i = 0; i < this.walks.length; i++) {
            let r = this.walks[i]
            for (let j = 0; j < r.length; j++) {
                if (this.walks[i][j]) process.stdout.write("#")
                else if (JSON.stringify([i, j]) === JSON.stringify(this.start)) process.stdout.write('A')
                else if (JSON.stringify([i, j]) === JSON.stringify(this.goal)) process.stdout.write('Z')
                else if (sol !== null && is_in_solution([i, j], sol)) process.stdout.write("*")
                else process.stdout.write(" ")
            }
            console.log("")
        }
        console.log("")
    }

    neighbors(state)
    {
        let row = state[0]
        let col = state[1]
        let candidates = [
            ["up", [row - 1, col]],
            ["down", [row + 1, col]],
            ["left", [row, col - 1]],
            ["right", [row, col + 1]]
        ]
        let results = []
        for (let i = 0; i < 4; i++) {
            let a = candidates[i][0]
            let r = candidates[i][1][0]
            let c = candidates[i][1][1]
            if ((0 <= r && r < this.height) && (0 <= c && c < this.width) && !this.walks[r][c]) {
                results.push([a, [r, c]])
            }
        }
        return results
    }

    async solve()
    {
        // init the node from starting.
        let start = new Node(this.start, null, null)

        // stack or queue
        let frontier = null

        // Get the frontier.
        if (localStorage.getItem("algo") === "dfs")
            frontier = new Stack()
        else
            frontier = new Queue()

        frontier.push(start)

        while (true) {

            // if frontier is empty? no solution.
            if (frontier.isEmpty()) return

            // get the node from frontier.
            let node = frontier.pop()
            this.num_explored++;

            if (JSON.stringify(node.state) !== JSON.stringify(this.start)) {
                // Mark node as explored in board
                this.draw.mark(node.state[0], node.state[1])
            }

            // sleep for 1-second
            await delay(1000);

            // if the give node is goal then we have reach to solution.
            if (JSON.stringify(node.state) === JSON.stringify(this.goal)) {
                let actions = []
                let cells = []
                while (node.parent !== null) {
                    actions.push(node.action)
                    cells.push(node.state)
                    node = node.parent
                }
                actions.reverse()
                cells.reverse()
                this.solution = [actions, cells]
                return
            }

            this.explored.add(node.state)

            // add neighbours to the frontier
            let neighbours = this.neighbors(node.state)
            for (let i = 0; i < neighbours.length; i++) {
                let state = [neighbours[i][1][0], neighbours[i][1][1]]
                let action = neighbours[i][0]

                // Determine the state should not be in frontier and is not explored.
                if (!frontier.contains(state) && !is_not_contains(state, this.explored)) {
                    let child = new Node(state, node, action)
                    frontier.push(child)
                }
            }
        }
    }
}

export {Problem, Maze}
