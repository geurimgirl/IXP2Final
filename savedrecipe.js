// Switch to Saved tab/page for saved recipes
function goToSavedPage() {
    window.location.href = 'savedpage.html';
}
// Go back to homepage to browse all recipes
function goToHomePage() {
    window.location.href = 'homepage.html';
}

document.addEventListener('DOMContentLoaded', function() {
    // Get saved recipes from session storage
    var savedRecipes = JSON.parse(sessionStorage.getItem('savedRecipes')) || [];

    // Get the container where saved recipes will be displayed
    var savedRecipesContainer = document.getElementById('savedRecipes');

    // Loop through saved recipes and append them to the container
    savedRecipes.forEach(function(recipeHTML) {
        var recipeCard = document.createElement('div');
        recipeCard.innerHTML = recipeHTML;
        savedRecipesContainer.appendChild(recipeCard);
    });
});

// Function to change the button state
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
    sessionStorage.removeItem(recipeCardId);
    removeRecipe(button)
    }
  }

function removeRecipe(button) {
    // Get recipe card container
    var recipeCardContainer = button.closest('.recipe-card-item');
    // Remove recipe card container from the DOM
    recipeCardContainer.remove();
    // Get ID of the recipe card
    var recipeCardId = recipeCardContainer.id;
    // Get saved recipes from session storage
    var savedRecipes = JSON.parse(sessionStorage.getItem('savedRecipes')) || [];
    // Find and remove recipe card with matching ID from saved recipes in session storage
    savedRecipes = savedRecipes.filter(function(recipe) {
        return !recipe.includes(recipeCardId);
    });
    // Save the updated saved recipes to session storage
    sessionStorage.setItem('savedRecipes', JSON.stringify(savedRecipes));
}
