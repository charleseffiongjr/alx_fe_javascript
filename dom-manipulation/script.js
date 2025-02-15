let quotes = [
    { text: "The journey of a thousand miles begins with one step.", category: "Motivation"},
    { text: "I'm not lazy, I'm on energy-saving mode.", category: "Humor"}
];
const quoteDisplay = document.getElementById("quoteDisplay");
const newQuoteButton = document.getElementById("newQuote");
const newQuoteText = document.getElementById("newQuoteText");
const newQuoteCategory = document.getElementById("newQuoteCategory");

function showRandomQuote(){
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const randomQuote = quotes[randomIndex];
    random.innerHTML = "" 


}
function displayAllQuotes() {
    quoteListElem.innerHTML = "";
    quotes.forEach((quote, index) => {
        const quoteItem = document.createElement("div");
        quoteItem.classList.add("quote-item");
        quoteItem.innerHTML = `
            <p>"${quote.text}"</p>
            <p class="category">- ${quote.category}</p>
        `;
        quoteListElem.appendChild(quoteItem);
    });
}
function createAddQuoteForm(){

}