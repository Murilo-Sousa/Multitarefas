document.addEventListener('DOMContentLoaded', () => {
    const amountInput = document.getElementById('amount');
    const fromCurrencySelect = document.getElementById('from-currency');
    const toCurrencySelect = document.getElementById('to-currency');
    const resultInput = document.getElementById('result');
    const swapBtn = document.getElementById('swap');
    const rateInfo = document.getElementById('rate-info');
    const lastUpdate = document.getElementById('last-update');
    
    let exchangeRates = {};
    let lastUpdated = null;

    // Carregar taxas de câmbio
    async function fetchExchangeRates() {
        try {
            // API gratuita para taxas de câmbio (necessário criar conta para API key)
            const response = await fetch(`https://api.exchangerate-api.com/v4/latest/${fromCurrencySelect.value}`);
            const data = await response.json();
            
            if (data.rates) {
                exchangeRates = data.rates;
                lastUpdated = new Date(data.time_last_updated * 1000);
                updateLastUpdate();
                convert();
            } else {
                exchangeRates = {
                    BRL: 1,
                    USD: 0.19,
                    EUR: 0.17,
                    GBP: 0.15, 
                    JPY: 25     
                };
                lastUpdated = new Date();
                updateLastUpdate();
                convert();
                console.error('Erro na API, usando valores fictícios');
            }
        } catch (error) {
            console.error('Erro ao buscar taxas de câmbio:', error);
            // Fallback
            exchangeRates = {
                BRL: 1,
                USD: 0.2,
                EUR: 0.18,
                GBP: 0.16,
                JPY: 30
            };
            lastUpdated = new Date();
            updateLastUpdate();
            convert();
        }
    }

    // Converter moedas
    function convert() {
        const amount = parseFloat(amountInput.value) || 0;
        const fromCurrency = fromCurrencySelect.value;
        const toCurrency = toCurrencySelect.value;
        
        // Verifica se temos as taxas de câmbio necessárias
        if (!exchangeRates[fromCurrency] || !exchangeRates[toCurrency]) {
            console.error('Taxas de câmbio não disponíveis');
            return;
        }
        
        // Calcula a taxa de câmbio direta entre as moedas
        const rate = exchangeRates[toCurrency] / exchangeRates[fromCurrency];
        const result = amount * rate;
        
        resultInput.value = result.toFixed(4);
        
        // Mostrar taxa de câmbio
        rateInfo.textContent = `1 ${fromCurrency} = ${rate.toFixed(6)} ${toCurrency}`;
    }

    // Atualizar data da última atualização
    function updateLastUpdate() {
        if (lastUpdated) {
            lastUpdate.textContent = `Última atualização: ${lastUpdated.toLocaleString('pt-BR')}`;
        }
    }

    // Trocar moedas
    function swapCurrencies() {
        const temp = fromCurrencySelect.value;
        fromCurrencySelect.value = toCurrencySelect.value;
        toCurrencySelect.value = temp;
        convert();
    }

    // Event listeners
    amountInput.addEventListener('input', convert);
    fromCurrencySelect.addEventListener('change', convert);
    toCurrencySelect.addEventListener('change', convert);
    swapBtn.addEventListener('click', swapCurrencies);

    // Inicializar
    fetchExchangeRates();
});