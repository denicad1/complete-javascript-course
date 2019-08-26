// Global app controller
import axios from 'axios';
async function getResults(query) {

    const proxy = 'https://cors-anywhere.herokuapp.com/'
    const key = '55783bb0daed27066351dbde84adf294';
    try {
        const res = await axios(`${proxy}https://www.food2fork.com/api/search?key=${key}&q=${query}`);
        const recipes = res.data.recipes;
        console.log(recipes);
    } catch (error) {
        alert(error);
    }
}
getResults('pasta');
//55783 bb0daed27066351dbde84adf294
//https: //www.food2fork.com/api/search
