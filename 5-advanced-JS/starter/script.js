(function () {
    


function Questions(question,possibleAnswers,rightAnswer){
    this.question=question;
    this.possibleAnswers=possibleAnswers;
    this.rightAnswer=rightAnswer;
}
let first=new Questions('what year was america created?',[1880,1776,1750],1);
let second=new Questions('where was the declaration of independence signed?',['Philadelphia','Washington','Delaware'],0);
let third=new Questions('who wrote the declaration of independence?',['John Wilkes Booth','George Washington','Thomas Jefferson'],2);
let questionsArray=[first,second,third];
//lets pick a question object at random
// function pickQuestion(arr){
//     let rand=Math.floor(Math.random()*3);
//     let selection=arr[rand];
//     return function(){
//         //log the questions and possible answers from the question object
//         console.log(selection.question);
//         for(let i=0;i<selection.possibleAnswers.length;i++){
//             //added 1 to the number so it looks better 
//         console.log(`${i+1}. ${selection.possibleAnswers[i]}`);
//         };
//         //we also need to return the right answer to use later
//         return selection.rightAnswer;
//     };
// };

Questions.prototype.pickQuestion=function () {
    
    
    console.log(this.question);
        for(let i=0;i<this.possibleAnswers.length;i++){
            //added 1 to the number so it looks better 
        console.log(`${i+1}. ${this.possibleAnswers[i]}`);
        }
};
//get the answer that the user thinks is right with a prompt
// function getAnswer(){
// let answerString=prompt("Please select the correct answer(just type the number).");
// //since prompt will return a string, we need to parse it to an int
// let answerInt=parseInt(answerString);
//     //return the int so we can use it to check if they are right later
//     return answerInt;
// }

//compare the user's answer with the right answer here and immediately call it
// (function checkAnswer(fn,int){
//     let rightAnswer=fn;
//     //minused 1 so that we can actually make sure the answers will match. check inside the pickQuestion function to understand better what this is.
//     if (int-1===rightAnswer){
//         console.log('yay')
//     }else{
//         console.log('nay')
//     }
// })(pickQuestion(questionsArray)(),getAnswer());

Questions.prototype.checkAnswer=function () {
    let getAnswer=prompt('Please enter the right answer(Only use the number).');
    let rightAnswer=parseInt(getAnswer)-1;
    //minused 1 so that we can actually make sure the answers will match. check inside the pickQuestion function to understand better what this is.
    if (this.rightAnswer===rightAnswer){
        console.log('yay')
    }else{
        console.log('nay')
    }
}
let rand=Math.floor(Math.random()*3);
questionsArray[rand].pickQuestion();
questionsArray[rand].checkAnswer();
})();



