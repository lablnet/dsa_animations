const is_not_contains = (state, explored) =>
{
    let exp = Array.from(explored)
    for (let i = 0; i < explored.size; i++) {
        if (exp[i][0] === state[0] && exp[i][1] === state[1]) return true;
    }
    return false
}
const is_in_solution = (state, solution) =>
{
    for (let i = 0; i < solution.length; i++) {
        if (solution[i][0] === state[0] && solution[i][1] === state[1]) return true;
    }
    return false
}

export {is_in_solution, is_not_contains}
