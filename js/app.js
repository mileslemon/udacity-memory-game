/*
 * Create a list that holds all of your cards
 */


/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}


/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */


// array of card icons
let cardIcons = [
    'fa-diamond',
    'fa-diamond',    
    'fa-anchor',
    'fa-anchor',
    'fa-bolt',
    'fa-bolt',
    'fa-cube',
    'fa-cube',
    'fa-leaf',
    'fa-leaf',
    'fa-bicycle',
    'fa-bicycle',
    'fa-bomb',
    'fa-bomb',
    'fa-paper-plane-o',
    'fa-paper-plane-o'
];

// stores a list of all cards flipped by the player
let openCards = [];

// shuffled deck of cards
const shuffledCards = shuffle(cardIcons);

// array of <i> tags for cards to be applied to
const emptyDeck = document.querySelectorAll('li.card > i');

const deck = document.querySelector('.deck');

// builds the deck of cards using the shuffledDeck
// loop over <i> tags appending the class to them 
for ( let i = 0; i < 16; i++ ) {
    const card = emptyDeck[i];
    const cardIcon = shuffledCards[i];
    card.classList.add(cardIcon);
}

// flips the card on click
function cardFlip (event) {
    const card = event.target;
    const cardIdentifier = card.querySelector('i');
    card.classList.add('open', 'show');
    openCards.push(cardIdentifier);
    console.log(openCards);
}

deck.addEventListener('click', function(event) {
    cardFlip(event);
});
