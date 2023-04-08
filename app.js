const quoteContainer = document.querySelector('#quote-container');
const quoteText = document.querySelector('#quote');
const authorText = document.querySelector('#author');
const twitterBtn = document.querySelector('#twitter');
const newQuoteBtn = document.querySelector('#new-quote');
const loader = document.querySelector('#loader');

let apiQuotes = [];

// Loading Spinner Shown
function loading() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

// Remove Loading Spinner
function complete() {
    quoteContainer.hidden = false;
    loader.hidden = true;
}

// Show New Quote
function newQuote() {
    loading();
    // Pick a random quote from array
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
    // Check if Author field is blank and replace it with 'Unknown'
    if (!quote.author) {
        authorText.textContent = 'Unknown';
    } else {
        authorText.textContent = quote.author;
    }
    // Check Quote length to determine styling
    if (quote.text.length > 120) {
        quoteText.classList.add('long-quote');
    } else {
        quoteText.classList.remove('long-quote');
    }
    // Set Quote, Hide Loader
    quoteText.textContent = quote.text;
    complete();
}

// Get Quotes From API
async function getQuotes() {
    loading();
    const apiUrl = 'https://type.fit/api/quotes';
    try {
        const response = await fetch(apiUrl);
        apiQuotes = await response.json();
        newQuote();
    } catch (error) {
        // Catch Error Here
    }
}

// Tweet Quote
function tweetQuote() {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.innerText} - ${authorText.innerText}`;
    window.open(twitterUrl, '_blank');
}

// Event Listeners
newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuote);

// On Load
getQuotes();
