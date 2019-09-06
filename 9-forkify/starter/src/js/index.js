// Global app controller
import Search from "./models/Search";
import * as searchView from "./views/searchView";
import {
    elements,
    renderLoader,
    clearLoader
} from "./views/base";
import Recipe from "./models/Recipe";
//Global State of the App
//search object
//current recipe object
//shopping list object
//liked recipes
const state = {};
// SEARCH CONTROLLER

const controlSearch = async () => {
    //1. get the query
    //    const query = searchView.getInput(); //TODO
    const query = 'pizza';
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

        //create a new recipe object
        state.recipe = new Recipe(id);

        //TESTING
        window.r = state.recipe;

        try {
            //get recipe data
            await state.recipe.getRecipe();
            //calculate servings and time
            state.recipe.calcTime();
            state.recipe.calcServings();
            //render recipe
            //
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
