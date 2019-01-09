console.log('test')
/*--- constants / lookups ---*/
const players = {
    '1': 'url(Images/BEAR.png)',
    '-1': 'url(https://imgur.com/MUhBlCo.png)'
};

/*--- cached elements ---*/
const tds = document.querySelectorAll('td');
const gameInfo = document.getElementById('game-info');
const replayBtn = document.getElementById('replay-btn');
const messages = document.getElementById('game-info');

let winner; // 1, -1, 'T', or null
let activePlayer;
let board;

/*--- event listeners ---*/
document.querySelector('.drop-buttons').addEventListener('click', function(evt) { 
    if (evt.target.tagName !== "BUTTON" || winner) return;
    let colIdx = parseInt(evt.target.textContent) - 1;
    if (board[colIdx].length === 6) return;
    board[colIdx].push(activePlayer);
    activePlayer *= -1;
    winCheck();
    render();
});

replayBtn.addEventListener('click', startGame);

startGame();

/*----- functions -------*/
function startGame() {
    winner = null;
    board = [
        [], 
        [], 
        [], 
        [], 
        [], 
        [], 
        []
    ];
    activePlayer = 1;
    render();
}

function render() {
    tds.forEach(function(td) {
        let rowIdx = parseInt(td.id.charAt(0));
        let colIdx = parseInt(td.id.charAt(1));
        let value = board[colIdx][rowIdx];
        td.style.backgroundImage = value ? players[value] : "none";
    }); 
    if (winner) {
        messages.textContent = winner === 'T' ? "It's A Tie!" : `${winner === 1 ? 'Player 1 Wins!' : 'Player 2 Wins!'}`;
    } else {
        messages.textContent = `${activePlayer === 1 ? 'Player 1' : 'Player 2'}'s Turn, P1 : Black, P2 : Blue`;
    }
    replayBtn.style.visibility = winner ? 'visible' : 'hidden';
}

function winCheck() {
    winner = null;
    for (let colIdx = 0; colIdx < board.length; colIdx++) {
        checkColWinner(colIdx);
        if (winner) return;
   }
}

function checkColWinner(colIdx) {
   winner = null;
    let colArr = board[colIdx];
   
    for (let rowIdx = 0; rowIdx < colArr.length; rowIdx++) {
        winner = verticalWinCheck(colIdx, rowIdx) || horizontalWinCheck(colIdx, rowIdx) || diagonalUpWinCheck(colIdx, rowIdx) || diagonalDownWinCheck(colIdx, rowIdx);
        if (winner) return;
    }
    // get tie
}

function verticalWinCheck(colIdx,rowIdx) {
     if (rowIdx > 2) return null;
    let colArr = board[colIdx];
    return Math.abs(colArr[rowIdx] + colArr[rowIdx + 1] + colArr[rowIdx + 2] + colArr[rowIdx + 3]) === 4 ? colArr[rowIdx] : null;
}

function horizontalWinCheck(colIdx,rowIdx) {
    if (colIdx > 3) return null;
    return Math.abs(board[colIdx][rowIdx] + board[colIdx + 1][rowIdx] + board[colIdx + 2][rowIdx] + board[colIdx + 3][rowIdx]) === 4 ? board[colIdx][rowIdx] : null;
}
    
function diagonalUpWinCheck(colIdx,rowIdx) {
    if (colIdx > 3) return null; 
    return Math.abs(board[colIdx][rowIdx] + board[colIdx+ 1][rowIdx + 1] + board[colIdx + 2][rowIdx + 2] + board[colIdx + 3][rowIdx + 3]) === 4 ? board[colIdx][rowIdx] : null;            
}

function diagonalDownWinCheck(colIdx,rowIdx) {
    if (colIdx > 3) return null;
    return Math.abs(board[colIdx][rowIdx] + board[colIdx + 1][rowIdx - 1] + board[colIdx + 2][rowIdx - 2] + board[colIdx + 3][rowIdx - 3]) === 4 ? board[colIdx][rowIdx] : null;            

}

// black murakami flower instead
