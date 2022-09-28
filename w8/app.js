// [MEAL EXPENSE MANAGER]
// A meal budgeting and expense management program

// Object properties that keeps tracks of data points
const stats = {
    budget: 0, // Meal budget
    timesEatenOut: 0, // How many times you've eaten out
    expenses: 0, // How much money you've spent
    showOptions: false
}

// Object array with list of meal types, costs, and emojis
const meal = [{
    type: `Pizza`,
    cost: 9.99,
    emoji: `🍕`
}]

// Makes it easy on myself to add additional food objects into the meal array
const addFood = function (fType, fCost, fEmoji) {
    meal.push({
        type: fType,
        cost: fCost,
        emoji: fEmoji
    })
}

addFood(`Taco`, 2.29, `🌮`)
addFood(`Sushi`, 30, `🍣`)
addFood(`Burger`, 7.39, `🍔`)
addFood(`Pho`, 16.25, `🍜`)
addFood(`Burrito`, 6.50, `🌯`)
addFood(`Hotdog`, 4.07, `🌭`)
addFood(`Steak`, 999.99, `🥩`) 

// Creates and returns a new text element, typically <p> by default
const addText = function (text, tag = `p`) {
    const newText = document.createElement(tag)
    newText.innerHTML = text
    return newText
}

// Creates and returns a new button element
const addButton = function (text, id, className) {
    const newButton = document.createElement(`button`)
    newButton.setAttribute(`id`, id)
    newButton.setAttribute(`class`, className)
    newButton.innerHTML = text
    return newButton
}


// Renders/Refreshes stat data onto webpage
const renderStats = function () {
    // Creating new texts with updated stat data
    const statTitle = addText(`Stats: 📈`, `h3`)
    const stat1 = addText(`Meal Budget: <b><span style="color:green">$${stats.budget.toFixed(2)}</span></b>`)
    const stat2 = addText(`Money Spent: <b><span style="color:firebrick">$${stats.expenses.toFixed(2)}</span></b>`)
    const stat3 = addText(`Times Eaten Out: <b><span style="color:purple">${stats.timesEatenOut}</span></b>`)
    
    document.querySelector(`#stats`).innerHTML = `` // Clears out the old texts in #stats div
    document.querySelector(`#stats`).append(statTitle, stat1, stat2, stat3) // Adds in the new texts into #stats div
}

// Renders/Refresh meal options onto webpage
const renderMealOptions = function () {
    let noMealOptions = true // Keeps track of meal option availability
    const mealOptionTitle = addText(`<b>Foods available for <span style="color:green">$${stats.budget.toFixed(2)}</span> or less:</b>`) // Updated meal option title

    // Resets meal option box
    document.querySelector(`#meal-title`).innerHTML = ``
    document.querySelector(`#meal-buttons`).innerHTML = ``

    document.querySelector(`#meal-title`).append(mealOptionTitle)

    // Creates a button for every affordable meal option
    meal.forEach(function (e) {
        const mealType = e.type
        const mealCost = e.cost
        const mealEmoji = e.emoji

        if (!stats.showOptions) { // Only renders budget meal buttons
            if (mealCost <= stats.budget){
                const newMealButton = addButton(`${mealEmoji} <b><span style="color:firebrick">${mealType}</span></b> ($<i>${mealCost.toFixed(2)}</i>)`, `index${meal.indexOf(e)}`, `meals`)
                noMealOptions = false
                document.querySelector(`#meal-buttons`).append(newMealButton)
            }
        } else { // Renders budget and out-of-budget meal buttons
            if (mealCost <= stats.budget){
                const newMealButton = addButton(`${mealEmoji} <b><span style="color:firebrick">${mealType}</span></b> ($<i>${mealCost.toFixed(2)}</i>)`, `index${meal.indexOf(e)}`, `meals`)
                noMealOptions = false
                document.querySelector(`#meal-buttons`).append(newMealButton)
            } else {
                const newMealButton = addButton(`${mealEmoji} <b><span style="color:firebrick">${mealType}</span></b> ($<i>${mealCost.toFixed(2)}</i>)`, `index${meal.indexOf(e)}`, `meals`)
                newMealButton.disabled = true // disables the functionality of out-of-budget meal buttons
                document.querySelector(`#meal-buttons`).append(newMealButton)
            }
        }
    })

    // Outputs text to let the user know they're broke
    if (noMealOptions) {
        const newMealButton = addText(`<span style="color:firebrick">You don't have enough money for anything.</span>`, `h4`)
        document.querySelector(`#meal-buttons`).append(newMealButton)
    }

    // Gives meal buttons their functionality
    // Updates stats and purchase history
    document.querySelectorAll(`.meals`).forEach(function (button) {
        button.addEventListener(`click`, function () {
            const mealObj = meal[button.id.replace(`index`, ``)]

            stats.budget -= mealObj.cost
            stats.expenses += mealObj.cost
            stats.timesEatenOut++

            const purchasedMeal = addText(`[${stats.timesEatenOut}] You purchased: ${mealObj.emoji} <span style="color:firebrick">${mealObj.type}</span> ($${mealObj.cost.toFixed(2)})`)

            document.querySelector(`#history-title`).innerHTML = `Your Purchase History:`
            document.querySelector(`#purchase-history`).prepend(purchasedMeal)
            renderStats()
            renderMealOptions()
        })
    })
}

// Sets up webpage
const setupWebpage = function () {
    // Takes in the input and restarts the entire webpage with updated stats
    document.querySelector(`#budget-form`).addEventListener(`submit`, function (e) {
        stats.budget = parseFloat(e.target.elements.budgetAmount.value)
        stats.expenses = 0
        stats.timesEatenOut = 0
        e.target.elements.budgetAmount.value = ``
        document.querySelector(`#history-title`).innerHTML = ``
        document.querySelector(`#purchase-history`).innerHTML = ``
        e.preventDefault()
        renderStats()
        renderMealOptions()
    })

    // Shows out-of-budget meal button options when checked
    document.querySelector('#show-options').addEventListener('change', function (e) {
        stats.showOptions = e.target.checked
        renderMealOptions()
    })

    // Initial webpage rendering
    renderStats()
    renderMealOptions()
}

// Run function
setupWebpage()
// [END OF CODE]