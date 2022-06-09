/* 
global constants
*/
const API_KEY = 'nOjzgnRK5wSxGHruvjd3HVSux7Zxk46H';
const RATING = 'g';
const LIMIT = 9;
let offset = 0;
let wordSearch = '';

/* 
Get form 1 using its id
*/
const form1 = document.querySelector('#form1');
const loadbutton = document.querySelector('#Load-button');
const gifArea = document.querySelector('#gifarea');
const input = document.querySelector('input');

//AddEventListener to form 1
form1.addEventListener('submit', handleFormSubmit);
loadbutton.addEventListener('click', getMore);

//AddEventListener to load more button


async function handleFormSubmit(event){
    // prevent the default behaviour
    event.preventDefault();

    //clear the gif area
    if(gifArea){
        gifArea.innerHTML = ``;
    }

    //get the user's input
    wordSearch = event.target[0].value;

    //make the apiurl
    const URL = `http://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&q=${wordSearch}&limit=${LIMIT}&rating=${RATING}&offset=${offset}`;
    let result = await fetch(URL);
    jsonResult = await result.json();

    displayResults(jsonResult.data);

    //clear the input textbox 
    input.value = '';

    return;
}

/** 
 the imagesArray @param is an array of various gif objects
 that represent a gif 
*/
function displayResults(imagesArray){
    //Add the images to the webpage.
    imagesArray.forEach( gif => {
        gifArea.innerHTML += `<img src="${gif.images.original.url}" alt="${gif.title}" class="displayImages">`;
    })

    //Change the load button display value
    loadbutton.style.display = 'initial';
    return ;
}


async function getMore(event){
    offset += LIMIT;

    //make the apiurl
    const URL = `http://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&q=${wordSearch}&limit=${LIMIT}&rating=${RATING}&offset=${offset}`;
    let result = await fetch(URL);
    jsonResult = await result.json();

    displayResults(jsonResult.data);
}