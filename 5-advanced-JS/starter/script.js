function Questions(question,possibleAnswers,rightAnswer){
    this.question=question;
    this.possibleAnswers=possibleAnswers;
    this.rightAnswer=rightAnswer;
}
let first=new Questions('what year was america created?',[1880,1776,1750],1);
let second=new Questions('where was the declaration of independence signed?',['Philadelphia','Washington','Delaware'],0);
let third=new Questions('who wrote the declaration of independence?',['John Wilkes Booth','George Washington','Thomas Jefferson'],2);
let questionsArray=[first,second,third];
let counter=0;
//lets pick a question object at random
function pickQuestion(arr){
    let rand=Math.floor(Math.random()*3);
    let selection=arr[rand];
    return function(){
        //log the questions and possible answers from the question object
        console.log(selection.question);
        for(let i=0;i<selection.possibleAnswers.length;i++){
            //added 1 to the number so it looks better 
        console.log(`${i+1}. ${selection.possibleAnswers[i]}`);
        };
        //we also need to return the right answer to use later
        return selection.rightAnswer;
    };
};
//get the answer that the user thinks is right with a prompt
function getAnswer(){
let answerString=prompt("Please select the correct answer(just type the number).");
    return answerString;
}
//this is so I don't have to write out the scores constantly
function currentScore(score){
    console.log(`Your Current Score is ${score}`);
}

//compare the user's answer with the right answer here and immediately call it
(function checkAnswer(fn,int){
    //since prompt will return a string, we need to parse it to an int. can still use string to get out of loop
    let answerInt=parseInt(int)-1;
    let rightAnswer=fn;
    // use counter to keep track of score
            
        //minused 1 so that we can actually make sure the answers will match. check inside the pickQuestion function to understand better what this is.
         if (answerInt===rightAnswer){
        console.log('yay');
        counter++;
        currentScore(counter);
         checkAnswer(pickQuestion(questionsArray)(),getAnswer());
    }else if(int=="exit"){
        console.log('game over');
        console.log(`That was great! you scored ${counter}!`);
    }else{
        console.log('nay');
        currentScore(counter);
        checkAnswer(pickQuestion(questionsArray)(),getAnswer()); 
        
    }
    
   
  
})(pickQuestion(questionsArray)(),getAnswer());





