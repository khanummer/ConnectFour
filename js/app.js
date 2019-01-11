console.log('test')

/*--- constants / lookups ---*/
const players = {
    '1': 'url(https://i.imgur.com/7Wyg7kD.png)',
    '-1': 'url(https://imgur.com/MUhBlCo.png)'
};

/*--- cached elements ---*/
const tds = document.querySelectorAll('td');
const gameInfo = document.getElementById('game-info');
const replayBtn = document.getElementById('replay-btn');
const messages = document.getElementById('game-info');
const htp = document.getElementById('htp');
const contact = document.getElementById('contact');
const changeback = document.getElementById('cb');
const body = document.querySelector('body');
const button0 = document.getElementById('button0');
const button1 = document.getElementById('button1');
const button2 = document.getElementById('button2');
const button3 = document.getElementById('button3');
const button4 = document.getElementById('button4');
const button5 = document.getElementById('button5');
const button6 = document.getElementById('button6');

let winner; // 1, -1, 'T', or null
let activePlayer;
let board;
startGame();

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
        if (htp.innerHTML === 'HOW TO PLAY') {
            htp.innerHTML = 'To win in Connect Four, you must be the first player to get four of your flower in a row either horizontally, vertically, or diagonally. Player 1 is represented by a Purple Flower and Player 2 is represented by a Rainbow Flower. Click the colored buttons at the top to drop your flower into the coresponding column.' 
        } else if (htp.innerHTML != 'HOW TO PLAY'){
            htp.innerHTML = 'HOW TO PLAY'
        };
});

replayBtn.addEventListener('click', startGame);

contact.addEventListener('click', function() {
    if (contact.innerHTML === 'CONTACT') {
        contact.innerHTML = 'UMMERNKHAN@GMAIL.COM' 
    } else if (contact.innerHTML !== 'CONTACT') {
        contact.innerHTML = 'CONTACT';
        }
    
});
let bg = 1;
changeback.addEventListener('click', function() {
    
    if (bg === 1) { 
        body.style.backgroundImage = "url('https://cdn.shopify.com/s/files/1/0669/0717/products/MURAKAMI-Multicolore-Mini-WHITE-FULL2_d384bbff-4cf4-487a-b14b-0eebb0ba5831.jpg?v=1413178946')";
    } else if (bg == 2) {
        body.style.backgroundImage = "url('https://ferrebeekeeper.files.wordpress.com/2014/12/takashi-murakami-7.jpg')";
    } else if (bg == 3) {
        body.style.backgroundImage = "url('https://www.researchgate.net/profile/Marc_Steinberg5/publication/233324066/figure/fig2/AS:300043732045856@1448547408899/Murakami-Takashi-Manji-Fuji-c-Takashi-Murakami-Kaikai-Kiki-Co-Ltd-All-rights-reserved.png')";
    } else if (bg == 4) {
        body.style.backgroundImage = "url('https://imgur.com/rOCcoLM.png')";
    }
    bg += 1;
    if (bg === 5) {
        bg -=4;
    }
});


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
        messages.textContent = winner === 'T' ? "IT'S A TIE!" : `${winner === 1 ? 'PURPLE WINS!' : 'RAINBOW WINS!'}`;
    } else {
        messages.textContent = `${activePlayer === 1 ? 'PURPLE' : 'RAINBOW'}'S TURN`;
    }
    replayBtn.style.visibility = winner ? 'visible' : 'hidden';
    if (activePlayer == 1) {
        button0.style.backgroundColor = '#ECB6FF';
        button0.style.color = '#ECB6FF';
        button1.style.backgroundColor = '#ECB6FF';
        button1.style.color = '#ECB6FF';
        button2.style.backgroundColor = '#ECB6FF';
        button2.style.color = '#ECB6FF';
        button3.style.backgroundColor = '#ECB6FF';
        button3.style.color = '#ECB6FF';
        button4.style.backgroundColor = '#ECB6FF';
        button4.style.color = '#ECB6FF';
        button5.style.backgroundColor = '#ECB6FF';
        button5.style.color = '#ECB6FF';
        button6.style.backgroundColor = '#ECB6FF';
        button6.style.color = '#ECB6FF';
    } else {
        button0.style.backgroundColor = '#FFD3D4';
        button0.style.color = '#FFD3D4';
        button1.style.backgroundColor = '#F5FFAD';
        button1.style.color = '#F5FFAD';
        button2.style.backgroundColor = '#A6FFB7';
        button2.style.color = '#A6FFB7';
        button3.style.backgroundColor = '#CFDBFF';
        button3.style.color = '#CFDBFF';
        button4.style.backgroundColor = '#ff6d73';
        button4.style.color = '#ff6d73';
        button5.style.backgroundColor = '#ECB6FF';
        button5.style.color = '#ECB6FF';
        button6.style.backgroundColor = '#FFEFBE';
        button6.style.color = '#FFEFBE';
    }
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
