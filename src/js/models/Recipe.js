import axios from 'axios';
import { key, proxy } from '../config';

export default class Recipe {
    
    constructor(id) {
        this.id = id;
    }
    
    // due to the fact that is an async function, returns a promise
    async getRecipe(){
        // console.log(`Asyn fn call follows in several moments:`);
        try {
            
            const res = await axios(`https://www.food2fork.com/api/get?key=${key}&rId=${this.id}`);
            
            this.title = res.data.recipe.title;
            this.author = res.data.recipe.publisher;
            this.image = res.data.recipe.image_url;
            this.url = res.data.recipe.source_url;
            this.ingredients = res.data.recipe.ingredients;
        
        }
        catch (error) {
            console.log(error);
            alert(`Connection timed out!`);
        }   
    }

    // function to make a rough estimation on the time we need to prepare the food based on the number of ingredients
    calcTime(){
        // we start from the presumption that we need 15 min preparation for a 3 ingredients food
        const ingrNr = this.ingredients.length;
        const periods = Math.ceil( ingrNr / 3 );
        this.time = periods * 15;
    }

    // function that calculates the number of servings per food size;
    calcServings(){
        // we are setting a default serving size
        this.servings = 4;
    }

    parseIngredients() {
        const unitsLong = ['tablespoons', 'tablespoon', 'ounces', 'ounce', 'teaspoons', 'teaspoon', 'cups', 'pounds'];
        const unitShort = [ 'tbsp', 'tbsp', 'oz', 'oz', 'tsp', 'tsp', 'cup', 'pound'];

        const newIngredients = this.ingredients.map(el => {
            // 1) Uniform units: 
            let ingredient = el.toLowerCase();
            unitsLong.forEach( (unit, i) => {
                ingredient = ingredient.replace( unit, unitShort[i]);
            });
            // 2) Remove parantheses
            ingredient.replace(/\W/g, "");

            // 3) Parse ingredients into count, unit and ingredient:  
            // Convert the ingredient into an array:
            const arrIng = ingredient.split('');
            const unitIndex = arrIng.findIndex ( 
                // for each current element it tests if that element is inside of the units array
                el => unitShort.includes(el));
            
            //Initializing the ingredient Obj in order to mutate it after 
            let objIng;
            if (unitIndex > -1) {
                // There is a UNIT
                // example: 4 1/2 cups, arrCount is [4, 1/2] --> eval("4+1/2") --> 4.5
                // example 4 cups, arrCoutn is [4]
                const arrCount = arrIng.slice(0, unitIndex);
                
                let count;
                if(arrCount.length === 1) {
                    count = eval(arrIng[0].replace('-', '+'));
                }
                else {
                    count = eval(arrCount.join('+'));
                }

                objIng = {
                    count,
                    unit: arrIng[unitIndex],
                    ingredient:arrIng.slice(unitIndex + 1).join(' ')
                }
            }
            // Checking if the first element of the array is a number
            else if ( parseInt(arrIng[0], 10)) {
                //There is NO UNIT, but the 1st element is number 
                objIng = {
                    count: parseInt(arrIng[0], 10),
                    unit: '',
                    ingredient: arrIng.slice(1).join('')
                }
            }
            else if(unitIndex === -1) {
                //There is NO unit and NO Number in 1st position
                objIng = {
                    count: 1,
                    unit: '',
                    ingredient
                }
            }

            return objIng;
        });

        this.ingredients =  newIngredients;

        return this.ingredients;
    }


}