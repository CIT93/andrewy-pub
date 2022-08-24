// Function to show text on webpage
const displayOnPage = function (text) {
    let newParagraph = document.createElement("p")
    newParagraph.innerHTML = text
    let outputDiv = document.getElementById("output")
    outputDiv.append(newParagraph)
}

// Program based on my dinner decision making
let eatingAtRestaurant

// Checks if I have any sort of food at home to eat, else I end up eating out
let decideDinner = function (hasLeftovers, hasIngredients) {
    displayOnPage('<b>What am I having for dinner tonight?</b>')

    if (hasLeftovers) {
        displayOnPage('Leftovers!')
    } else if (hasIngredients) {
        displayOnPage('Home cooked meal!')
    } else {
        displayOnPage('Restaurant meal!')
        eatingAtRestaurant = true
    }
}

// How much money I have on me affects what kind of meal I'm getting
let decideRestaurantMeal = function (walletAmount, averageMealCost) {
    if (averageMealCost <= walletAmount) {
        return 'Enough for an average meal.'
    } else {
        return 'Only enough for a budget meal.'
    }
}

// Running the above functions
decideDinner(false, false)
// This function only runs if I'm going to eat out
if (eatingAtRestaurant) {
    displayOnPage('<b>Do I have enough money for an average meal or a budget meal?</b>')
    let meal = decideRestaurantMeal(3.14, 2.71)
    displayOnPage(meal)
}