/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/
let scores, roundScore,activePlayer;

scores=[0,0];
roundScore=0;
activePlayer=0;


dice= Math.floor(Math.random()*6) + 1;

document.querySelector(`#current-${activePlayer}`).textContent=dice;
//document.querySelector(`#current-${activePlayer}`).innerHTML=`<em>${dice}</em>`;




let x=document.querySelector('#score-0').textContent;
console.log(x);

//document.querySelector('.dice').style.display='none';

document.querySelector('.btn-roll').addEventListener('click',function(){
    //gets a random number
   let dice= Math.floor(Math.random()*6) + 1;
    //display the result
    let diceDOM=document.querySelector('.dice');
    diceDOM.style.display='block';
    diceDOM.src=`dice-${dice}.png`;
    //update the round score IF the roll isn't 1
});

function thing(dice){
    
    
    let pic=document.getElementById("dice");
    
    console.log(dice);
switch(dice){
    case 1:
    pic.src="dice-1.png";
    break;
    case 2:
    pic.src="dice-2.png";
    break;
    case 3:
    pic.src="dice-3.png";
    break;
    case 4:
    pic.src="dice-4.png";
    break;
    case 5:
    pic.src="dice-5.png";
    break;
    case 6:
    pic.src="dice-6.png";
    break;
    default:
    console.log('wrong');
    
}
    }

