console.log('test')
/*--- constants / lookups ---*/
const players = {
    '1': 'Images/purple-flower.png',
    '-1': 'url(https://imgur.com/MUhBlCo.png)'
};
/*--- cached elements ---*/
const tds = document.querySelectorAll('td');
const gameInfo = document.getElementById('game-info');
const replayBtn = document.getElementById('replay-btn');
const messages = document.getElementById('game-info');
const htp = document.getElementById('htp');

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
htp.addEventListener('click', function() { 
        if (htp.innerHTML = 'HOW TO PLAY') {
            htp.innerHTML = 'To win in Connect Four, you must be the first player to get four of your flower in a row either horizontally, vertically, or diagonally.' 
        } else {
            htp.innerHTML = 'HOW TO PLAY'
        };
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
        messages.textContent = winner === 'T' ? "It's A Tie!" : `${winner === 1 ? 'Purple Wins!' : 'Rainbow Wins!'}`;
    } else {
        messages.textContent = `${activePlayer === 1 ? 'Purple' : 'Rainbow'}'s Turn, P1 : Purple, P2 : Rainbow`;
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
         var numDisk = board.reduce(((acc, colArr) => acc + colArr.length), 0);
         return numDisk === 42 ? winner = 'T' : winner = null;
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

// works off keyboard clicks '1' drops in column one 

//a