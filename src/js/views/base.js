// Here is where we place the reusable stuff:
export const elements = {
    searchForm: document.querySelector('.search'),
    searchInput: document.querySelector('.search__field'),
    searchResList: document.querySelector('.results__list'),
    loaderParent: document.querySelector('.results'),
    searchResPages: document.querySelector('.results__pages'),
    recipe: document.querySelector('.recipe')
}

// we build a reusabiity function to pass the loader no matter to which element we attach it:

export const elementsString = {
    loader: 'loader'
}

export const renderLoader = parent => {
    const loader = `
        <div class="${elementsString.loader}">
        <svg>
            <use href="img/icons.svg#icon-cw"></use>
        </svg>
        </div>
    `;
    parent.insertAdjacentHTML('afterbegin', loader)
}

export const clearLoader = () => {
    const loader = document.querySelector(`.${elementsString.loader}`);
        if(loader) loader.parentElement.removeChild(loader);

}


