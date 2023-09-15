let whoseTurn = true;
let turnMessage = document.querySelector(".turnMessage");

const Player = () => {

    sign = (whoseTurn === true) ? "X" : "O";
    whoseTurn = !whoseTurn;

    const DisplayturnMessage = (message) => {
        turnMessage.textContent = `Player ${message}'s turn`;
    }

    DisplayturnMessage((whoseTurn === true) ? "X" : "O");

    return {
        sign
    };
}


const GameBoard = (() => {

    const gameBoard = ["", "", "", "", "", "", "", "", ""];
    let count = 0;

    const updateBoard = (cell, sign) => {
        gameBoard[cell] = sign;
        count++;
        //console.log("count:", count);
        if (checkWin()) {
            turnMessage.textContent = `Player ${sign} won the game`;
            emptygameBoard();
            PlayGame.removeClick();

        }
        if (count === 9) {
            turnMessage.textContent = `Draw!!`;
            emptygameBoard();
            PlayGame.removeClick();
        }

    }

    emptygameBoard = () =>{
        for(let i=0;i<gameBoard.length;i++){
            gameBoard[i] = "";
        }
        
        count = 0;
    }

    checkWin = () => {

        const winningCombination = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];

        for (let i = 0; i < winningCombination.length; i++) {
            const [a, b, c] = winningCombination[i];
            if (gameBoard[a] !== "" && gameBoard[a] === gameBoard[b] && gameBoard[b] === gameBoard[c]) {
                return true;
            }
        }

        return false;
    }

    return { gameBoard, updateBoard }

})();






const PlayGame = (() => {

    const cellElements = document.querySelectorAll(".cell");
    const resetButton = document.querySelector("#resetButton");

    cellElements.forEach(cell => cell.addEventListener('click', handleClick))

    function handleClick(e) {
        //console.log(e.target.dataset.cell);
        e.target.removeEventListener('click', handleClick);
        const playerSign = Player();
        e.target.classList.add("cell-selected");
        e.target.textContent = playerSign.sign;
        GameBoard.updateBoard(e.target.dataset.cell, playerSign.sign);


    }

    resetButton.addEventListener('click', () => {
        cellElements.forEach(cell => {
            cell.textContent = "";
            cell.classList.remove("cell-selected");
            cell.addEventListener('click', handleClick);
        })
        turnMessage.textContent = `Player X's turn`;
        whoseTurn = true;
    });

    removeClick = () => {
        cellElements.forEach(cell => {
            cell.removeEventListener('click', handleClick);
        })
    }

    return {
        removeClick
    }


})();

