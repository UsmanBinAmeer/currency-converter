const dropList = document.querySelectorAll(".drop_list select")
fromCurrency = document.querySelector(".from select")
toCurrency = document.querySelector(".to select")
getButton = document.querySelector("form button")

for (let i = 0; i < dropList.length; i++) {
    for (currency_code in country_code) {
        let selected;
        if (i == 0) {
            selected = currency_code == "USD" ? "selected" : ""
        } else if (i == 1) {
            selected = currency_code == "NPR" ? "selected" : ""
        }
        let optionTag = `<option value="${currency_code}" ${selected}>${currency_code}</option> `
        dropList[i].insertAdjacentHTML("beforeend", optionTag)
    }
    dropList[i].addEventListener("change", e => {
        loadFlag(e.target)
    })
}
function loadFlag(element) {
    for (code in country_code) {
        if (code == element.value) {
            let imgTag = element.parentElement.querySelector("img")
            imgTag.src = `https://flagsapi.com/${country_code[code]}/flat/64.png`
        }
    }
}
window.addEventListener("load", () => {
    getExchangeRate()
})
getButton.addEventListener("click", e => {
    e.preventDefault()
    // loadFlag(fromCurrency)
    // loadFlag(toCurrency)
    getExchangeRate()
})
const exchangeIcon = document.querySelector(".drop_list .icon")
exchangeIcon.addEventListener("click", () => {
    let tempCode = fromCurrency.value
    fromCurrency.value = toCurrency.value
    toCurrency.value = tempCode
    getExchangeRate()
})

function getExchangeRate() {
    rateText = document.querySelector(".exchange_rate")
    const amount = document.querySelector(".amount input")
    let amountval = amount.value;
    if (amountval == "" || amountval == "0") {
        amount.value = "1"
        amountval = 1
    }
    rateText.innerHTML = "Getting exchange rate..."
    let url = `https://v6.exchangerate-api.com/v6/b919cd1ce886194c4decbf41/latest/${fromCurrency.value}`;
    fetch(url).then(respone => respone.json()).then(result => {
        let exchangerate = result.conversion_rates[toCurrency.value]
        let totalExchangeRate = (amountval * exchangerate).toFixed(2)
        rateText.innerHTML = `${amountval} ${fromCurrency.value} = ${totalExchangeRate} ${toCurrency.value}`


    })

}