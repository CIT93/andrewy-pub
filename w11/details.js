'use strict'

const detailsId = location.hash.substring(1)
const meal = loadFood()
let stats = loadStats()
let purchaseHistory = loadPurchaseHistory()
const purchaseTime = document.querySelector(`#purchase-time`)
const foodSelect = document.querySelector(`#food-select`)
const purchaseCost = document.querySelector(`#purchase-cost`)
const error = document.querySelector(`#error`)
const remove = document.querySelector(`#purchase-remove`)
const detail = purchaseHistory.find((e) => e.id === detailsId)

if (!detail) {
    location.assign(`index.html`)
}

const purchaseIndex = purchaseHistory.findIndex((e) => e.id === detailsId)
let mealObj = meal.find((e) => e.type === detail.foodType)

const date = addText(`<b>DATE:</b> ${moment(detail.time).format(`MMMM D, YYYY`)}`)
const time = addText(`<b>TIME:</b> ${moment(detail.time).format(`h:mm:ss A zz`)}`)
const cost = addText(`<b>COST:</b> $${mealObj.cost.toLocaleString('en-US', {minimumFractionDigits:2})}`)

meal.forEach((e) => {
    const option = document.createElement(`option`)
    option.setAttribute(`value`, `${e.type}`)
    option.textContent = `${e.emoji} ${e.type} ($${e.cost.toLocaleString('en-US', {minimumFractionDigits:2})})`
    foodSelect.append(option)
})

foodSelect.value = `${mealObj.type}`
purchaseTime.append(date, time)
purchaseCost.append(cost)

foodSelect.addEventListener(`change`, (e) => {
    const newMealObj = meal.find((food) => food.type === e.target.value)

    const costDiff = parseFloat(mealObj.cost - newMealObj.cost)
    error.innerHTML = ``

    if((stats.budget + costDiff) > 0) {
        const costMsg = addText(`<b>COST:</b> $${newMealObj.cost.toLocaleString('en-US', {minimumFractionDigits:2})}`)
        detail.foodType = newMealObj.type
        stats.budget += costDiff
        stats.expenses -= costDiff
        mealObj = structuredClone(newMealObj)
        purchaseCost.innerHTML = ``
        purchaseCost.append(costMsg)
    
        saveStats()
        savePurchaseHistory()
    } else {
        const errorMsg = addText(`<span style="color:firebrick"><b>Not enough budget money for ${newMealObj.type.toLowerCase()}.</b></span>`)
        foodSelect.value = mealObj.type
        error.append(errorMsg)
    }
})

remove.addEventListener(`click`, () => {
    stats.budget += mealObj.cost
    stats.expenses -= mealObj.cost
    stats.timesEatenOut -= 1
    purchaseHistory.splice(purchaseIndex, 1)

    saveStats()
    savePurchaseHistory()
    location.assign(`index.html`)
})

window.addEventListener(`storage`, (e) => {
    if (e.key === `purchase-history`) {
        this.location.reload()
    }
})