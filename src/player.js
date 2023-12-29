const {gameBoard} = require('./board');

function player() {
    const board = gameBoard();
    return {board};
}

function computer() {
    const board = gameBoard();
    let moveLeft = 100;
    const validMove = Array(100).fill(0);
    for (let i = 0; i < 10; i+=1) {
        for (let j = 0; j < 10; j+=1) {
            validMove[i*10+j] = [i, j];
        }
    }

    
    function randomMove() {
        if (moveLeft === 0) {
            return [-1, -1];
        }
        const z = Math.floor(Math.random() * moveLeft);
        const [x, y] = validMove[z];
        validMove.splice(z, 1);
        moveLeft -= 1;
        
        return [x, y];
    }
    return {board, randomMove};
}

module.exports = {player, computer};