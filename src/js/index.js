// Global app controller

//import str from './models/Search';

// import { add, multiply, ID} from './views/searchView'; 

// import { add as a, multiply as m, ID} from './views/searchView'; 

//import * as searchView from './views/searchView'; 

// console.log(ID);
// console.log(`This is the multiplication result: ${multiply(3,5)}`);

// const x = 22;

// console.log(`Variable x is ${x}!`);

// in case you want to export multiple things from the same module, we use names export: meaning we have to use the same name as they are in the file from which we want to import;


// console.log(`Using imported functions! ${add(ID, 2)} and ${multiply(3,5)}. ${str}`);

// console.log(`Using imported functions! ${a(ID, 2)} and ${m(3,5)}. ${str}`);

//console.log(`Using imported functions! ${searchView.add(searchView.ID, 2)} and ${searchView.multiply(3,5)}. \n${str}`);

// import 'babel-polyfill';

import Search  from './models/Search';
import Recipe from './models/Recipe';
import * as searchView from './views/searchView';
import * as recipeView from './views/recipeView';
import { elements, renderLoader, clearLoader } from './views/base';



// GLobal State of the App
// Building the Search Controller:
//  - Search Object;
//  - Current recipe Object;
//  - Shopping list Object;
//  - Liked recipes;  

//  This file represents the controller is where we have all the events listeners
// and we can control what should happen based on User actions

//QUESTION:Where do we attach the Event Listeners if an element is not not yet rendered when the page is loaded?
// ANSWER: We will use EVENT DELEGATION - the concept is that we attach an event listener to an element that is already there and then we try to figure out where the click happened, so that we can take action based on that. 

const state = {

}

// SEARCH CONTROLLER
const controlSearch =  async () => {
    // 1. Get query from view;
    const query = elements.searchInput.value; 
    
    if (query) {
        // 2) New search Object and add state;
        state.search = new Search(query);

        // 3) Prepare UI for results
        //clearing the input and the div result for the next search
        elements.searchInput.value = '';
        elements.searchResList.innerHTML = '';
        renderLoader(elements.loaderParent);

        try {
            // 4) Search for recipies:  
            await state.search.getRecipes();

            // 5) Render results on UI
            console.log(state.search.data);
            clearLoader();
            searchView.renderResults(state.search.data);
            
        } catch (error) {
          //  alert(`Something went wrong with the search ...`);
            clearLoader();
        }


    }
}


elements.searchForm.addEventListener('submit', e => {
    e.preventDefault();
    controlSearch();
})

//adding event listener to the parent element for buttons section using the event delegation concept: 
elements.searchResPages.addEventListener('click', e => {
    //we are using closest because no matter where we click on the element 
    // it will always return the element passed to the closest method;
    // it will only select and return upon clicking only the element we need
    const btn= e.target.closest('.btn-inline');
    if( btn ) {
        // if there is a btn than let's read goToPage
        // and now we read the data stored in that btn dataset
        // parseInt converts to an integer in base 10 from 1-9
        const goToPage = parseInt(btn.dataset.goto, 10);
        elements.searchResList.innerHTML = '';
        elements.searchResPages.innerHTML = '';
        searchView.renderResults(state.search.data, goToPage);
    }
})

const renderRecipe = (recipe) => {
    const markup = `
       <li>
           <a class="results__link" href="#${recipe.recipe_id}">
               <figure class="results__fig">
                   <img src="${recipe.image_url}" alt="${recipe.title}">
               </figure>
               <div class="results__data">
                   <h4 class="results__name">${recipe.title}</h4>
                   <p class="results__author">${recipe.publisher}</p>
               </div>
           </a>
       </li>
    `
   elements.searchResList.insertAdjacentHTML('beforeend', markup);
}



export const renderResults = (recipes) => {
   recipes.forEach(renderRecipe);
} 

// *****************
// RECIPE CONTROLLER
// *****************

//Code created only for test purpose
    // const recipe = new Recipe(46956);
    // const r = recipe.getRecipe();

    // console.log(r);

const controlRecipe = async () =>{
    // using window.location which represents the entire url
    //  we use on it the .hash property to get the #
    // Get ID from URL
    const id = window.location.hash.replace('#', '');
    console.log(id);

    if(id) {
        // Prepare the UI for changes:
        renderLoader(elements.recipe);

        // Create new recipe Object:
        state.recipe = new Recipe(id);

        try {

            // Get recipe data
            // Since getRecipes is an async function and returns a promise 
            //  ,we use await to wait for the promise to get back with the resolved value;
            await state.recipe.getRecipe();

            // Calculate servings and preparation time
            state.recipe.calcTime();
            state.recipe.calcServings();
            

            // Render recipe
            //console.log(state.recipe);
            clearLoader();
            recipeView.renderRecipe(state.recipe);
            console.log(state.recipe);
            
        } catch (error) {
            //Logging the error if promise is rejected:
            console.log(error);
            //alert(`Error processing recipe! Try again later.`);
        }

    }
    
}

// ***************** NEEDS REFACTORING // *****************
// Using the hchange event - which triggers each time the # from the URL changes
window.addEventListener('hashchange', controlRecipe);

// Enabeling #change on load event in order to see the data if the user clicks on another recipe:
window.addEventListener('load', controlRecipe);
// *****************// *****************// *****************


// Setting a solution for calling a method for different events listeners
// creating an array containing the name of events you plan to call and then looping with forEach to call the method for each of the events:
['hashchange', 'load'].forEach( event => {
    window.addEventListener(event, controlRecipe);
})