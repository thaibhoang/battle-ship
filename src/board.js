const {makeShip} = require('./ship')

function gameBoard() {
    
    let numberOfTarget = 0;
    let targetDestroyed = 0;
    // const row = 10;
    // const col = 10;
    // const board = [];
    // for (let i = 0; i < row; i+=1) {
    //     board[i] = [];
    //     for (let j = 0; j < col; j+=1) {
    //         board[i][j] = 0;
    //     }
    // }
    const board = Array(10).fill(0).map(() => Array(10).fill(0));

    function placeShip(x, y, direction, length, number) {
        if (direction === 'down') {
            if (x + length > 10) {return false};
            for (let t = x; t < x + length; t+=1) {
                if (board[t][y] > 0) {return false};            
            }
            for (let t = x; t < x + length; t+=1) {
                board[t][y] = number;                
            }            
        } else if (direction === 'up') {
            if (x - length < -1) {return false};
            for (let t = x - length + 1; t <= x; t+=1) {
                if (board[t][y] > 0) {return false};
            }
            for (let t = x - length + 1; t <= x; t+=1) {
                board[t][y] = number;
            }
        } else if (direction === 'left') {
            if (y - length < -1) {return false};
            for (let t = y - length + 1; t <= y; t+=1) {
                if (board[x][t] > 0) {return false};
            }
            for (let t = y - length + 1; t <= y; t+=1) {
                board[x][t] = number;
            }
        } else if (direction === 'right') {
            if (y + length > 10) {return false};
            for (let t = y; t < y + length; t+=1) {
                if (board[x][t] > 0) {return false};
            }
            for (let t = y; t < y + length; t+=1) {
                board[x][t] = number;
            }
        }
        numberOfTarget += length;
        return true; 
        // return true mean that you can place the ship, flase otherwise
    }

    const randomDirection = ['down', 'up', 'left', 'right'];

    function randomShipPlacement(length, number) {        
        const x = Math.floor(Math.random()*10);
        const y = Math.floor(Math.random()*10);
        const d = Math.floor(Math.random()*4);
        const direction = randomDirection[d];
        if (!placeShip(x, y, direction, length, number)) {randomShipPlacement(length, number)}; 
    }

    const shipSize = [5, 3, 3, 2, 2];
    const shipFleet = [];

    function placeShipRandomlyFromShipSize() {
        for (let i = 0; i < shipSize.length; i += 1) {
        randomShipPlacement(shipSize[i], i+1);
        const oneship = makeShip(shipSize[i]);
        shipFleet.push(oneship);
    }}


    function getBoard() {
        return board;
    }

    function getShipFleet() {
        return shipFleet;
    }
    function addShipFleet(ship) {
        shipFleet.push(ship);;
    }

    function receiveAttack(x, y) {
        // if the attack hit a ship, change the board value to -1, otherwise change it to -2
        if (board[x][y] < 0) {return false}
        if (board[x][y] > 0) {
            shipFleet[[board[x][y]]-1].getHit();    // board[x][y] here save the number of the ship that got hit, we send the infor to that ship with sendNews function
            board[x][y] = -1;
            targetDestroyed += 1;
        } else {board[x][y] = -2;}
        return true;
    }

    function checkWin() {
        if (targetDestroyed === numberOfTarget) {
            return true;
        }
        return false;
    }

    return {shipSize, placeShip, getBoard, receiveAttack, checkWin, randomShipPlacement, getShipFleet, placeShipRandomlyFromShipSize, addShipFleet}
};

module.exports = {gameBoard};