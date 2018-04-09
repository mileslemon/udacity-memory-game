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

// counts number of moves
let movesNum = 0;

// displays number of moves
let moves = document.querySelector('.moves');

// timer
let gameTimer;

// stores a list of all cards flipped by the player
let openCards = [];

// stores matched cards
let matchedCards = [];

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

    //check if a card was clicked
    if (event.target.classList.contains('card')) {

        // identifies the card by its icon class name
        const cardIdentifier = card.querySelector('i').getAttribute('class').split(' ')[1];
    
        card.classList.add('open', 'show');
    
        // if the cards match
        if (openCards.includes(cardIdentifier)) {
            console.log('card matches');
    
            const matchedCard = openCards.pop();
            matchedCards.push(matchedCard, cardIdentifier);
            
            // applies matched color to card couple
            const cardCouple = document.getElementsByClassName(cardIdentifier);
            for ( let i = 0; i < 2; i++ ) {
                cardCouple[i].parentElement.classList.add('match');
            }
            
            openCards = [];
            moveCounter();
        
        // if this is the first click of match attempt
        } else if (openCards.length == 0) {
            openCards.push(cardIdentifier);
    
        // if cards don't match
        } else if (!openCards.length == 0) {
            console.log('card does not match');
    
            // perform incorrect match animation
            const wrongCard = document.getElementsByClassName(openCards);
    
            // hides cards after 1 second if they don't match
            setTimeout(function() {
                for ( let i = 0; i < 2; i++ ) {
                    wrongCard[i].parentElement.classList.remove('open', 'show');
                }
                card.classList.remove('open', 'show');
            }, 1000);
            
            openCards = [];
            moveCounter();
        }

    }

}

function moveCounter () {
    movesNum++;
    moves.innerHTML = movesNum;
}

deck.addEventListener('click', function(event) {
    cardFlip(event);
});

