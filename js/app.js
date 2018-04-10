
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

// tracks number of player moves
let movesNum = 0;

// displays number of moves
let moves = document.querySelector('.moves');

// star rating (player performance)
const stars = document.querySelector('.stars');
const starList = stars.querySelectorAll('i.fa-star');

// tracks player score for modal
let playerScore = 3;

// timer
let gameTimer;

// boolean whether the timer has been started or not
let isTimerActive = false;

// variables to increment game timer
let timerSeconds = 0,
timerMinutes = 0;

// stores a list of all cards flipped by the player
let openCards = [];

// stores matched cards
let matchedCards = 0;

// tracks card pairs for comparison
let cardPair = [];

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

    // check if a card was clicked and wasn't already clicked
    if (card.classList.contains('card') && !card.classList.contains('clicked') && !card.classList.contains('match')) {
        // identifies the card by its icon class name
        const cardIdentifier = card.querySelector('i').getAttribute('class').split(' ')[1];
        
        card.classList.add('open', 'show');
    
        // if the cards match
        if (openCards.includes(cardIdentifier)) {
            cardPair.push(card);
            
            // applies matched color to card couple
            for ( let i = 0; i < 2; i++ ) {
                cardPair[i].classList.add('match', 'wiggle');
            }
            // removes clicked class
            const clickedCards = document.querySelector('.clicked');
            clickedCards.classList.remove('clicked');
            
            matchedCards++;
            openCards = [];
            cardPair = [];        
            moveCounter();
            winCondition();

        // if this is the first click of match attempt
        } else if (openCards.length == 0) {
            card.classList.add('clicked', 'bounce');
            cardPair.push(card);
            openCards.push(cardIdentifier);
            setTimeout(() => {
                card.classList.remove('bounce');
            }, 500);

        // if cards don't match
        } else if (!openCards.length == 0) {
            cardPair.push(card);
            cardPair[0].classList.add('wrong', 'shake');
            cardPair[1].classList.add('wrong', 'shake');

            // hides cards after 1 second if they don't match
            setTimeout(() => {
                const wrongCards = document.querySelectorAll('.wrong');
                for ( let i = 0; i < 2; i++ ) {
                    wrongCards[i].classList.remove('open', 'show', 'wrong', 'shake');
                }
            }, 1000);

            // removes clicked class
            const clickedCards = document.querySelector('.clicked');
            clickedCards.classList.remove('clicked');

            openCards = [];
            cardPair = [];
            moveCounter();
        }
    }
}

function moveCounter () {
    movesNum++;
    moves.innerHTML = movesNum;

    // decrease star rating based on player performance (number of moves)
    if (movesNum > 15 && movesNum <= 20) {
        starList[2].className = 'fa fa-star-o'
        playerScore = 2;
    } else if (movesNum > 20 && movesNum <= 25) {
        starList[1].className = 'fa fa-star-o'
        playerScore = 1;
    } else if (movesNum > 25) {
        starList[0].className = 'fa fa-star-o'
        playerScore = 0;
    } 
}

deck.addEventListener('click', (event) => {
    cardFlip(event);
});

// stopwatch function based on Daniel Hug's (https://jsfiddle.net/Daniel_Hug/pvk6p/)
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

function winCondition () {
    if (matchedCards === 8) {
        const modal = document.querySelector('.modal');
        const time = document.querySelector('.timer').textContent;
        const moves = document.querySelector('.moves').textContent;
        const cards = document.querySelectorAll('.card');
        
        // add win animation to all cards
        for (let i = 0; i < 16; i++) {
            cards[i].classList.add('winWiggle');
        }
        
        // stop timer
        clearTimeout(gameTimer);

        // modal
        const modalHeading = document.querySelector('.modalHeading');
        const modalStars = document.querySelector('.modalStars');
        const modalStarsList = modalStars.querySelectorAll('i.fa-star-o');
        const modalText = document.querySelector('.modalWindow > p');
        const modalMoves = document.querySelector('.modalMoves');
        const modalTime = document.querySelector('.modalTime');
        const modalButton = document.querySelector('.modalButton')


        // set modal heading based on playerScore
        switch (playerScore) {
            case 3:
                modalHeading.textContent = 'Perfect Score!'
                break;
            case 2:
                modalHeading.textContent = 'Excellent Score!'
                break;
            case 1:
                modalHeading.textContent = 'Good Job!'
                break;
            case 0:
                modalHeading.textContent = 'Nice try!'
                break;
        }

        // display player moves and time
        modalMoves.textContent = moves;
        modalTime.textContent = time;

        // play again button
        // modalButton.addEventListener('click', location.reload());

        setTimeout(() => {
            modal.style.display = 'block';
            modal.classList.add('fadein-down');
            
            // heading
            setTimeout(() => {
                modalHeading.style.display = 'block';
                modalHeading.classList.add('fadein-down');
            }, 500);

            // stars score
            setTimeout(() => {
                let i = 0;

                modalStars.style.display = 'block';
                modalStars.classList.add('fadein-down');

                function displayScore () {
                    if (playerScore > 0) {
                        setTimeout(() => {
                            modalStarsList[i].className = 'fa fa-star pop';
                            i++;
                            if (i < playerScore) {
                                displayScore();
                            }
                        }, 250);
                    }
                }
                setTimeout(displayScore, 700);
            }, 800);

            // modal text 
            setTimeout(() => {
                modalText.style.display = 'block';
                modalText.classList.add('fadein')
            }, 1750)
            
            // play again button
            setTimeout(() => {
                modalButton.style.display = 'block';
                modalButton.classList.add('fadein')
            }, 2250)
            
        }, 2000);
    }
}

// game restart functionality
function restartGame () {
    document.querySelector('.modalButton').addEventListener('click', () => {
        location.reload();
    });
    document.querySelector('.restart').addEventListener('click', () => {
        location.reload();
    });
}

restartGame();