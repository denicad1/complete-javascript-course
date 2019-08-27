import axios from 'axios';

export default class Search {
    constructor(query) {
        this.query = query;
    };

    async getResults() {
        const proxy = 'https://cors-anywhere.herokuapp.com/'
        const key = '55783bb0daed27066351dbde84adf294';
        try {
            const res = await axios(`${proxy}https://www.food2fork.com/api/search?key=${key}&q=${this.query}`);
            this.result = res.data.recipes;
            // console.log(this.result);
        } catch (error) {
            alert(error);
        }
    };
};
