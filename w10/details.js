const detailsId = location.hash.substring(1)

const meal = loadFood()
const purchaseHistory = loadPurchaseHistory()

const detail = purchaseHistory.find(function (e) {
    return e.id === detailsId
})

const mealObj = meal.find(function (e) {
    return e.type === detail.foodType
})

const date = addText(`DATE: ${moment(detail.time).format(`MMMM D, YYYY`)}`)
const time = addText(`TIME: ${moment(detail.time).format(`h:mm:ss A zz`)}`)
const food = addText(`MEAL: ${mealObj.type} ${mealObj.emoji}`)
const cost = addText(`COST: $${mealObj.cost.toLocaleString('en-US', {minimumFractionDigits:2})}`)

document.querySelector(`#purchase-details`).append(date, time, food, cost)