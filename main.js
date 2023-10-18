const rateEl = document.getElementById('rate');
const swapEl = document.getElementById('swap');
const currencyOneEl = document.getElementById('currency-one');
const currencyTwoEl = document.getElementById('currency-two');
const amountOneEl = document.getElementById('amount-one');
const amountTwoEl = document.getElementById('amount-two');

let currencyFromBack = {};

const getData = () => {
    const currencyOne = currencyOneEl.value;

    fetch(`https://v6.exchangerate-api.com/v6/41b4541f3df8b629ff6e1018/latest/${currencyOne}`)
        .then((res) => res.json())
        .then((data) => {
            const { conversion_rates } = data;
            currencyFromBack = { ...conversion_rates };
            console.log(currencyFromBack);
            calculateRates();
        });
};

const calculateRates = () => {
    const currencyTwo = currencyTwoEl.value;
    const rates = currencyFromBack[currencyTwo];
    amountTwoEl.value = (+amountOneEl.value * rates).toFixed(2);
};

getData();

amountOneEl.addEventListener('input', calculateRates);
currencyOneEl.addEventListener('change', calculateRates);
currencyOneEl.addEventListener('change', getData);

swapEl.addEventListener('click', () => {
    let a = currencyOneEl.value;
    currencyOneEl.value = currencyTwoEl.value;
    currencyTwoEl.value = a;

    getData()
    calculateRates()
})