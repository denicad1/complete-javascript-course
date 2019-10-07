// Global app controller
import Search from "./models/Search";
import * as searchView from "./views/searchView";
import * as recipeView from "./views/recipeView";
import * as listView from "./views/listView";
import {
    elements,
    renderLoader,
    clearLoader
} from "./views/base";
import Recipe from "./models/Recipe";
import List from "./models/list";
//Global State of the App
//search object
//current recipe object
//shopping list object
//liked recipes
const state = {};
// SEARCH CONTROLLER

const controlSearch = async () => {
    //1. get the query
    const query = searchView.getInput(); //TODO

    if (query) {
        //2. new search object and add it to state
        state.search = new Search(query);
        //3. prepare UI for results
        searchView.clearInput();
        searchView.clearResults();
        renderLoader(elements.searchRes);

        //4. search for recipe
        try {
            await state.search.getResults();

            //5. render results on UI
            clearLoader();
            searchView.renderResults(state.search.result);
        } catch (err) {
            alert("something wrong with the search");
            clearLoader();
        }
    }
};

elements.searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    controlSearch();
});

//TESTING
window.addEventListener("load", (e) => {
    e.preventDefault();
    controlSearch();
});
elements.searchResPages.addEventListener("click", (e) => {
    const btn = e.target.closest(".btn-inline");
    if (btn) {
        const goToPage = parseInt(btn.dataset.goto, 10);
        searchView.clearResults();
        searchView.renderResults(state.search.result, goToPage);
    }
});

// RECIPE CONTROLLER
const controlRecipe = async () => {
    //get ID from URL
    const id = window.location.hash.replace("#", "");
    console.log(id);
    if (id) {

        //Prepare the UI for changes
        recipeView.clearRecipe();
        renderLoader(elements.recipe);

        //Highlight selected search item
        if (state.search) {
            searchView.highlightSelected(id);
        }

        //create a new recipe object
        state.recipe = new Recipe(id);


        try {
            //get recipe data
            await state.recipe.getRecipe();
            state.recipe.parseIngredients();
            //calculate servings and time
            state.recipe.calcTime();
            state.recipe.calcServings();
            //render recipe
            //
            clearLoader();
            recipeView.renderRecipe(state.recipe);
            console.log(state.recipe);
        } catch (err) {
            alert("Error processing recipe!");
        }
    }
};
// window.addEventListener("hashchange", controlRecipe);
// wondow.addEventListener("load", controlRecipe);
["hashchange", "load"].forEach((e) => {
    window.addEventListener(e, controlRecipe);
});
const controllist = () => {
    //Create a new list IF there is none yet
    if (!state.list) state.list = new List();


    //Add each ingredient to the list and UI
    state.recipe.ingredients.forEach(el => {
        const item = state.list.addItem(el.count, el.unit, el.ingredient);
        listView.renderItem(item);

    });

}

// Handling recipe button clicks
elements.recipe.addEventListener('click', e => {
    if (e.target.matches('.btn-decrease , .btn-decrease *')) {
        //Decrease button is clicked
        if (state.recipe.servings > 1) {
            state.recipe.updateServings('dec');
            recipeView.updateServingsIngredients(state.recipe);
        }
    } else if (e.target.matches('.btn-increase , .btn-increase *')) {
        //Increase button is clicked
        state.recipe.updateServings('inc');
        recipeView.updateServingsIngredients(state.recipe);
    } else if (e.target.matches('.recipe__btn--add, .recipe__btn--add *')) {
        controllist();
    }
});






window.l = new List();