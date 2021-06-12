import {Problem} from "../Maze"

// Draw board and mark with color.
class Draw {
    constructor() {
        let problem = new Problem()
        this.maze = problem.maze2
        this.height = this.maze.length
        this.width = this.maze[0].length

    }

    mark(i, j, color = 'red')
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
                td.appendChild(document.createTextNode(this.maze[i][j]))
                td.setAttribute('value', i + "" + j)
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
