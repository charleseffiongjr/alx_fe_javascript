// let quotes = [
//     { text: "The journey of a thousand miles begins with one step.", category: "Motivation"},
//     { text: "I'm not lazy, I'm on energy-saving mode.", category: "Humor"}
// ];

// quotes = JSON.parse(localStorage.getItem('quotes')) || [];

// const quoteDisplay = document.getElementById("quoteDisplay");
// const newQuoteButton = document.getElementById("newQuote");
// const newQuoteText = document.getElementById("newQuoteText");
// const newQuoteCategory = document.getElementById("newQuoteCategory");

// function showRandomQuote(){
//     const randomIndex = Math.floor(Math.random() * quotes.length);
//     const randomQuote = quotes[randomIndex];
//     random.innerHTML = "" 


// }
// function displayAllQuotes() {
//     quoteListElem.innerHTML = "";
//     quotes.forEach((quote, index) => {
//         const quoteItem = document.createElement("div");
//         quoteItem.classList.add("quote-item");
//         quoteItem.innerHTML = `
//             <p>"${quote.text}"</p>
//             <p class="category">- ${quote.category}</p>
//         `;
//         quoteListElem.appendChild(quoteItem);
//     });
// }
// function createAddQuoteForm(){
// const text = newQuoteText.value.trim() 
// const category = newQuoteCategory.value.trim()

// localStorage.setItem('quote', JSON.stringify(quotes))
// }

// function exportQuotes() {
//     if (quotes.length === 0) {
//       alert("No quotes available to export.");
//       return;
//     }
  
//     // Convert Quotes Array to JSON String
//     const quotesJSON = JSON.stringify(quotes, null, 2);
  
//     // Create Blob from JSON String
//     const blob = new Blob([quotesJSON], { type: "application/json" });
  
//     // Create Download Link
//     const url = URL.createObjectURL(blob);
//     const a = document.createElement("a");
//     a.href = url;
//     a.download = "quotes.json";
  
//     // Trigger Download
//     document.body.appendChild(a);
//     a.click();
  
//     // Clean up
//     document.body.removeChild(a);
//     URL.revokeObjectURL(url);
//   }

//   function updateDOM() {
//     let quotesHTML = `
//       <h1>Dynamic Quote Generator</h1>
//       <div>
//           <input id="newQuoteText" type="text" placeholder="Enter a new quote" />
//           <input id="newQuoteCategory" type="text" placeholder="Enter quote category" />
//           <button onclick="addQuote()">Add Quote</button>
//       </div>
//       <button id="newQuote">Show New Quote</button>
//       <button id="exportQuotes">Export Quotes to JSON</button>
//     `;
//   }
//   function importFromJsonFile(event) {
//     const fileReader = new FileReader();
//     fileReader.onload = function(event) {
//       const importedQuotes = JSON.parse(event.target.result);
//       quotes.push(...importedQuotes);
//       saveQuotes();
//       alert('Quotes imported successfully!');
//     };
//     fileReader.readAsText(event.target.files[0]);
//   };

  
// function populateCategories() {
//   const categoryFilter = document.getElementById("categoryFilter");
//   categoryFilter.innerHTML = '<option value="">Select Category</option>';

  
//   const categories = [...new Set(quotes.map(quote => quote.category))];


//   categories.forEach(category => {
//     const option = document.createElement("option");
//     option.value = category;
//     option.textContent = category;
//     categoryDropdown.appendChild(option);
//   });
// }
// function filterQuotes(){
//     const selectedCategory = document.getElementById('categoryFilter').value

//     localStorage.setItem('selectedCategory', selectedCategory)

//     const filteredQuote = selectedCategory 
//     ? quotes.filter (quote => quote.category === delectdCategory)
//     : quotes;
// }


// newQuoteButton.addEventListener("click", showRandomQuote);







let quotes = [
    { text: "The journey of a thousand miles begins with one step.", category: "Motivation"},
    { text: "I'm not lazy, I'm on energy-saving mode.", category: "Humor"}
];


const API_URL = 'https://jsonplaceholder.typicode.com/posts';
function showNotification(message) {
    const notification = document.getElementById("notification");
    notification.innerText = message;
    notification.style.display = "block";
    setTimeout(() => {
        notification.style.display = "none";
    }, 3000);
}
// Load Quotes from Local Storage
quotes = JSON.parse(localStorage.getItem('quotes')) || [];

const quoteDisplay = document.getElementById("quoteDisplay");
const newQuoteButton = document.getElementById("newQuote");
const newQuoteText = document.getElementById("newQuoteText");
const newQuoteCategory = document.getElementById("newQuoteCategory");

// Show Random Quote
function showRandomQuote() {
    if (quotes.length === 0) {
        alert("No quotes available!");
        return;
    }
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const randomQuote = quotes[randomIndex];
    const quoteHTML = `
        <div class="quote-item">
            <p>"${randomQuote.text}"</p>
            <p class="category">- ${randomQuote.category}</p>
        </div>
    `;
    quoteDisplay.innerHTML = quoteHTML;
}


// Display All Quotes
function displayAllQuotes() {
    let quotesHTML = "";
    quotes.forEach((quote) => {
        quotesHTML += `
            <div class="quote-item">
                <p>"${quote.text}"</p>
                <p class="category">- ${quote.category}</p>
            </div>
        `;
    });
    
    quoteDisplay.innerHTML = ""; // Clear existing quotes
displayAllQuotes();          // Re-populate with updated quotes

}
function showConflictModal(serverQuotes) {
    const conflictModal = document.getElementById("conflictModal");
    const conflictDetails = document.getElementById("conflictDetails");

    conflictDetails.innerHTML = '';
    serverQuotes.forEach((serverQuote, index) => {
        const localQuote = quotes[index];
        conflictDetails.innerHTML += `
            <div class="conflict-item">
                <h3>Conflict ${index + 1}</h3>
                <p><strong>Local:</strong> ${localQuote?.text || 'N/A'}</p>
                <p><strong>Server:</strong> ${serverQuote.text}</p>
            </div>
        `;
    });

    conflictModal.style.display = "block";
}

function closeConflictModal() {
    document.getElementById("conflictModal").style.display = "none";
}

function resolveConflict(choice) {
    if (choice === 'local') {
        console.log("User chose to keep local version.");
        showNotification("Kept Local Version");
    } else if (choice === 'server') {
        console.log("User chose to keep server version.");
        fetchQuotes().then(() => {
            showNotification("Overwritten with Server Version");
            displayAllQuotes();
        });
    }
    closeConflictModal();
}
// Add New Quote
function addQuote() {
    const text = newQuoteText.value.trim();
    const category = newQuoteCategory.value.trim();

    if (text === "" || category === "") {
        alert("Both quote and category are required!");
        return;
    }

    const newQuote = { text, category };
    quotes.push(newQuote);

    // Save to Local Storage
    localStorage.setItem('quotes', JSON.stringify(quotes));

    // Clear Input Fields
    newQuoteText.value = "";
    newQuoteCategory.value = "";

    // Update DOM
    displayAllQuotes();
    populateCategories();
}

// Export Quotes to JSON
function exportQuotes() {
    if (quotes.length === 0) {
        alert("No quotes available to export.");
        return;
    }

    const quotesJSON = JSON.stringify(quotes, null, 2);
    const blob = new Blob([quotesJSON], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "quotes.json";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

// Import Quotes from JSON File
function importFromJsonFile(event) {
    const fileReader = new FileReader();
    fileReader.onload = function(event) {
        const importedQuotes = JSON.parse(event.target.result);
        quotes.push(...importedQuotes);
        localStorage.setItem('quotes', JSON.stringify(quotes));
        alert('Quotes imported successfully!');
        displayAllQuotes();
        populateCategories();
    };
    fileReader.readAsText(event.target.files[0]);
}

// Populate Categories Dropdown
function populateCategories() {
    const categoryFilter = document.getElementById("categoryFilter");
    categoryFilter.innerHTML = '<option value="all">All Categories</option>';

    const categories = [...new Set(quotes.map(quote => quote.category))];

    categories.forEach(category => {
        const option = document.createElement("option");
        option.value = category;
        option.textContent = category;
        categoryFilter.appendChild(option);
    });

    const lastSelectedCategory = localStorage.getItem('selectedCategory');
    if (lastSelectedCategory) {
        categoryFilter.value = lastSelectedCategory;
    }
}

// Filter Quotes by Category
function filterQuotes() {
    const selectedCategory = document.getElementById('categoryFilter').value;
    localStorage.setItem('selectedCategory', selectedCategory);

    const filteredQuotes = selectedCategory !== "all"
        ? quotes.filter(quote => quote.category === selectedCategory)
        : quotes;

    let quotesHTML = "";
    filteredQuotes.forEach(quote => {
        quotesHTML += `
            <div class="quote-item">
                <p>"${quote.text}"</p>
                <p class="category">- ${quote.category}</p>
            </div>
        `;
    });
    quoteDisplay.innerHTML = quotesHTML;
}
async function fetchQuotesFromServer() {
    try {
        const response = await fetch(API_URL);
        const data = await response.json();
        // Transform the response to fit the quotes format
        serverQuotes = serverData.map(post => ({
            text: post.title,
            category: "General"
        }));

        const isDifferent = JSON.stringify(serverQuotes) !== JSON.stringify(quotes);
        if (isDifferent) {
            console.log("Conflict detected! Overriding local data with server's version.");
            quotes = serverQuotes;
            displayAllQuotes();
        }
    
    
    } catch (error) {
        console.error('Error fetching quotes:', error);
    }
}

async function syncQuotes(newQuote) {
    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newQuote)
        });
        const data = await response.json();
        // Push to local array and update DOM
        quotes.push(newQuote);
        displayAllQuotes();
    } catch (error) {
        console.error('Error posting quote:', error);
    }
}
setInterval(fetchQuotes, 10000);
window.onload = fetchQuotes;
// Event Listeners
document.querySelector("button[onclick='addQuote()']").addEventListener("click", addQuote);

newQuoteButton.addEventListener("click", showRandomQuote);
document.getElementById("exportQuotes").addEventListener("click", exportQuotes);

// Initialize App
window.addEventListener("load", () => {
    displayAllQuotes();
    populateCategories();
    filterQuotes();
});
