const inputTypes = {
	clearScreen: 0,
	operator: 1, 
	numberSignal: 2,
	number: 3,
	evaluation: 4,
};

/* Stores all the user Inputs types, it's important to a good backscape functionality (and easy to implement) */ 
let inputArray = [inputTypes.clearScreen]; 

function updateScreen(text)
{
	let screen = document.getElementById('screen');

	screen.innerText = text;
	screen.scrollLeft = screen.scrollWidth;
}

function clearScreen()
{
	inputArray = [inputTypes.clearScreen];
	updateScreen('0');
}

function deleteLast()
{
	let screenText = document.getElementById('screen').innerText;

	if (inputArray.length > 0) inputArray.pop();
	if (screenText.length > 1) {
		updateScreen(screenText.slice(0, -1));
	} else {
		clearScreen();
	}
}

function appendData(type, string)
{
	let screenInnerText = document.getElementById('screen').innerText;	
	if (type >= inputTypes.evaluation || type <= inputTypes.clearScreen) return; 
	
	if (inputArray[inputArray.length - 1] === inputTypes.operator) 
		screenInnerText += ' ';
	
	if (inputArray[inputArray.length - 1] === inputTypes.clearScreen || (inputArray[inputArray.length - 1] === inputTypes.evaluation && screenInnerText === '0')) {
		inputArray[inputArray.length - 1] = inputTypes.clearScreen; 
		screenInnerText = '';
	}

	if (type === inputTypes.operator) {
		if (inputArray[inputArray.length - 1] === inputTypes.operator || inputArray[inputArray.length - 1] === inputTypes.clearScreen) {
			if ((string !== '+' && string !== '-')) return;
			type = inputTypes.numberSignal;
			updateScreen(screenInnerText + string);
		} else if (inputArray[inputArray.length - 1] !== inputTypes.numberSignal) {
			updateScreen(screenInnerText + ' ' + string + ' ');
		} else {
			return;
		}

		curExprIsFrac = false;
		inputArray.push(type);

		return;
	}

	if (type === inputTypes.number && string === '.') {
		if (curExprIsFrac) return;
		curExprIsFrac = true;
	}

	inputArray.push(type);
	updateScreen(screenInnerText + string);
}

class PostFixExpression {
	constructor(expression) {
		this.stack = [];

		const precedence = {'+': 1, '-': 1, '*': 2, '/': 2, '%': 2};
		const tokens = expression.split(' ').filter(item => item);
		
		const operatorStack = [];

		for (let i = 0; i < tokens.length; ++i) {
			if (/\d/.test(tokens[i])) { /* Digit, a good notice (no work) */
				this.stack.push(tokens[i]);
			} else { /* Operators... */
				while (operatorStack.length > 0 && precedence[operatorStack[operatorStack.length - 1]] >= precedence[tokens[i]])
					this.stack.push(operatorStack.pop());
				operatorStack.push(tokens[i]);
			}
		}

		while (operatorStack.length > 0)
			this.stack.push(operatorStack.pop());

		console.log(tokens); 
		console.log(this.stack); 
	}

	solve() {
		const stack = [];

		for (let i = 0; i < this.stack.length; ++i) {
			if (/\d/.test(this.stack[i])) {
				stack.push(Number(this.stack[i]));
			} else {
				console.log(stack); 

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
				
				console.log(stack); 
			}
		}
		
		return stack.pop();
	}
};

function evaluateExpression()
{
	if (inputArray[inputArray.length - 1] === inputTypes.operator || inputArray[inputArray.length - 1] === inputTypes.numberSignal) return;

	let postFix = new PostFixExpression(document.getElementById('screen').innerText);
	let result = postFix.solve();

	inputArray = [inputTypes.evaluation];
	if (result % 1 !== 0) {
		updateScreen(String(result.toFixed(2)));
		curExprIsFrac = true;
	} else {
		updateScreen(String(result));
	}
}

function treatKeyboardInput(event)
{
	switch (event.key) {
	case '0': appendData(inputTypes.number, '0'); break;
	case '1': appendData(inputTypes.number, '1'); break;
	case '2': appendData(inputTypes.number, '2'); break;
	case '3': appendData(inputTypes.number, '3'); break;
	case '4': appendData(inputTypes.number, '4'); break;
	case '5': appendData(inputTypes.number, '5'); break;
	case '6': appendData(inputTypes.number, '6'); break;
	case '7': appendData(inputTypes.number, '7'); break;
	case '8': appendData(inputTypes.number, '8'); break;
	case '9': appendData(inputTypes.number, '9'); break;
	case '/': appendData(inputTypes.operator, '/'); break;
	case '*': appendData(inputTypes.operator, '*'); break;
	case '+': appendData(inputTypes.operator, '+'); break;
	case '-': appendData(inputTypes.operator, '-'); break;
	case '.': appendData(inputTypes.number, '.'); break;
	case 'Enter':
	case '=':
		evaluateExpression(); break;
	case 'Delete':
	case 'Backspace':
		deleteLast(); break;
	case 'C':
		clearScreen(); break;
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
