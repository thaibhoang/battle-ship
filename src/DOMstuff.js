const {gamePlay} = require('./game');
const {makeShip} = require('./ship')


function DOM() {
    let shipSizeArray;
    const winner = document.querySelector('.winner');
    const playerDiv = document.querySelector('.player');
    const computerDiv = document.querySelector('.computer');
    const resetButton = document.querySelector('.playAgain');
    const ships = document.querySelector('.ships');
    function createBoard() {
        const board = document.createElement('div');
        board.classList.add('board');
        let i = 0;
        while (i < 100) {
            const div = document.createElement('div');
            div.setAttribute('data-x', Math.floor(i / 10));
            div.setAttribute('data-y', i % 10);
            div.classList.add('uncover', 'cel');
            i+=1;
            board.append(div);
        }
        return board;
    }
    
    function playerDOM() {  
        playerDiv.append(createBoard());
    };

    function computerDOM() {        
        computerDiv.append(createBoard());        
    };

    function uncoverCell(x, y, player, value) {
        const cell = document.querySelector(`.${player} [data-x="${x}"][data-y="${y}"]`);
        cell.textContent = value;
        cell.classList.add('cover');
        cell.classList.remove('uncover');
    }

    function disableBoard() {
        document.querySelectorAll('.board').forEach(board => {
            board.classList.remove('pointer-events-auto');
            board.classList.add('pointer-events-none');
        })
    }

    function shipDisplayed(board) { // only for computer board to show player's ships
        const cells = document.querySelectorAll('.computer .cel');
        cells.forEach((cell) => {
            const {x, y} = cell.dataset;
            if (board[x][y] > 0) {
                cell.classList.add('shipCell');
            }
        });
    }

    
    function startGame() {
        playerDOM();
        computerDOM();
        const {newComputer1, newPlayer, playerVsComputer} = gamePlay();
        const game = playerVsComputer();
        shipSizeArray = newPlayer.board.shipSize;
        const startGameButton = document.querySelector('.startGame');
        let shipCreated = 0;

        (function createShip() {
            const directionArray = ['down', 'up', 'left', 'right'];
            let d = 0;
            function moveD() {
                d += 1;
                if (d === 4) {
                    d = 0;
                }
            }
            const directionDiv = document.querySelector('.direction');
            let direction = directionArray[d];
            window.addEventListener('keydown', (e3) => {
                if (e3.key === 'r') {
                    moveD();
                    direction = directionArray[d];
                    directionDiv.textContent = direction;
                }
            })
            const playerboard = document.querySelector('.computer .board');
            function shipSample(number) {
                const container = document.createElement('div');
                container.classList.add('container');
                container.setAttribute('draggable', true);
                container.setAttribute('data-number', number);               
               
                for (let i = 0; i < shipSizeArray[number-1]; i += 1) {
                    const cell = document.createElement('div');
                    cell.classList.add('cel', 'shipCell')
                    container.append(cell);
                }
                return container;
            }
            for (let j = 0; j < shipSizeArray.length; j += 1) {
                ships.append(shipSample(j+1));
            }  
            
            let n;
            let length;
            let currentContainer;
            document.querySelectorAll('.container').forEach((container) => {
                container.addEventListener('dragstart', () => {                    
                    n = Number(container.dataset.number);
                    length = shipSizeArray[n-1];  
                    currentContainer =   container;  
                    playerboard.addEventListener('dragover', (e) => {e.preventDefault()});
                });
            })
            playerboard.addEventListener('drop', (event) => {
                if (event.target.matches('[data-x]')) {                        
                    const {x, y} = event.target.dataset;  
                    if (newPlayer.board.placeShip(Number(x), Number(y), direction, length, n)) {  
                        const oneship = makeShip(length);
                        newPlayer.board.addShipFleet(oneship);
                        currentContainer.classList.add('added');  
                        currentContainer.remove();
                        shipCreated += 1;                          
                        length = 11;
                        if (shipCreated === 5) {startGameButton.removeAttribute('disabled')};
                        shipDisplayed(newPlayer.board.getBoard());
                    }
                }
            });  
        })();


        
        startGameButton.addEventListener('click', () => {
            startGameButton.setAttribute('disabled', true);
            const possibleMoves = document.querySelectorAll('.player div.uncover');
            possibleMoves.forEach((div) => {
                div.classList.remove('uncover');
                div.addEventListener('click', () => {
                    const {x, y} = div.dataset;
                    game.playerMove(x, y);        
                    uncoverCell(x, y, 'player', newComputer1.board.getBoard()[x][y]);                
                    const [m, n] = game.computerMove();                
                    uncoverCell(m, n, 'computer', newPlayer.board.getBoard()[m][n]);
                    if (game.check() === 1) {
                        winner.textContent = 'Computer won';
                        disableBoard();
                    }
                    if (game.check() === 2) {
                        winner.textContent = 'Player won';
                        disableBoard();
                    }
                });
            }); 
        });
        
             
    }

    function playAgain() {
        ships.textContent = '';
        playerDiv.textContent = ''; 
        computerDiv.textContent = '';
        winner.textContent = '';
        startGame();
    }
    resetButton.addEventListener('click', () => playAgain());

    return {startGame}
}

module.exports = {DOM};


