// Global app controller
import Search from "./models/Search";
import * as searchView from "./views/searchView";
import * as recipeView from "./views/recipeView";
import * as listView from "./views/listView";
import * as likesView from "./views/likesView";
import {
    elements,
    renderLoader,
    clearLoader
} from "./views/base";
import Recipe from "./models/Recipe";
import List from "./models/list";
import Likes from "./models/Likes";
//Global State of the App
//search object
//current recipe object
//shopping list object
//liked recipes
const state = {};

window.state = state;

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
            recipeView.renderRecipe(state.recipe, state.likes.isLiked(id));
            console.log(state.recipe);
        } catch (err) {
            console.log(err);
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
    state.recipe.ingredients.forEach((el) => {
        const item = state.list.addItem(el.count, el.unit, el.ingredient)
        listView.renderItem(item)
    });

}
//Handle delete and update list item events
elements.shopping.addEventListener('click', e => {
    const id = e.target.closest('.shopping__item').dataset.itemid;

    //Handle delete button
    if (e.target.matches('.shopping__delete, .shopping__delete *')) {
        //Delete from state
        state.list.deleteItem(id);
        //Delete from UI
        listView.deleteItem(id);

        //Handle the count update
    } else if (e.target.matches('.shopping__count-value')) {
        const val = parseFloat(e.target.value, 10);
        state.list.updateCount(id, val);
    }

});

/**
Like Controller

*/
//TESTING
state.likes = new Likes();
likesView.toggleLikeMenu(state.likes.getNumLikes());


const controlLike = () => {
    if (!state.likes) {
        state.likes = new Likes();
    }
    const currentID = state.recipe.id;
    //User has not yet liked current recipe
    if (!state.likes.isLiked(currentID)) {
        //Add like to the state
        const newLike = state.likes.addLike(currentID, state.recipe.title, state.recipe.author, state.recipe.img);
        //Toggle the like button
        likesView.toggleLikeBtn(true);
        //Add like to UI list
        likesView.renderLike(newLike);


        //User has liked current recipe
    } else {
        //Remove like from the state
        state.likes.deleteLike(currentID);
        //Toggle the like button
        likesView.toggleLikeBtn(false);
        //Remove like from UI list
        likesView.deleteLike(currentID);
    }
    likesView.toggleLikeMenu(state.likes.getNumLikes());
}

//Restore like recipes on page load
windows.addEventListener('load', () => {
    state.likes = new Likes();

    //restore likes
    state.likes.readStorage();

    //toggle like menu button
    likesView.toggleLikeMenu(state.likes.getNumLikes());

    ////render the existing likes
    state.likes.likes.forEach(like => likesView.renderLike(like))
});


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
        //Add ingredients to shopping list
        controllist();
    } else if (e.target.matches('.recipe__love, .recipe__love *')) {
        // Like controller
        controlLike();
    }
});






window.l = new List();
