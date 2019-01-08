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

// ^ should i make them column x rows
// or row x column ????

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
    // checkWin();
    render();
});
replayBtn.addEventListener('click', startGame);



startGame();

function startGame() {
    winner = null;
    board = [[], [], [], [], [], [], []];
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
        messages.textContent = `${activePlayer === 1 ? 'Player 1' : 'Player 2'}'s Turn, Player 1 : Black, Player 2 : Blue`;
    }
    replayBtn.style.visibility = winner ? 'visible' : 'hidden';
}




function endGame(winningPlayer) {
    document.getElementById('game-info').innerHTML = "Winner: " + winningPlayer;
}

// button onclick push into array, but check earlier pieces of column and place at lowest spot
// learn event listeners & the DOM



// if 00 is = null {insert 1 } else if 00 = 1 or -1 { do nothing}
// check trough 00 - 50





// event listeners i couldn't get to work: 

// var 1 = document.getElementById("startGame");
// 1.addEventListener('click', startGame());



// need player one
// need player two
// need a board 




// turn
// checkWin
// checkFour
// horizontalCheck
// verticalCheck
// diagonalCheck
// possible moves
// blocked moves 

// have board array and .push -1 or 1 into it
// -1 and 1 represent player 1 vs player 2 

// figure out the index for the div that was clicked
// update the board using the turn value
// change the turn
// run a render function to move thhe elments ot th edom 




/*----- constants -----*/ 

// turn
// board
// win status
// legal moves ?
// illlegal moves ?



/*----- app's state (variables) -----*/ 
// the board :






/*----- cached element references -----*/ 
// Const a1 = document.getElementById(a1);


// console.log(a1);




/*----- event listeners -----*/ 

// when a b c d e f or g is clicked, check if it is there turn,
// then check if row 6 is 'null' if yes replace it with '-1'
// if not then check row 5, then 4, ect. if all are full then do nothing





/*----- functions -----*/

// init function to initalize
// render function to transfer all state variables to the DOM

// if player1 or 2 has won then end game, if not :

// update function to update any variables 
// then render again



// input
// 


// in response to user interaction (such as a click)
// update all relevent state
// render();




// 



// function horizontalCheck() {
//     if (board[0][0] && board[0][1] && board[0][2] && board[0][3] === '1') {
//         console.log('1 Won the Game!');
//     } else if (board[0][1] && board[0][2] && board[0][3] && board[0][4] === '1') {
//         console.log('1 Won the Game');
//     } else if (board[0][2] && board[0][3] && board[0][4] && board[0][5] === '1') {
//         console.log('1 Won the Game!');
//     } else if (board[1][0] && board[1][1] && board[1][2] && board[1][3] === '1') {
//         console.log('1 Won the Game!'); 
//     } else if (board[1][1] && board[1][2] && board[1][3] && board[1][4] === '1') {
//         console.log('1 Won the Game!'); 
//     } else if (board[1][2] && board[1][3] && board[1][4] && board[1][5] === '1') {
//         console.log('1 Won the Game!');
//     } else if (board[2][0] && board[2][1] && board[2][2] && board[2][3] === '1') {
//         console.log('1 Won the Game!');
//     } else if (board[2][1] && board[2][2] && board[2][3] && board[2][4] === '1') {
//         console.log('1 Won the Game!');
//     } else if (board[2][2] && board[2][3] && board[2][4] && board[2][5] === '1') {
//         console.log('1 Won the Game!');
//     } else if (board[3][0] && board[3][1] && board[3][2] && board[3][3] === '1') {
//         console.log('1 Won the Game!');
//     } else if (board[3][1] && board[3][2] && board[3][3] && board[3][4] === '1') {
//         console.log('1 Won the Game!'); 
//     } else if (board[3][2] && board[3][3] && board[3][4] && board[3][5] === '1') {
//         console.log('1 Won the Game!');
//     } else if (board[4][0] && board[4][1] && board[4][2] && board[4][3] === '1') {
//         console.log('1 Won the Game!')
//     }




// //  -------------Win Logic--------------------
// // win logic :

// // colIdx = column index
// // rowIdx = row index

// checkWin() {
//     // while no winner for each co {
//     winner = checkColWinner(colIdx)
// }
// }

// function checkColWinner(idx) {

//     // loop through each cell until winner
//    // winner = checkup(colIdx,rowIdx) || checkDiagUp(colIdx,rowIdx) || ... ect
// }


// // check diagup, check up, check down, check diagdown, check diagleft, check diagright,

// function checkUp(colIdx,rowIdx) {
// if (row > 2) return null;
// // visualize the board ^
// }
//  --------------------------------------------- /*
