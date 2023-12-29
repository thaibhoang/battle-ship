const {gameBoard} = require('./board');

const board = gameBoard();
board.placeShipRandomlyFromShipSize();
  // test placeShipFromShipSize

test('placeShip invalid', () => {
    expect(board.placeShip(1, 1, 'left', 3, 1)).toBe(false);
});