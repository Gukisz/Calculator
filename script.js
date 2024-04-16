let last = 'NaN';

function clearScreen()
{
	document.getElementById('screen').innerText = '0';
	last = 'NaN';
}

function deleteLast()
{
	let screen = document.getElementById('screen').innerText;
	if (screen.length === 1) {
		clearScreen();
		return;
	}

	document.getElementById('screen').innerText = screen.slice(0, -1);
	last = '\b';
}

function appendOperator(operator)
{
	if (operator !== '-' && operator !== '+' && operator !== '*' && operator !== '/') return;

	if (!isNaN(Number(last))) {
		document.getElementById('screen').innerText += ' ' + operator;
		last = 'Operator';
	}
}

function appendNumber(number)
{
	if (isNaN(Number(number))) return;
	
	if (isNaN(Number(last))) {
		if (number === '0') return;
		if (last === 'NaN' || last === '\r' || document.getElementById('screen').innerText === '0') 
			document.getElementById('screen').innerText = '';
	}
	
	document.getElementById('screen').innerText += number;
	last = number;
}

function evalAndDisplay()
{
	const regex = /^[0-9\+\-\*\/\s]*$/;
	let text = document.getElementById('screen').innerText;
	let result = '';

	if (!regex.test(text)) return;

	let numBuffer = '';
	let operator = null;

	for (let i = 0; i < text.length; i++) {
		const char = text[i];
		if (char >= '0' && char <= '9') {
			numBuffer += char;
		} else if (char === '+' || char === '-' || char === '*' || char === '/') {
			if (numBuffer !== '') {
				if (result === '') {
				    result = Number(numBuffer);
				} else {
				    result = performOperation(result, Number(numBuffer), operator);
				}
				numBuffer = '';
			}

			operator = char;
		} else if (char === ' ') {
			continue;
		} else {
			result = '';
			break;
		}
	}

	if (numBuffer !== '') {
		if (result === '') {
			result = Number(numBuffer);
		} else {
			result = performOperation(result, Number(numBuffer), operator);
		}
	}

	document.getElementById('screen').innerText = String(result);
}

function performOperation(num1, num2, operator) {
	switch (operator) {
	case '+': return num1 + num2;
	case '-': return num1 - num2;
	case '*': return num1 * num2;
	case '/': return num1 / num2;
	default: return NaN; 
	}
}

function listenKeyboardInput(event)
{
	const keyCode = event;
	switch (keyCode.keyCode || keyCode.which) {
		case 48: appendNumber('0'); break;
		case 49: appendNumber('1'); break;
		case 50: appendNumber('2'); break;
		case 51: appendNumber('3'); break;
		case 52: appendNumber('4'); break;
		case 53: appendNumber('5'); break;
		case 54: appendNumber('6'); break;
		case 55: appendNumber('7'); break;
		case 56: 
			if (keyCode.shiftKey) {
				appendOperator('*'); 
			} else {
				appendNumber('8');
			} 

			break;
		case 57: appendNumber('9'); break;

		case 173: appendOperator('-'); break;
		case 61:
			if (keyCode.shiftKey) {
				evalAndDisplay();
			} else {
				appendOperator('+');
			}

			break;
		case 190: appendOperator('*'); break;
		case 220: appendOperator('/'); break;

		case 46:
		case 8: deleteLast(); break;
		
		case 13: evalAndDisplay(); break;
	}
}

document.addEventListener('keydown', listenKeyboardInput);
