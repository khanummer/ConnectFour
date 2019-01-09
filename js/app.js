console.log('test')
/*--- constants / lookups ---*/
const players = {
    '1': 'url(https://oxypro.com.ph/wp-content/uploads/2016/02/blackcircle.png)',
    '-1': 'url(https://png.pngtree.com/element_pic/17/03/21/ee2a4444e1fc5e3721c7f6b8a70990ce.jpg)'
};

/*--- cached elements ---*/
const tds = document.querySelectorAll('td');
const gameInfo = document.getElementById('game-info');
const replayBtn = document.getElementById('replay-btn');
const messages = document.getElementById('game-info');



// let board = [
//           /*   0     1     2     3     4     5     */
//     /* 6 */  [null, null, null, null, null, null],
//     /* 5 */  [null, null, null, null, null, null],
//     /* 4 */  [null, null, null, null, null, null],
//     /* 3 */  [null, null, null, null, null, null],
//     /* 2 */  [null, null, null, null, null, null],
//     /* 1 */  [null, null, null, null, null, null],
//     /* 0 */  [null, null, null, null, null, null]
// ];



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





// if 00 is = null {insert 1 } 
// else if 00 = 1 or -1 {do nothing}
// check trough 00 - 50


//  -------------Win Logic--------------------
// colIdx = column index
// rowIdx = row index

// checkWin() {
//     // while no winner for each co {
//     winner = checkColWinner(colIdx)
// }


// function checkColWinner(idx) {

//     // loop through each cell until winner
//    // winner = checkup(colIdx,rowIdx) || checkDiagUp(colIdx,rowIdx) || ... ect
// }


// // check diagup, check up, check down, check diagdown, check diagleft, check diagright,

// function checkUp(colIdx,rowIdx) {
// if (rowIdx > 2) return null;
// }

//  --------------------------------------------- /*

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
    //get tie
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
    if (rowIdx > 3 && colIdx > 2) return null; 
    return Math.abs(board[colIdx][rowIdx] + board[colIdx+ 1][rowIdx + 1] + board[colIdx + 2][rowIdx + 2] + board[colIdx + 3][rowIdx + 3]) === 4 ? board[colIdx][rowIdx] : null;            
}


function diagonalDownWinCheck(colIdx,rowIdx) {
    if (rowIdx > 4 && colIdx > 4) return null;
    return Math.abs(board[colIdx][rowIdx] + board[colIdx + 1][rowIdx - 1] + board[colIdx + 2][rowIdx - 2] + board[colIdx + 3][rowIdx - 3]) === 4 ? board[colIdx][rowIdx] : null;            

}