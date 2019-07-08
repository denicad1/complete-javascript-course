
//BUDGET CONTROLLER
let budgetController= (function(){
    
  
    
})();
//UI CONTROLLER
let UIController=(function(){
    let DOMstrings={
        inputType:'.add__type',
        inputDescription:'.add__description',
        inputValue:'.add__value',
        inputBtn:'.add__btn'
    };
    return {
        getInput:function() {
            return{
                type:document.querySelector(DOMstrings.inputType).value,
                description:document.querySelector(DOMstrings.inputDescription).value, 
                value:document.querySelector(DOMstrings.inputValue).value
            };
        },
        getDomStrings:function () {
            return DOMstrings;
        }
    };
    
})();
//GLOBAL APP CONTROLLER
let controller=(function(budgetCtrl,UIctrl){
    let DOM=UIctrl.getDomStrings();
    let ctrlAddItem = function () {
        //1.get the file input data
        let input=UIctrl.getInput();
        console.log(input);
    //2. add the item to the budget controller

    //3. add the item to the UI

    //4.calculate the budget

    //5. display the budget on the UI
    
    };

    document.querySelector(DOM.inputBtn).addEventListener('click',ctrlAddItem);


document.addEventListener('keypress',function(event){

if (event.keyCode===13||event.which===13) {
    ctrlAddItem();
}

});





    
})(budgetController,UIController);