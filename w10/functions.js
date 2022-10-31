/**[CREATION SECTION]
 * Functions that create/returns new variables, elements, or objects
 */

// Adds food objects into the meal array
const addFood = function (fType, fCost, fEmoji) {
    meal.push({
        type: fType, // food name
        cost: fCost, // food price
        emoji: fEmoji, // food emoji
    })
}

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



/**[RENDER SECTION]
 * Functions that render particular sections of the webpage
 */

// Renders/Refreshes stat data onto webpage
const renderStats = function () {
    // Creating new texts with updated stat data
    const statTitle = addText(`Stats: 📈`, `h3`)
    const stat1 = addText(`Meal Budget: <b><span style="color:green">$${stats.budget.toLocaleString('en-US', {minimumFractionDigits:2})}</span></b>`)
    const stat2 = addText(`Money Spent: <b><span style="color:firebrick">$${stats.expenses.toLocaleString('en-US', {minimumFractionDigits:2})}</span></b>`)
    const stat3 = addText(`Times Eaten Out: <b><span style="color:purple">${stats.timesEatenOut}</span></b>`)
    
    document.querySelector(`#stats`).innerHTML = `` // Clears out the old texts in #stats div
    document.querySelector(`#stats`).append(statTitle, stat1, stat2, stat3) // Adds in the new texts into #stats div

    document.querySelector('#show-options').checked = stats.showOptions
}

// Renders/Refresh meal options onto webpage
const renderMealOptions = function () {
    let noMealOptions = true // Keeps track of meal option availability
    const mealOptionTitle = addText(`<b>Foods available for <span style="color:green">$${stats.budget.toLocaleString('en-US', {minimumFractionDigits:2})}</span> or less:</b>`) // Updated meal option title

    // Resets meal option box
    document.querySelector(`#meal-title`).innerHTML = ``
    document.querySelector(`#meal-buttons`).innerHTML = ``

    document.querySelector(`#meal-title`).append(mealOptionTitle)

    // Creates a button for every affordable meal option
    meal.forEach(function (e) {
        const mealType = e.type
        const mealCost = e.cost
        const mealEmoji = e.emoji

        if (mealCost <= stats.budget){ // Render budget meal buttons
            const newMealButton = addButton(`${mealEmoji} <b><span style="color:firebrick">${mealType}</span></b> ($<i>${mealCost.toLocaleString('en-US', {minimumFractionDigits:2})}</i>)`, `#${mealType}`, `meals`)
            noMealOptions = false
            document.querySelector(`#meal-buttons`).append(newMealButton)
        } else {
            if (stats.showOptions) { // Render out-of-budget meal buttons if "Show Out-of-Budget Options" checkbox is checked
                const newMealButton = addButton(`${mealEmoji} <b><span style="color:firebrick">${mealType}</span></b> ($<i>${mealCost.toLocaleString('en-US', {minimumFractionDigits:2})}</i>)`, `#${mealType}`, `meals`)
                newMealButton.disabled = true // Disables the functionality of out-of-budget meal buttons
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
    document.querySelectorAll(`.meals`).forEach(function (button) {
        button.addEventListener(`click`, function () {
            const mealObj = meal.find(function (e) {
                return e.type === button.id.split(`#`)[1]
            })

            stats.budget -= mealObj.cost
            stats.expenses += mealObj.cost
            stats.timesEatenOut++

            purchaseHistory.push({
                foodType: mealObj.type,
                id: uuidv4(),
                time: moment().valueOf()
            })

            saveStats()
            savePurchaseHistory()
            renderStats()
            renderMealOptions()
            renderPurchaseHistory()
        })
    })
}

// Render purchase history onto webpage
const renderPurchaseHistory = function () {
    document.querySelector(`#purchase-history`).innerHTML = ``

    if (purchaseHistory.length !== 0) {
        document.querySelector(`#history-title`).innerHTML = `Your Purchase History:`
        
        for(let count = 0; count < purchaseHistory.length; count++) {
            const purchase = purchaseHistory[count]
            const mealObj = meal.find(function (e) {
                return e.type === purchase.foodType
            })

            const purchaseMsg = addText(`<span style="color:blue">[${count + 1}]</span> You purchased: ${mealObj.emoji} <span style="color:firebrick">${mealObj.type}</span> ($${mealObj.cost.toLocaleString('en-US', {minimumFractionDigits:2})}) <a href="details.html#${purchase.id}"><font size="-2">Details</font></a>`)
            document.querySelector(`#purchase-history`).prepend(purchaseMsg)
        }

        // purchaseHistory.forEach(function (e) {

        // })
    } else {
        document.querySelector(`#history-title`).innerHTML = ``
    }
}



/**[DATA SECTION]
 * Functions that load or save data
 */

// Loads meal types from local storage
const loadFood = function () {
    const foodJSON = localStorage.getItem(`foods`)

    if (foodJSON !== null) {
        return JSON.parse(foodJSON)
    } else {
        return []
    }
}

// Loads stats data from local storage
const loadStats = function () {
    const statsJSON = localStorage.getItem(`stats`)
    
    if (statsJSON !== null) {
        return JSON.parse(statsJSON)
    } else {
        return {
            budget: 0, // Meal budget
            expenses: 0, // How much money you've spent
            timesEatenOut: 0, // How many times you've eaten out
            showOptions: false // Keeps track of the "Show Out-of-Budget Options" checkbox
        }
    }
}

// Loads purchase history data from local storage
const loadPurchaseHistory = function () {
    const purchastHistoryJSON = localStorage.getItem(`purchase-history`)

    if (purchastHistoryJSON !== null) {
        return JSON.parse(purchastHistoryJSON)
    } else {
        return []
    }
}

// Saves meal types onto local storage
const saveFood = function () {
    localStorage.setItem(`foods`, JSON.stringify(meal))
}

// Saves stats date onto local storage
const saveStats = function () {
    localStorage.setItem(`stats`, JSON.stringify(stats))
}

// Saves purchase history data onto local storage
const savePurchaseHistory = function () {
    localStorage.setItem(`purchase-history`, JSON.stringify(purchaseHistory))
}



/**[MISCELLANEOUS SECTION]
 * Additional helpful functions
 */

// Returns how many decimal places there are in a decimal
const decimalPrecision = function (dec0) {
    const dec1 = dec0.toString()
    if (dec1.indexOf(`e-`) !== -1) {
        const dec2 = parseInt(dec1.split(`-`)[1])
        const dec3 = dec1.split(`-`)[0].split(`.`)[1].replaceAll(`e`, ``).length
        return dec2 + dec3
    } else if (dec1.indexOf(`.`) !== -1) {
        return dec1.replaceAll(`0`, `1`).split(`.`)[1].length
    } else {
        return 0
    }
}