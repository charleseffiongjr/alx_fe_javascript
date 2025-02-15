let quotes = [
    { text: "The journey of a thousand miles begins with one step.", category: "Motivation"},
    { text: "I'm not lazy, I'm on energy-saving mode.", category: "Humor"}
];

quotes = JSON.parse(localStorage.getItem('quotes')) || [];

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
const text = newQuoteText.value.trim() 
const category = newQuoteCategory.value.trim()

localStorage.setItem('quote', JSON.stringify(quotes))
}

function exportQuotes() {
    if (quotes.length === 0) {
      alert("No quotes available to export.");
      return;
    }
  
    // Convert Quotes Array to JSON String
    const quotesJSON = JSON.stringify(quotes, null, 2);
  
    // Create Blob from JSON String
    const blob = new Blob([quotesJSON], { type: "application/json" });
  
    // Create Download Link
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "quotes.json";
  
    // Trigger Download
    document.body.appendChild(a);
    a.click();
  
    // Clean up
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }
  function updateDOM() {
    let quotesHTML = `
      <h1>Dynamic Quote Generator</h1>
      <div>
          <input id="newQuoteText" type="text" placeholder="Enter a new quote" />
          <input id="newQuoteCategory" type="text" placeholder="Enter quote category" />
          <button onclick="addQuote()">Add Quote</button>
      </div>
      <button id="newQuote">Show New Quote</button>
      <button id="exportQuotes">Export Quotes to JSON</button>
    `;
  }

newQuoteButton.addEventListener("click", showRandomQuote);