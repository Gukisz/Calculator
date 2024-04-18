const CLEAR_SCR = 0, OPERATOR_APPEND = 1, NUMBER_SIGN = 2, PARAMS = 3, NUMBER = 4, BACKSPACE = 5, EVALUATION = 6;

let lastInputType = CLEAR_SCR;
let curExprIsFrac = false;

function updateScreen(text)
{
	document.getElementById('screen').innerText = text;
}

function clearScreen()
{
	lastInputType = CLEAR_SCR;
	updateScreen('0');
}

function deleteLast()
{
	let screenText = document.getElementById('screen').innerText;
	
	lastInputType = BACKSPACE;
	if (screenText.length > 1) {
		updateScreen(screenText.slice(0, -1));
	} else {
		clearScreen();
	}
}

function appendData(kind, string)
{
	let screenInnerText = String(document.getElementById('screen').innerText); 

	if (kind >= BACKSPACE || kind <= CLEAR_SCR) return; 
	
	if (lastInputType == OPERATOR_APPEND) 
		screenInnerText += ' ';
	
	if (lastInputType === CLEAR_SCR || (lastInputType === EVALUATION && screenInnerText === '0')) {
		lastInputType = CLEAR_SCR; 
		screenInnerText = '';
	}

	if (kind === OPERATOR_APPEND) {
		if (lastInputType === OPERATOR_APPEND || lastInputType === CLEAR_SCR) {
			if ((string !== '+' && string !== '-')) return;
			kind = NUMBER_SIGN;
			updateScreen(screenInnerText + string);
		} else if (lastInputType !== NUMBER_SIGN) {
			updateScreen(screenInnerText + ' ' + string + ' ');
		} else {
			return;
		}

		curExprIsFrac = false;
		lastInputType = kind;
		return;
	}

	if (kind === NUMBER && string === '.') {
		if (curExprIsFrac) return;
		curExprIsFrac = true;
	}

	lastInputType = kind;
	updateScreen(screenInnerText + string);
}

class PostFixExpression {
	constructor(expression) {
		const precedence = {'+': 1, '-': 1, '*': 2, '/': 2, '%': 2};
		const tokens = expression.split(' ').filter(item => item);

		const outputQueue = [];
		const operatorStack = [];

		for (let i = 0; i < tokens.length; ++i) {
			if (/\d/.test(tokens[i])) { /* Digit, a good notice (no work) */
				outputQueue.push(tokens[i]);
			} else { /* Operators... */
				while (operatorStack.length > 0 && precedence[operatorStack[operatorStack.length - 1]] >= precedence[tokens[i]])
					outputQueue.push(operatorStack.pop());
				operatorStack.push(tokens[i]);
			}
		}

		while (operatorStack.length > 0)
			outputQueue.push(operatorStack.pop());

		this.stack = outputQueue; 
		console.log(this.stack); 
	}

	solve() {
		const stack = [];

		for (let i = 0; i < this.stack.length; ++i) {
			if (/\d/.test(this.stack[i])) {
				stack.push(Number(this.stack[i]));
			} else {
				const b = stack.pop(); 
				const a = stack.pop();	
				switch (this.stack[i]) {
				case '+':
					stack.push(a + b); break;
				case '-':
					stack.push(a - b); break;
				case '*': 
					stack.push(a * b); break;
				case '/': 
					stack.push(a / b); break; 
				case '%':
					stack.push(a % b); break;
				}
			}
		}

		return stack.pop();
	}
};

function evaluateExpression()
{
	if (lastInputType === OPERATOR_APPEND || lastInputType === NUMBER_SIGN) return;
	let postFix = new PostFixExpression(document.getElementById('screen').innerText);
	let result = postFix.solve();

	lastInputType = EVALUATION;

	if (result % 1 !== 0) {
		updateScreen(String(result.toFixed(2)));
	} else {
		updateScreen(String(result));
	}
}

function treatKeyboardInput(event)
{
	switch (event.key) {
	case '0':
		appendData(NUMBER, '0'); break;
	case '1':
		appendData(NUMBER, '1'); break;
	case '2':
		appendData(NUMBER, '2'); break;
	case '3':
		appendData(NUMBER, '3'); break;
	case '4':
		appendData(NUMBER, '4'); break;
	case '5':
		appendData(NUMBER, '5'); break;
	case '6':
		appendData(NUMBER, '6'); break;
	case '7':
		appendData(NUMBER, '7'); break;
	case '8':
		appendData(NUMBER, '8'); break;
	case '9':
		appendData(NUMBER, '9'); break;
	case '/':
		appendData(OPERATOR_APPEND, '/'); break;
	case '*':
		appendData(OPERATOR_APPEND, '*'); break;
	case '+':
		appendData(OPERATOR_APPEND, '+'); break;
	case '-':
		appendData(OPERATOR_APPEND, '-'); break;
	case 'Enter':
	case '=':
		evaluateExpression(); break;
	case 'Delete':
	case 'Backspace':
		deleteLast(); break;
	case 'C':
		clearScreen(); break;
	case '.':
		appendData(NUMBER, '.'); 
	}

}

document.addEventListener('keydown', treatKeyboardInput);
document.addEventListener('DOMContentLoaded', function () {
	let elements = Array.from(document.getElementsByClassName('calc-buttons'));
	elements.push(...document.getElementsByClassName('class-buttons double'));
	elements.push(...document.getElementsByClassName('class-buttons triple'));

	for (let i = 0; i < elements.length; ++i) 
		elements[i].addEventListener('keydown', function (event) { event.preventDefault(); });
});
