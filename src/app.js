import './scss/App.scss';
import {Maze} from "./Maze.js"
import {Draw} from "./html/Draw"

let d = new Draw()
d.draw()

let m = new Maze()
m.solve()
console.log("No of explores: ", m.num_explored)
