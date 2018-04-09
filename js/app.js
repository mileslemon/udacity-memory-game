
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

// star rating (player performance)
const stars = document.querySelector('.stars');
const starList = stars.querySelectorAll('i.fa-star');

// timer
let gameTimer;

// boolen whether the timer has been started or not
let isTimerActive = false;

// variables to increment game timer
let timerSeconds = 0,
timerMinutes = 0;

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
    startTimer();
    const card = event.target;
    //check if a card was clicked and wasn't already clicked
    if (card.classList.contains('card') && !card.classList.contains('clicked')) {
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
            // removes clicked class
            const clickedCards = document.querySelector('.clicked');
            clickedCards.classList.remove('clicked');
            
            openCards = [];
            moveCounter();
        // if this is the first click of match attempt
        } else if (openCards.length == 0) {
            card.classList.add('clicked');
            openCards.push(cardIdentifier);
        // if cards don't match
        } else if (!openCards.length == 0) {
            console.log('card does not match');
            // hides cards after 1 second if they don't match
            const wrongCard = document.getElementsByClassName(openCards);
            setTimeout(function() {
                for ( let i = 0; i < 2; i++ ) {
                    wrongCard[i].parentElement.classList.remove('open', 'show');
                }
                card.classList.remove('open', 'show');
            }, 1000);
            // removes clicked class
            const clickedCards = document.querySelector('.clicked');
            clickedCards.classList.remove('clicked');

            openCards = [];
            moveCounter();
        }

    }

}

function moveCounter () {
    movesNum++;
    moves.innerHTML = movesNum;

    // decrease star rating based on player performance (number of moves)
    console.log(starList);
    if (movesNum > 10 && movesNum <= 15) {
        starList[2].classList.remove('fa-star');
        starList[2].classList.add('fa-star-o');
    } else if (movesNum > 15 && movesNum <= 20) {
        starList[1].classList.remove('fa-star');
        starList[1].classList.add('fa-star-o');
    } else if (movesNum > 20) {
        starList[0].classList.remove('fa-star');
        starList[0].classList.add('fa-star-o');
    } 
}

deck.addEventListener('click', function(event) {
    cardFlip(event);
});

function incrementTimer() {
    timerSeconds++;
    if(timerSeconds >= 60) {
        timerSeconds = 0;
        timerMinutes++;
    }
    const timerEl = document.querySelector('.timer');
    timerEl.textContent = (timerMinutes ? (timerMinutes > 9 ? timerMinutes : "0" + timerMinutes) : "00") + ":" + (timerSeconds > 9 ? timerSeconds : "0" + timerSeconds);
    timer();
}

function timer() {
    gameTimer = setTimeout(incrementTimer, 1000);
}

function startTimer() {
    if (!isTimerActive) {
        isTimerActive = true;
        timer();
    }
}