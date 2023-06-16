let numPlays = 0;
let gameFinished = false;
let currentPlayer = 'X';
let currentPlays = {
  X: [],
  O: []
};
// creat array to defined the winning position
const winningPositions = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
  [1, 4, 7],
  [2, 5, 9],
  [3, 6, 9],
  [3, 5, 7]
];
// add a listener to creat a click and function to know who is the current player
$(document).ready(function() {
  $('.item').on('click', function() {
    if (!gameFinished) {
      numPlays++;
      $(this).text(currentPlayer);
      currentPlays[currentPlayer].push(parseInt($(this).attr('data-index')));

      //check if we have a winner and who it is
      if (isWinner()) {
        gameFinished = true;
        showGameResult('win');
      }

      if (!gameFinished && isDraw()) {
        showGameResult('draw');
      }
      // switch the player
      currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    }
  });
});
// to Play again
function playAgain() {
  numPlays = 0;
  gameFinished = false;
  currentPlayer = 'X';
  currentPlays = {
    X: [],
    O: []
  };
  $('.item, #gameResult').text('');
}
// make a function to show the game result
function showGameResult(type) {
  gameFinished = true;

  if (type === 'win') {
    $('#gameResult').text('winner is ' + currentPlayer);
  } else {
    $('#gameResult').text(' DRAW!');
  }

  $('#gameResult').append(
    '<p id="playAgain" onclick= "playAgain()">Play Again?</p>'
  );
}

// to know when it has game stopped
function isDraw() {
  return numPlays === 9;
}
function isWinner() {
  if (numPlays < 5) return;

  // make a loop for array winningPosition to verify who is the winner
  for (let i = 0; i < winningPositions.length; i++) {
    let isWinner = true;

    for (let j = 0; j < winningPositions[i].length; j++) {
      if ($.inArray(winningPositions[i][j], currentPlays[currentPlayer]) < 0) {
        isWinner = false;
        break;
      }
    }

    if (isWinner) return true;
  }
  return false;
}
