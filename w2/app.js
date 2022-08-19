// Function to show text on webpage
const displayOnPage = function (text) {
    let newParagraph = document.createElement("p")
    newParagraph.innerHTML = text
    let outputDiv = document.getElementById("output")
    outputDiv.append(newParagraph)
}

// Program based on my dinner decision making
let hasLeftovers = false
let hasIngredients = false
let eatingAtRestaurant = true
let walletAmount = 3.14
let averageMealCost = 2.71

// Listing the values of the global variables on the webpage
displayOnPage('<b><=====Global Variables=====></b>')
displayOnPage('Has any leftover food: <i>' + hasLeftovers + '</i>')
displayOnPage('Has any cooking ingredients: <i>' + hasIngredients + '</i>')
displayOnPage('Eating out at a restauraunt: <i>' + eatingAtRestaurant + '</i>')
displayOnPage('Amount of money in wallet: <i>$' + walletAmount + '</i>')
displayOnPage('Cost of average meal: <i>$' + averageMealCost + '</i>')
displayOnPage('<=======================>')

// Checks if I'm eating at home or at a restaurant
displayOnPage('<br><b>Am I eating at home or out?</b>')

if (hasLeftovers || hasIngredients) {
    displayOnPage('I am eating at home.')
} else {
    displayOnPage('I am eating out.')
}

// Checks if I have any sort of food at home to eat, else I end up eating out
displayOnPage('<b>What am I having for dinner tonight?</b>')

if(hasLeftovers) {
    eatingAtRestaurant = false
    displayOnPage('Leftovers!')
} else if (hasIngredients) {
    eatingAtRestaurant = false
    displayOnPage('Home cooked meal!')
} else {
    eatingAtRestaurant = true
    displayOnPage('Restaurant meal!')
}

// How much money I have on me affects what kind of meal I'm getting
if (eatingAtRestaurant) {
    displayOnPage('<b>Do I have enough money for an average meal or a budget meal?</b>')
    let meal
    if (averageMealCost <= walletAmount) {
        meal = 'Enough for an average meal.'
    } else {
        meal = 'Only enough for a budget meal.'
    }
    displayOnPage(meal)
}