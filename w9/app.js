/**[MEAL EXPENSE MANAGER]
 * Description:
 * A meal budgeting and expense management program
 */

// Keeps track of data points
const stats = loadStats()

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


// Sets up webpage
const setupWebpage = function () {
    // Takes in the input and restarts the entire webpage with updated stats
    document.querySelector(`#budget-form`).addEventListener(`submit`, function (e) {
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
    })

    // Shows out-of-budget meal button options when checked
    document.querySelector('#show-options').addEventListener('change', function (e) {
        stats.showOptions = e.target.checked
        saveStats()
        renderMealOptions()
    })

    // Initial webpage rendering
    renderStats()
    renderMealOptions()
    renderPurchaseHistory()
}

// Run function
setupWebpage()
// [END OF CODE]