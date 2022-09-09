// Shows text on webpage
const displayOnPage = function (text) {
    let newParagraph = document.createElement("p")
    newParagraph.innerHTML = text
    let outputDiv = document.getElementById("output")
    outputDiv.append(newParagraph)
}

// Program based on my dinner decision making

// Keeps track of the meals I can afford
let mealOptions = []

// Object with properties that keeps track of my decisions
const decisions = {
    eatingAtRestaurant: false, // State of whether or not I'm eating out
    timesEatenOut: 0, // How many times I've eaten out
    expenses: 0, // How much money I've spent
}

// List of meals and how much they cost
const meal = [{
    type: 'Pizza',
    cost: 9.99
}, {
    type: 'Taco',
    cost: 2.29
}, {
    type: 'Sushi',
    cost: 30
}, {
    type: 'Burger',
    cost: 7.39
}, {
    type: 'Pho',
    cost: 16.25
}]

// Checks if I have any sort of food at home to eat, else I end up eating out
const decideDinnerType = function (hasLeftovers, hasIngredients) {
    displayOnPage(`<b>What type of dinner am I having for tonight?</b>`)

    if (hasLeftovers) {
        displayOnPage(`Leftovers!`)
    } else if (hasIngredients) {
        displayOnPage(`Home cooked meal!`)
    } else {
        displayOnPage(`Restaurant meal!`)
        decisions.eatingAtRestaurant = true
    }
}

// Output a list of meals that my wallet can afford
const restaurantMealOptions = function (walletAmount) {
    if (decisions.eatingAtRestaurant) {
        mealOptions = [] // Resets the listed options if function is called again
        let optionCount = 1 // Number label for listed meals
        let enoughMoney = false // Always false if there's no affordable meals
        displayOnPage(`<b>What foods can I get for $${walletAmount.toFixed(2)} or less?</b>`)
        
        for (let count = 0; count < meal.length; count++) {
            const mealType = meal[count].type
            const mealCost = meal[count].cost

            if (mealCost <= walletAmount){
                displayOnPage(`${optionCount}. ${mealType}`)
                mealOptions.push(mealType)
                optionCount++
                enoughMoney = true
            }
        }

        if (!enoughMoney) {
            displayOnPage(`None! Not enough money. :(`)
        }
    }
}

// Input the meal I selected from listed meal options
const decideRestaurantMeal = function (selectedMeal) {
    if (decisions.eatingAtRestaurant) {
        displayOnPage(`<b>What food have I decided to get?</b>`)

        if (!(mealOptions.indexOf(selectedMeal) === -1)) {
            const mealIndex = meal.map(object => object.type).indexOf(selectedMeal) // Finds the index of selected meal
            
            displayOnPage(selectedMeal)
            decisions.timesEatenOut += 1
            decisions.expenses += meal[mealIndex].cost
        } else {
            displayOnPage(`That wasn't an option.`)
        }
    }
}

// Displays tracked data
const decisionsStats = function () {
    displayOnPage(`<br><b>Stats:</b>`)
    displayOnPage(`Times eaten out: ${decisions.timesEatenOut}`)
    displayOnPage(`Meal expenses: $${decisions.expenses.toFixed(2)}`)
}

// Running functions
decideDinnerType(false, false)
restaurantMealOptions(16.24)
decideRestaurantMeal(`Burger`)
decisionsStats()
// [END OF CODE]



// CODE FROM WEEK 4 LEARN TOGETHER
//
// // Program based on my dinner decision making

// const decision = {

//     eatingAtRestaurant: false, // State of whether or not I'm eating out
//     timesEatenOut: 0, // How many times I've eaten out
//     expenses: 0, // How much money I've spent

//     // Checks if I have any sort of food at home to eat, else I end up eating out
//     dinner: function (hasLeftovers, hasIngredients) {
//         displayOnPage(`<b>What am I having for dinner tonight?</b>`)

//         if (hasLeftovers) {
//             displayOnPage(`Leftovers!`)
//         } else if (hasIngredients) {
//             displayOnPage(`Home cooked meal!`)
//         } else {
//             displayOnPage(`Restaurant meal!`)
//             this.eatingAtRestaurant = true
//         }
//     },

//     // How much money I have on me affects what kind of meal I'm getting
//     restaurantMeal: function (walletAmount, averageMealCost) {
//         displayOnPage(`<b>Do I have enough money for an average meal or a budget meal?</b>`)
        
//         if (this.eatingAtRestaurant) {
//             this.timesEatenOut = this.timesEatenOut + 1
    
//             if (averageMealCost <= walletAmount) {
//                 this.expenses = this.expenses + averageMealCost
//                 displayOnPage(`Enough for an average meal.`)
//             } else {
//                 this.expenses = this.expenses + walletAmount
//                 displayOnPage(`Only enough for a budget meal.`)
//             }
//         } else {
//             displayOnPage(`N/A`)
//         }
//     },



//     // Displays tracked data
//     stats: function () {
//         displayOnPage(`<br><b>Stats:</b>`)
//         displayOnPage(`Times eaten out: ${decision.timesEatenOut}`)
//         displayOnPage(`Meal expenses: $${decision.expenses}`)
//     }
// }

// // Running object methods
// decision.dinner(false, false)
// decision.restaurantMeal(3.14, 2.71)
// decision.stats()