'use strict'

/**[MEAL EXPENSE MANAGER]
 * Description:
 * A meal budgeting and expense management program
 */

// Keeps track of data points
let stats = loadStats()

// Keeps track of purchases
let purchaseHistory = loadPurchaseHistory()

// List of meal options and their prices
const meal = []

// Filling the meal array with various foods and their prices
addFood(`Pizza`, 9.99, `🍕`)
addFood(`Taco`, 2.29, `🌮`)
addFood(`Sushi`, 30, `🍣`)
addFood(`Burger`, 7.39, `🍔`)
addFood(`Pho`, 16.25, `🍜`)
addFood(`Burrito`, 6.50, `🌯`)
addFood(`Hotdog`, 4.07, `🌭`)
addFood(`Steak`, 999.99, `🥩`)
addFood(`porridge`, 23, `🥣`)
saveFood()


// Sets up webpage
const setupWebpage = () => {
    // Takes in the input and restarts the entire webpage with updated stats
    document.querySelector(`#budget-form`).addEventListener(`submit`, (e) => {
        const budgetValue = e.target.elements.budgetAmount.value

        const error = (errorMessage) => {
            document.querySelector(`#input-error`).textContent = errorMessage
            e.target.elements.budgetAmount.value = ``
            e.preventDefault()
        }

        if (!budgetValue) { // checks if input box is empty
            error(`Please enter a budget.`)
        } else if (isNaN(budgetValue)) { // checks if input is a number or not
            error(`Please enter a number.`)
        } else if (budgetValue <= 0) { // checks if input is a number greater than 0
            error(`Please enter a number greater than 0.`)
        } else if (decimalPrecision(budgetValue) > 2) { // checks if input's decimal places are within a hundredths of a decimal
            error(`Please enter a number within a hundredths of a decimal (0.01).`)
        } else {
            stats.budget = parseFloat(e.target.elements.budgetAmount.value)
            stats.expenses = 0
            stats.timesEatenOut = 0
            purchaseHistory = []
            e.target.elements.budgetAmount.value = ``
    
            saveStats()
            savePurchaseHistory()
            renderStats()
            renderMealOptions()
            renderPurchaseHistory()
            e.preventDefault()
        }
    })

    // Shows out-of-budget meal button options when checked
    document.querySelector('#show-options').addEventListener('change', (e) => {
        stats.showOptions = e.target.checked
        saveStats()
        renderMealOptions()
    })

    // Updates duplicate webpage instances
    window.addEventListener(`storage`, (e) => {
        if (e.key === `stats`) {
            stats = JSON.parse(e.newValue)
            renderMealOptions()
            renderStats()
        }

        if (e.key === `purchase-history`) {
            purchaseHistory = JSON.parse(e.newValue)
            renderPurchaseHistory()
        }
    })

    // Initial webpage rendering
    renderStats()
    renderMealOptions()
    renderPurchaseHistory()
}

// Run function
setupWebpage()
// [END OF CODE]