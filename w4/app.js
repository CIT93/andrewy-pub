// Function to show text on webpage
const displayOnPage = function (text) {
    let newParagraph = document.createElement("p")
    newParagraph.innerHTML = text
    let outputDiv = document.getElementById("output")
    outputDiv.append(newParagraph)
}

// Program based on my dinner decision making

const decision = {

    eatingAtRestaurant: false, // State of whether or not I'm eating out
    timesEatenOut: 0, // How many times I've eaten out
    expenses: 0, // How much money I've spent

    // Checks if I have any sort of food at home to eat, else I end up eating out
    dinner: function (hasLeftovers, hasIngredients) {
        displayOnPage(`<b>What am I having for dinner tonight?</b>`)

        if (hasLeftovers) {
            displayOnPage(`Leftovers!`)
        } else if (hasIngredients) {
            displayOnPage(`Home cooked meal!`)
        } else {
            displayOnPage(`Restaurant meal!`)
            this.eatingAtRestaurant = true
        }
    },

    // How much money I have on me affects what kind of meal I'm getting
    restaurantMeal: function (walletAmount, averageMealCost) {
        displayOnPage(`<b>Do I have enough money for an average meal or a budget meal?</b>`)
        
        if (this.eatingAtRestaurant) {
            this.timesEatenOut = this.timesEatenOut + 1
    
            if (averageMealCost <= walletAmount) {
                this.expenses = this.expenses + averageMealCost
                displayOnPage(`Enough for an average meal.`)
            } else {
                this.expenses = this.expenses + walletAmount
                displayOnPage(`Only enough for a budget meal.`)
            }
        } else {
            displayOnPage(`N/A`)
        }
    },



    // Displays tracked data
    stats: function () {
        displayOnPage(`<br><b>Stats:</b>`)
        displayOnPage(`Times eaten out: ${decision.timesEatenOut}`)
        displayOnPage(`Meal expenses: $${decision.expenses}`)
    }
}

// Running object methods
decision.dinner(false, false)
decision.restaurantMeal(3.14, 2.71)
decision.stats()



// CODE FROM WEEK 3 LEARN TOGETHER
// 
// // Program based on my dinner decision making
// let eatingAtRestaurant

// // Checks if I have any sort of food at home to eat, else I end up eating out
// let decideDinner = function (hasLeftovers, hasIngredients) {
//     displayOnPage('<b>What am I having for dinner tonight?</b>')

//     if (hasLeftovers) {
//         displayOnPage('Leftovers!')
//     } else if (hasIngredients) {
//         displayOnPage('Home cooked meal!')
//     } else {
//         displayOnPage('Restaurant meal!')
//         eatingAtRestaurant = true
//     }
// }

// // How much money I have on me affects what kind of meal I'm getting
// let decideRestaurantMeal = function (walletAmount, averageMealCost) {
//     if (averageMealCost <= walletAmount) {
//         return 'Enough for an average meal.'
//     } else {
//         return 'Only enough for a budget meal.'
//     }
// }

// // Running the above functions
// decideDinner(false, false)
// // This function only runs if I'm going to eat out
// if (eatingAtRestaurant) {
//     displayOnPage('<b>Do I have enough money for an average meal or a budget meal?</b>')
//     let meal = decideRestaurantMeal(3.14, 2.71)
//     displayOnPage(meal)
// }



// CODE FROM WEEK 2 LEARN TOGETHER
//
// // Program based on my dinner decision making
// let hasLeftovers = false
// let hasIngredients = false
// let eatingAtRestaurant = true
// let walletAmount = 3.14
// let averageMealCost = 2.71

// // Listing the values of the global variables on the webpage
// displayOnPage('<b><=====Global Variables=====></b>')
// displayOnPage('Has any leftover food: <i>' + hasLeftovers + '</i>')
// displayOnPage('Has any cooking ingredients: <i>' + hasIngredients + '</i>')
// displayOnPage('Eating out at a restauraunt: <i>' + eatingAtRestaurant + '</i>')
// displayOnPage('Amount of money in wallet: <i>$' + walletAmount + '</i>')
// displayOnPage('Cost of average meal: <i>$' + averageMealCost + '</i>')
// displayOnPage('<=======================>')

// // Checks if I'm eating at home or at a restaurant
// displayOnPage('<br><b>Am I eating at home or out?</b>')

// if (hasLeftovers || hasIngredients) {
//     displayOnPage('I am eating at home.')
// } else {
//     displayOnPage('I am eating out.')
// }

// // Checks if I have any sort of food at home to eat, else I end up eating out
// displayOnPage('<b>What am I having for dinner tonight?</b>')

// if(hasLeftovers) {
//     eatingAtRestaurant = false
//     displayOnPage('Leftovers!')
// } else if (hasIngredients) {
//     eatingAtRestaurant = false
//     displayOnPage('Home cooked meal!')
// } else {
//     eatingAtRestaurant = true
//     displayOnPage('Restaurant meal!')
// }

// // How much money I have on me affects what kind of meal I'm getting
// if (eatingAtRestaurant) {
//     displayOnPage('<b>Do I have enough money for an average meal or a budget meal?</b>')
//     let meal
//     if (averageMealCost <= walletAmount) {
//         meal = 'Enough for an average meal.'
//     } else {
//         meal = 'Only enough for a budget meal.'
//     }
//     displayOnPage(meal)
// }