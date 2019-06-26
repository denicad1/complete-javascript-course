/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/
let scores, roundScore, activePlayer,gamePlaying,dicePrev,setValue;
//create counter to keep track of the number of times 6 appears
dicePrev=0;
dice1Prev=0;
scores = [0, 0];
roundScore = 0;
activePlayer = 0;
gamePlaying=true;
//see if you can make a state variable so once they put in a number, they can change it unless they start a new game
setValue=true;

let dice1=document.getElementById('dice1');

document.querySelector(".btn-new").addEventListener("click", begin);

//document.querySelector(`#current-${activePlayer}`).innerHTML=`<em>${dice}</em>`;

document.querySelector(".dice").style.display = "none";
dice1.style.display="none";
document.querySelector("#score-0").textContent = "0";
document.getElementById("score-1").textContent = "0";
document.getElementById("current-0").textContent = "0";
document.getElementById("current-1").textContent = "0";

document.querySelector(".btn-roll").addEventListener("click", function() {
  if (gamePlaying) {
      //gets a random number
  let dice = Math.floor(Math.random() * 6) + 1;
      let dice1num = Math.floor(Math.random() * 6) + 1;
  //display the result
  let diceDOM = document.querySelector(".dice");
  diceDOM.style.display = "block";
  diceDOM.src = `dice-${dice}.png`;
  let dice1DOM=document.querySelector("#dice1");
      dice1DOM.style.display = "block";
      dice1DOM.src = `dice-${dice1num}.png`;
      
    //update the round score IF the roll isn't 1
  if (dice !== 1&&dice1num!==1) {
    //add score
    roundScore += dice+dice1num;
    document.querySelector(`#current-${activePlayer}`).textContent = roundScore;
    
  } else {
    //next player
    nextPlayer();
  }
    //if the previous dice roll and current dice roll both equal 6, next turn
  if(dicePrev===6&&dice===6||dice1Prev===6&&dice1num===6||dice===6&&dice1num===6){
      document.getElementById(`score-${activePlayer}`).textContent=0;
      document.querySelector(`#current-${activePlayer}`).textContent = 0;
      nextPlayer();
  }
      //assign variable to hold old roll after the variables have been checked to see if they both equal 6
     dicePrev=dice;
     dice1Prev=dice1num;
   
  }
});

//document.getElementById(`current-${activePlayer}`);

document.querySelector(".btn-hold").addEventListener("click", function() {
    
                
    
    


    if (gamePlaying) {
        //set the value from a number input field
        let value = document.getElementById('input').value;
     //add current score to global score
  scores[activePlayer] += roundScore;
  //update the UI
  document.getElementById(`score-${activePlayer}`).textContent =
    scores[activePlayer];
        if(!value){value=100;}
  //check to see if a player won a game
  if (scores[activePlayer] >= value) {
    document.querySelector(`#name-${activePlayer}`).textContent = "Winner";
    document
      .querySelector(`.player-${activePlayer}-panel`)
      .classList.add("winner");
    document
      .querySelector(`.player-${activePlayer}-panel`)
      .classList.remove("active");
      gamePlaying=false;
  } else {
    nextPlayer();
  }
    }
  
   
});

const nextPlayer = () => {
  roundScore = 0;
  activePlayer === 0 ? (activePlayer = 1) : (activePlayer = 0);
  document.querySelector(".player-0-panel").classList.toggle("active");
  document.querySelector(".player-1-panel").classList.toggle("active");
  document.getElementById("dice").style.display = "none";
  dice1.style.display="none";
  document.getElementById("current-0").textContent = "0";
  document.getElementById("current-1").textContent = "0";
};

function begin() {
  document.querySelector(`#name-${activePlayer}`).textContent = `Player ${activePlayer + 1}`;
  document.querySelector(`.player-${activePlayer}-panel`).classList.remove("winner");
  document.querySelector(".dice").style.display = "none";
  dice1.style.display="none";
  document.querySelector(".player-0-panel").classList.add("active");
  document.querySelector(".player-1-panel").classList.remove("active");
  document.querySelector("#score-0").textContent = "0";
  document.getElementById("score-1").textContent = "0";
  document.getElementById("current-0").textContent = "0";
  document.getElementById("current-1").textContent = "0";
  document.getElementById('input').value="";
  scores = [0, 0];
  roundScore = 0;
  activePlayer = 0;
  gamePlaying=true;
}
