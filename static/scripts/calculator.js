document.addEventListener('DOMContentLoaded', () => {
    const display = document.getElementById('display');
    const buttons = document.querySelectorAll('.btn');
    
    let currentInput = '0';
    let previousInput = '';
    let operation = null;
    let resetInput = false;

    function updateDisplay() {
        display.textContent = currentInput;
    }

    function addNumber(number) {
        if (currentInput === '0' || resetInput) {
            currentInput = number;
            resetInput = false;
        } else {
            currentInput += number;
        }
        updateDisplay();
    }

    function addDecimal() {
        if (resetInput) {
            currentInput = '0.';
            resetInput = false;
            updateDisplay();
            return;
        }
        
        if (!currentInput.includes('.')) {
            currentInput += '.';
            updateDisplay();
        }
    }

    function clearAll() {
        currentInput = '0';
        previousInput = '';
        operation = null;
        resetInput = false;
        updateDisplay();
    }

    function toggleSign() {
        currentInput = (parseFloat(currentInput) * -1).toString();
        updateDisplay();
    }

    function calculatePercentage() {
        currentInput = (parseFloat(currentInput) / 100).toString();
        updateDisplay();
    }

    function setOperation(op) {
        if (currentInput === '0' && previousInput === '') return;
        
        if (operation !== null && !resetInput) {
            calculate();
        }
        
        previousInput = currentInput;
        operation = op;
        resetInput = true;
    }

    function calculate() {
    if (operation === null || resetInput) return;
    
    const prev = parseFloat(previousInput);
    const current = parseFloat(currentInput);
    
    if (isNaN(prev)) return;  // Correção aqui - parêntese faltando
    
    let result;
    switch (operation) {
        case '+':
            result = prev + current;
            break;
        case '-':
            result = prev - current;
            break;
        case '*':
            result = prev * current;
            break;
        case '/':
            if (current === 0) {
                alert("Não é possível dividir por zero!");
                clearAll();
                return;
            }
            result = prev / current;
            break;
        default:
            return;
    }
    
    currentInput = result.toString();
    operation = null;
    resetInput = true;
    updateDisplay();
}

    // Event listeners para botões
    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const value = button.value;
            
            if (!isNaN(value)) {
                addNumber(value);
            } else {
                switch (value) {
                    case '.':
                        addDecimal();
                        break;
                    case 'C':
                        clearAll();
                        break;
                    case '±':
                        toggleSign();
                        break;
                    case '%':
                        calculatePercentage();
                        break;
                    case '=':
                        calculate();
                        break;
                    default:
                        setOperation(value);
                }
            }
        });
    });

    // Teclado
    document.addEventListener('keydown', (e) => {
        const key = e.key;
        
        if (!isNaN(key) || key === '.') {
            e.preventDefault();
            if (!isNaN(key)) {
                addNumber(key);
            } else {
                addDecimal();
            }
        } else if (key === 'Escape') {
            e.preventDefault();
            clearAll();
        } else if (key === '+' || key === '-' || key === '*' || key === '/') {
            e.preventDefault();
            setOperation(key);
        } else if (key === 'Enter' || key === '=') {
            e.preventDefault();
            calculate();
        } else if (key === '%') {
            e.preventDefault();
            calculatePercentage();
        }
    });

    // Inicializa o display
    updateDisplay();
});