// Switch to Saved tab/page for saved recipes
function goToSavedPage() {
    window.location.href = 'savedpage.html';
}
// Go back to homepage to browse all recipes
function goToHomePage() {
    window.location.href = 'homepage.html';
}

// Function to change the state of the star-button 
function changeButton(button) {
    // Get the ID of the recipe card
    var recipeCardId = button.closest('.recipe-card-item').id;
    // Toggle the image source to show it is selected/unselected
    if (button.src.includes("star_light.png")) {
    // Toggle selected dark state
    button.src = "/images/star_dark.png";
    // Save the status to session storage
    sessionStorage.setItem(recipeCardId, button.src);
    } else {
    // Toggle unselected light state
    button.src = "/images/star_light.png";
    // Remove the status from session storage
    sessionStorage.removeItem(recipeCardId, button.src);
    }
  }

// Function to load the star button's saved status from session storage
function loadSavedStatus() {
    // Loop through all recipe cards on the page
    document.querySelectorAll('.recipe-card-item').forEach(function(card) {
        var recipeCardId = card.id;
        var button = card.querySelector('.star-button img');
        // Check if the recipe card ID exists in session storage
        if (sessionStorage.getItem(recipeCardId)) {
            // If recipe card ID exists, set button image source accordingly
            button.src = sessionStorage.getItem(recipeCardId);
        }
    });
}

// Function to call loadSavedStatus when the page is loaded
window.addEventListener('load', loadSavedStatus);

// Filters recipe card items and takes parameter 'filter'
function filterItems(filter) {
     // Select all elements with class 'item' and store them in the variable 'items'
    var items = document.querySelectorAll('.recipe-card-item');

    items.forEach(function(item) {
        // Check if the filter is 'filter-all'
        if (filter === 'filter-all') {
            // Display items if filter button is filter-all
            item.style.display = 'inline-block';
        // Check if the dataset filter attribute of the recipe-card item matches filter of button
        } else if (item.dataset.filter === filter) {
            // If filter matches, display item
            item.style.display = 'inline-block';
        // If filter doesn't match, hide the item
        } else {
            item.style.display = 'none';
        }
    });
}

function saveRecipe(recipeId) {
    // Get the recipe card container using the provided ID
    var recipeCardContainer = document.getElementById(recipeId);
    // Clone the recipe card
    var recipeCardClone = recipeCardContainer.cloneNode(true);
    // Get the saved recipes from session storage
    var savedRecipes = JSON.parse(sessionStorage.getItem('savedRecipes')) || [];

    // Add the cloned recipe card to the saved recipes
    savedRecipes.push(recipeCardClone.outerHTML);
    // Save the updated saved recipes to session storage
    sessionStorage.setItem('savedRecipes', JSON.stringify(savedRecipes));
}

function showRandomItem() {
    // Get all recipe card items
    var recipeCards = document.querySelectorAll('.recipe-card-item');       
    // Generate a random index of recipe card items
    var randomIndex = Math.floor(Math.random() * recipeCards.length);
    // Get a random recipe card
    var randomRecipeCard = recipeCards[randomIndex];
    // Extract link from the random recipe card
    var link = randomRecipeCard.querySelector('a').href;
    // Open link to recipe card
    window.location.href = link;
     // Store the link in session storage
    sessionStorage.setItem('randomRecipeLink', link);
}
