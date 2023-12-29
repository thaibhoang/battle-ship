const {gamePlay} = require('./game');

const newGame = gamePlay();
console.log(newGame.newComputer1.board.getBoard());
console.log(newGame.newComputer2.board.getBoard());

test('2 bot' , () => {
    expect(newGame.twoComputerGamePlay()).toBe(true);
});