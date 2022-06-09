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

    displayResults(await getResults());

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

    //get the results from the api call and load more
    displayResults(await getResults());
}

async function getResults(){
    const URL = `http://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&q=${wordSearch}&limit=${LIMIT}&rating=${RATING}&offset=${offset}`;
    let result = await fetch(URL);
    let jsonResult1 = await result.json();
    return jsonResult1.data;
}

window.onload = async function () {
    // execute your functions here to make sure they run as soon as the page loads
    const randoms = ["anime", "cars", "party", "college", "travel", "animals", "fitness", "software", "extreme sports", "outdoor games", "outdoors", "movies", "video games"]
    wordSearch = randoms[Math.floor(Math.random() * 13)];
    displayResults(await getResults());

    loadbutton.style.display = 'none';
  }