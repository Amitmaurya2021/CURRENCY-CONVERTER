document.addEventListener('DOMContentLoaded', () => {
    const apiUrl = `https://open.er-api.com/v6/latest/USD`;

    const amountInput = document.getElementById('amount');
    const fromCurrencySelect = document.getElementById('fromCurrency');
    const toCurrencySelect = document.getElementById('toCurrency');
    const convertButton = document.getElementById('convertButton');
    const resultDiv = document.getElementById('result');
    const fromFlag = document.getElementById('fromFlag');
    const toFlag = document.getElementById('toFlag');

    // Fetch the exchange rates and populate the currency select options
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const currencies = Object.keys(data.rates);
            currencies.forEach(currency => {
                const option1 = document.createElement('option');
                option1.value = currency;
                option1.textContent = currency;
                fromCurrencySelect.appendChild(option1);

                const option2 = document.createElement('option');
                option2.value = currency;
                option2.textContent = currency;
                toCurrencySelect.appendChild(option2);
            });
        })
        .catch(error => console.error('Error fetching exchange rates:', error));

    // Update flag images based on selected currency
    const updateFlag = (currency, flagElement) => {
        const countryCode = currencyToCountryCode[currency];
        if (countryCode) {
            flagElement.src = `https://flagsapi.com/${countryCode}/flat/64.png`;
        } else {
            flagElement.src = '';
        }
    };

    fromCurrencySelect.addEventListener('change', () => {
        updateFlag(fromCurrencySelect.value, fromFlag);
    });

    toCurrencySelect.addEventListener('change', () => {
        updateFlag(toCurrencySelect.value, toFlag);
    });

    // Convert the currency when the button is clicked
    convertButton.addEventListener('click', () => {
        const amount = parseFloat(amountInput.value);
        const fromCurrency = fromCurrencySelect.value;
        const toCurrency = toCurrencySelect.value;

        if (isNaN(amount) || fromCurrency === '' || toCurrency === '') {
            resultDiv.textContent = 'Please fill in all fields.';
            return;
        }

        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                const rate = data.rates[toCurrency] / data.rates[fromCurrency];
                const convertedAmount = (amount * rate).toFixed(2);
                resultDiv.textContent = `${amount} ${fromCurrency} = ${convertedAmount} ${toCurrency}`;
            })
            .catch(error => console.error('Error fetching exchange rates:', error));
    });
});
