// Program based on meal choices
// Keeps track of the meals I can afford

// Has properties that keeps track of my decisions
const stats = {
    wallet: 35.00, // Amount of money in my wallet
    timesEatenOut: 0, // How many times I've eaten out
    expenses: 0 // How much money I've spent
}

// List of meals and how much they cost
const meal = [{
    type: 'Pizza',
    cost: 9.99,
    emoji: '&#127829'
}, {
    type: 'Taco',
    cost: 2.29,
    emoji: '&#127790'
}, {
    type: 'Sushi',
    cost: 30,
    emoji: '&#127843'
}, {
    type: 'Burger',
    cost: 7.39,
    emoji: '&#127828'
}, {
    type: 'Pho',
    cost: 16.25,
    emoji: '&#127836'
}]

// Adds text to the webpage
const addText = function (text, id, tag = `p`, appendParent = `output`) {
    const newText = document.createElement(tag)
    newText.setAttribute(`id`, id)
    newText.innerHTML = text
    document.getElementById(appendParent).append(newText)
}

// Adds textbox input to the webpage
const addTextbox = function (text, id) {
    const newTextbox = document.createElement(`input`)
    newTextbox.setAttribute(`id`, id)
    newTextbox.setAttribute(`type`, `text`)
    newTextbox.setAttribute(`value`, text)
    document.getElementById(`output`).append(newTextbox)
}

// Adds button to the webpage
const addButton = function (text, id, appendParent = `output`, clas) {
    const newButton = document.createElement(`button`)
    newButton.setAttribute(`id`, id)
    if (clas !== undefined) {
        newButton.setAttribute(`class`, clas)
    }
    newButton.innerHTML = text
    document.getElementById(appendParent).append(newButton)
}

// Adds a division to the webpage
const addDiv = function (id) {
    const newDiv = document.createElement(`div`)
    newDiv.setAttribute(`id`, id)
    document.getElementById(`output`).append(newDiv)
}

// Output a list of meals that my wallet can afford
const updateMealOptions = function () {
    let mealOptions = [] // Resets the listed options if function is called again
    let optionCount = 1 // Number label for listed meals

    document.getElementById(`title3`).innerHTML = `<br><b>Foods available for <span style="color:green">$${stats.wallet}</span> or less:</b>`
    document.getElementById(`meal-options`).textContent = ``
    
    meal.forEach(function (e) {
        const mealType = e.type
        const mealCost = e.cost
        const mealEmoji = e.emoji

        if (mealCost <= stats.wallet){
            addButton(`${mealEmoji} <span style="color:firebrick">${mealType}</span> ($<i>${mealCost.toFixed(2)}</i>)`, `index${meal.indexOf(e)}`, `meal-options`, `meals`)
            addText(`<br>`, `break`, `p`, `meal-options`)
            mealOptions.push(mealType)
            optionCount++
        }
    })

    if (optionCount === 1) {
        addButton(`Nothing &#128128`, `mealNA`, `meal-options`)
    }
}

// Keeps track of the textbox input and updates stats.wallet and meal options
const updateDOM = function () {
    document.getElementById(`submit-button`).addEventListener('click', function () {
        const amount = parseFloat(document.getElementById(`textbox-input`).value.replace(`$`, ``)).toFixed(2)
        stats.wallet = amount
        document.getElementById(`wallet-amount`).innerHTML = `Meal Budget: $${amount}`
        document.getElementById(`question3`).innerHTML = ``
        console.log(`Money Input: $${amount}`)
        updateMealOptions()
        updateMealButtons()
    })

    updateMealButtons()
}

// Gives function to food option buttons
const updateMealButtons = function () {
    document.querySelectorAll(`.meals`).forEach(function (button) {
        button.addEventListener(`click`, function () {
            const mealObj = meal[button.id.replace(`index`, ``)]
            stats.timesEatenOut++
            stats.expenses += mealObj.cost
            document.getElementById(`money-spent`).innerHTML = `Money Spent: $${stats.expenses.toFixed(2)}`
            document.getElementById(`times-eaten-out`).innerHTML = `Times eaten out: ${stats.timesEatenOut}`
            document.getElementById(`meal-options`).innerHTML = button.outerHTML
            document.getElementById(`question3`).innerHTML = `You purchased: <span style="color:firebrick">${mealObj.type}</span> ${mealObj.emoji}`
        })
    })
}

// Sets up webpage with a textbox, button, and texts
const setupWebpage = function () {
    addText(`[Meal Expense Tracker]`, `title0`, `h1`)
    addText(`Stats: &#128200`, `title1`, `h3`)
    addText(`Meal Budget: $${stats.wallet.toFixed(2)}`, `wallet-amount`)
    addText(`Money Spent: $0`, `money-spent`)
    addText(`Times eaten out: 0`, `times-eaten-out`)
    addText(`<br>Enter Meal Budget:`, `title2`, `h3`)
    addTextbox(`$35.00`, `textbox-input`)
    addButton(`Submit`, `submit-button`)
    addText(`Foods available for <span style="color:green">$${stats.wallet.toFixed(2)}</span> or less:`, `title3`, `h3`)
    addDiv(`meal-options`)
    addText(``, `question3`, `h3`)
    updateMealOptions()
}

// Running Functions
setupWebpage()
updateDOM()
// [END OF CODE]