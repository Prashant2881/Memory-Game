const cards = document.querySelectorAll('.card');
let flippedCards = [];
let matchedCards = 0;
let isLocked = false;

function flipCard(card) {
    if (isLocked || card.classList.contains('flipped') || card.classList.contains('matched')) return;

    card.classList.add('flipped');
    flippedCards.push(card);

    if (flippedCards.length === 2) {
        checkForMatch();
    }
}

function checkForMatch() {
    isLocked = true;
    const [firstCard, secondCard] = flippedCards;

    if (firstCard.dataset.card === secondCard.dataset.card) {
        matchedCards += 2;
        firstCard.classList.add('matched');
        secondCard.classList.add('matched');
        flippedCards = [];

        if (matchedCards === cards.length) {
            alert('You won! All cards matched.');
        }

        isLocked = false;
    } else {
        setTimeout(() => {
            firstCard.classList.remove('flipped');
            secondCard.classList.remove('flipped');
            flippedCards = [];
            isLocked = false;
        }, 1000);
    }
}

// Add event listeners to cards
cards.forEach(card => {
    card.addEventListener('click', () => flipCard(card));
});

// Shuffle cards to randomize their initial positions
(function shuffleCards() {
    cards.forEach(card => {
        const randomIndex = Math.floor(Math.random() * cards.length);
        card.style.order = randomIndex;
    });
})();

// Reset game state (flipped cards, matched cards, and shuffled positions)
function restartGame() {
    matchedCards = 0;
    flippedCards = [];
    isLocked = false;

    cards.forEach(card => {
        card.classList.remove('flipped', 'matched');
    });

    // Shuffle the cards again after resetting
    shuffleCards();
}

// Add event listener for the restart button
document.querySelector('.restart-btn').addEventListener('click', restartGame);
