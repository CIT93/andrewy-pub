const detailsId = location.hash.substring(1)
const meal = loadFood()
let stats = loadStats()
let purchaseHistory = loadPurchaseHistory()
const purchaseTime = document.querySelector(`#purchase-time`)
const foodSelect = document.querySelector(`#food-select`)
const purchaseCost = document.querySelector(`#purchase-cost`)
const error = document.querySelector(`#error`)

const detail = purchaseHistory.find(function (e) {
    return e.id === detailsId
})

if (detail === undefined) {
    location.assign(`index.html`)
}

let mealObj = meal.find(function (e) {
    return e.type === detail.foodType
})

const date = addText(`DATE: ${moment(detail.time).format(`MMMM D, YYYY`)}`)
const time = addText(`TIME: ${moment(detail.time).format(`h:mm:ss A zz`)}`)
const cost = addText(`COST: $${mealObj.cost.toLocaleString('en-US', {minimumFractionDigits:2})}`)

meal.forEach(function (e) {
    const option = document.createElement(`option`)
    option.setAttribute(`value`, `${e.type}`)
    option.textContent = `${e.emoji} ${e.type} ($${e.cost.toLocaleString('en-US', {minimumFractionDigits:2})})`
    foodSelect.append(option)
})

foodSelect.value = `${mealObj.type}`
purchaseTime.append(date, time)
purchaseCost.append(cost)

foodSelect.addEventListener(`change`, function (e) {
    const newMealObj = meal.find(function (food) {
        return food.type === e.target.value
    })

    const costDiff = parseFloat(mealObj.cost - newMealObj.cost)
    error.innerHTML = ``

    if((stats.budget + costDiff) > 0) {
        const costMsg = addText(`COST: $${newMealObj.cost.toLocaleString('en-US', {minimumFractionDigits:2})}`)
        detail.foodType = newMealObj.type
        stats.budget += costDiff
        stats.expenses -= costDiff
        mealObj = structuredClone(newMealObj)
        purchaseCost.innerHTML = ``
        purchaseCost.append(costMsg)
    
        saveStats()
        savePurchaseHistory()
    } else {
        const errorMsg = addText(`<span style="color:firebrick">Not enough budget money for ${newMealObj.type.toLowerCase()}.</span>`)
        foodSelect.value = mealObj.type
        error.append(errorMsg)
    }
})

window.addEventListener(`storage`, function (e) {
    if (e.key === `purchase-history`) {
        this.location.reload()
    }
})