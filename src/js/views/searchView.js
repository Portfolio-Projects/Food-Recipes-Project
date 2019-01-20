// export const add = (a , b) => { return a + b; };
// export const multiply = (a , b) => { return a * b; };
// export const ID = 22;

// importing elements from our base file:
import {elements} from './base';


//creating the UI 
// export const getInput = () => elements.searchInput.value;
const limitRecipeTitle = (title, limit=17)  => {
    let newTitle = [];
    if (title.length > limit) {
        newTitle.push(title.substr(0, limit));
        return `${newTitle}...`;
    }
    return title;
}

const renderRecipe = (recipe) => {
     const markup = `
        <li>
            <a class="results__link" href="#${recipe.recipe_id}">
                <figure class="results__fig">
                    <img src="${recipe.image_url}" alt="${recipe.title})">
                </figure>
                <div class="results__data">
                    <h4 class="results__name">${limitRecipeTitle(recipe.title)}</h4>
                    <p class="results__author">${recipe.publisher}</p>
                </div>
            </a>
        </li>
     `
     document.querySelector('.results__list').insertAdjacentHTML('beforeend', markup);
}

// function which returns the HTML for the buttons
// as type is either previous or next
const createButton = (page, type) => `
    <button class="btn-inline results__btn--${type}" data-goto=${ type === 'prev' ? page-1 : page + 1}>
    <span>Page ${ type === 'prev' ? page-1 : page + 1}</span>
        <svg class="search__icon">
            <use href="img/icons.svg#icon-triangle-${ type === 'prev' ? 'left' : 'right'}"></use>
        </svg>
    </button>
`

const renderButtons = (page, numResults, resperPage) => {
    // using math ceil to round it up to the next integer
    let button;
    const pages = Math.ceil(numResults / resperPage); 

        if( page === 1 && pages > 1 ) {
            //Only button to go to next page
            button = createButton(page, 'next')
        } 
        else if ( page < pages ) {
            //show both buttons
            button = `
            ${createButton(page, 'next')}
            ${createButton(page, 'prev')}
            `
        }    
        else if ( page === pages && pages > 1 ) { 
            //Only button to go to previous page
            button = createButton(page, 'prev')

        }

    elements.searchResPages.insertAdjacentHTML('afterbegin', button);
}


export const renderResults = (recipes, page = 1, resperPage = 10) => {
    // render results of current page
    const start = (page - 1) * resperPage;
    const end = page * resperPage;

    recipes.slice(start, end).forEach(renderRecipe);

    renderButtons(page, recipes.length, resperPage);
} 


