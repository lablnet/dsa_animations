import {Problem} from "../Maze"

// Draw board and mark with color.
class Draw {
    constructor() {
        let problem = new Problem()
        this.maze = problem.maze2
        this.height = this.maze.length
        this.width = this.maze[0].length

    }

    mark(i, j, color = 'lightpink')
    {
        let element = document.getElementById("table")
        //console.log(element.rows[0].cells[1])
        element = element.rows[i].cells[j]

        element.style.backgroundColor = color
        //element.className = "disallow"

    }
    draw()
    {
        var board = document.getElementsByClassName('board')[0]
        var tbl = document.createElement('table')
        tbl.className = "table table-responsive"
        tbl.setAttribute('id', 'table');
        var tbdy = document.createElement('tbody')
        for (let i = 0; i < this.height; i++) {
            let tr = document.createElement('tr')
            for (let j = 0; j < this.width; j++) {
                let td = document.createElement('td')
                if (this.maze[i][j] !== '#') {
                    td.appendChild(document.createTextNode(this.maze[i][j]))
                }
                td.setAttribute('value', i + "" + j)

                // only for maze 2.
                if (this.maze[i][j] === '#') {
                    if (j === 0 || j === 1) {
                        td.style.borderRight = "1px solid black"

                        if (i === 5) {
                            td.style.borderRight = "hidden"
                        }
                    }

                    if (i === 5)
                        td.style.borderTop = "1px solid black"

                    if (j === 6 || j === 5) {
                        td.style.borderLeft = "1px solid black"
                        if (j === 6 && i === 5) {
                            td.style.borderLeft = "hidden"
                            td.style.borderTop = "hidden"
                        }
                    }
                    if (j !== 6 && j !== 0 && j !== 1 && i !== 5) {
                        td.style.border = "1px solid black"

                        if (j === 2)
                            td.style.borderRight = "hidden"
                        if (i === 2) {
                            td.style.borderBottom = "hidden"
                            td.style.borderTop = "hidden"
                        }
                        if (i === 1 && j === 3)
                            td.style.borderRight = "hidden"

                        if (i === 4)
                            td.style.borderTop = "hidden"
                    }
                    if (i === 3 && j === 0)
                        td.style.borderBottom = "1px solid black"

                    if (i === 5 && j === 1)
                        td.style.borderLeft = "1px solid black"

                    if (i === 5 && j === 4)
                        td.style.borderRight = "hidden"
                }
                tr.appendChild(td)
            }
            tbdy.appendChild(tr)
        }
        tbl.appendChild(tbdy)
        //prepend to body.
        board.insertBefore(tbl, board.firstChild)
    }
}

export {
    Draw
}
