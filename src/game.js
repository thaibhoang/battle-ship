// const {gameBoard} = require('./board');
const {player, computer} = require('./player');

function gamePlay() {
    const newPlayer = player();
    const newComputer1 = computer();   
    newComputer1.board.placeShipRandomlyFromShipSize();    

    function playerVsComputer() {
        
        function computerMove() {
            const [x, y] = newComputer1.randomMove();
            newPlayer.board.receiveAttack(x, y);
            return [x, y];
        }

        function playerMove(x, y) {
            newComputer1.board.receiveAttack(x, y);
        }
        
        function check() {
            if (newPlayer.board.checkWin()) {
                return 1;
            }
            if (newComputer1.board.checkWin()) {
                return 2;
            }
            return 0;
        }
        return {computerMove, playerMove, check}
    }

    // const newComputer2 = computer(); 
    // newComputer2.board.placeShipRandomlyFromShipSize();
    // const goFirstTurn = true;
    // function twoComputerGamePlay() {
    //     let endGame = false;
    //     while (!endGame) {
    //         if (goFirstTurn) {
    //             const [x, y] = newComputer1.randomMove();
    //             newComputer2.board.receiveAttack(x, y);
    //             goFirstTurn = false;
    //             if (newComputer2.board.checkWin()) {
    //                 endGame = true;
    //             }
    //         } else {
    //             const [x, y] = newComputer2.randomMove();
    //             newComputer1.board.receiveAttack(x, y);
    //             goFirstTurn = true;
    //             if (newComputer1.board.checkWin()) {
    //                 endGame = true;
    //             }
    //         }
    //     }
    //     return true;
    // }
    return {newComputer1, newPlayer, playerVsComputer}
}

module.exports = {gamePlay};
