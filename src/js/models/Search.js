import axios from 'axios';
import { key, proxy } from '../config';

export default class Search {
    constructor ( query ) {
        this.query = query;

    }
    
    async getRecipes () {
    
        console.log(`Asyn fn call follows in several moments:`);
        try {
            
            const res = await axios(`https://www.food2fork.com/api/search?key=${key}&q=${this.query}`);
    
            //encapsulating the result inside the Search Object
            this.data = res.data.recipes; 
        
            // Advantages of using Axios: 
                // automatically returns json
                // better at error handling;
                // works in all the broswers
    
            // console.log(this.data);
    
        }
        catch (error) {
            alert (error);
        }
    
    }

}



// getRecipes('vegan cookies');