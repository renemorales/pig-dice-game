/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

// textContent is to change the text in a html element
// document.querySelector('#current-' + activePlayer).textContent = dice;

// innerHTML add content to the html
//document.querySelector('#current-' + activePlayer).innerHTML = '<strong>' + dice + '</strong>';

/* to read content or element from webpage
var x = document.querySelector('#score-0').textContent;
console.log(x); */

// to change the css of some element
// document.querySelector('.dice').style.display = 'none';

  //document.querySelector('.player-0-panel').classList.remove('active'); //remove class
        //document.querySelector('.player-1-panel').classList.add('active'); // add class


var scores, roundScore, activePlayer, gamePlaying;

init();

// Event for when the user hit or roll button
document.querySelector('.btn-roll').addEventListener('click', function(){
    if(gamePlaying){

        // 1. Random number
        var dice = Math.floor(Math.random() * 6) + 1;

        // 2. Display the result
        var diceDOM = document.querySelector('.dice')
        diceDOM.style.display = 'block';
        diceDOM.src = 'dice-' + dice + '.png';

        //3. Update the round score IF the rolled number was not 1
        if(dice !== 1){
            //add score
            roundScore += dice;
            document.querySelector('#current-' + activePlayer).textContent = roundScore // to display
        }else{
            //next player
        nextPlayer();

        }
    }
});

// to hold and update the player score
document.querySelector('.btn-hold').addEventListener('click', function(){ // anonymous function
    if(gamePlaying){
        // add CURRENT score to GLOBAL score
        scores[activePlayer] += roundScore;

        // Update the UI
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

        //Check if player won the game
        if(scores[activePlayer] >= 20) {
            document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
            document.querySelector('.dice').style.display = 'none';
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            gamePlaying = false;
        }else{
            //Next player
            nextPlayer();
        }
    }
});

function nextPlayer(){
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0; // reset to cero

    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    document.querySelector('.player-0-panel').classList.toggle('active'); //add the class if the class is not there it remove it
    document.querySelector('.player-1-panel').classList.toggle('active');

    document.querySelector('.dice').style.display = 'none';

}

document.querySelector('.btn-new').addEventListener('click', init);

function init(){

    scores = [0, 0];
    activePlayer = 0;
    roundScore = 0;
    gamePlaying = true;

    // setting everything to cero
    document.querySelector('.dice').style.display = 'none';
    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');

}