class Calculator {
  constructor(previousDisplayHTML, currentDisplayHTML) {
    this.previousDisplay = previousDisplayHTML;
    this.currentDisplay = currentDisplayHTML;
    this.setting();
  }

  setting() {
    this.firstNumber = "";
    this.secondNumber = "";
    this.operation = undefined;
    this.afterEqual = "";
  }

  addNumber(number) {
    if (number === "." && this.firstNumber.includes(".")) return;
    this.firstNumber = this.firstNumber.toString() + number.toString();
  }

  addOperation(operation) {
    if (this.firstNumber === "") return console.log("cos");
    if (this.secondNumber !== "" && this.afterEqual !== "") {
      this.math();
    }
    this.operation = operation;
    this.secondNumber = this.firstNumber;
    this.firstNumber = "";
    console.log(this.operation);
    if (
      this.operation === "x^2" ||
      this.operation === "x^3" ||
      this.operation === `Sqrt`
    ) {
      this.extendsMath();
    }
  }

  math(text) {
    let score;
    const prev = parseFloat(this.firstNumber);
    console.log(prev);
    let curent;
    if (this.secondNumber === "") {
      curent = parseFloat(this.afterEqual);
    } else {
      curent = parseFloat(this.secondNumber);
    }
    if (isNaN(prev) || isNaN(curent)) return;
    switch (this.operation) {
      case "+":
        score = curent + prev;
        break;
      case "-":
        score = prev - curent;
        break;
      case "X":
        score = curent * prev;
        break;
      case "/":
        score = curent / prev;
        break;
      case "%":
        score = (curent * prev) / 100;
        break;
    }
    if (this.afterEqual === "") {
      this.afterEqual = prev;
    }
    this.firstNumber = score;
    this.secondNumber = "";
  }

  extendsMath() {
    let value;
    const prev = parseFloat(this.secondNumber);
    console.log(prev);
    switch (this.operation) {
      case "x^2":
        value = Math.pow(prev, 2);
        break;
      case "x^3":
        value = Math.pow(prev, 3);
        break;
      case "Sqrt":
        value = Math.sqrt(prev);
        break;
    }
    this.firstNumber = value;
  }

  plusMinus() {
    if (this.firstNumber.includes("-")) {
      this.firstNumber = this.firstNumber.substring(1);
    } else {
      this.firstNumber = `-${this.firstNumber}`;
    }
  }

  clear(text) {
    if (text === "C") {
      this.firstNumber = this.firstNumber.slice(0, -1);
    } else if (text === "CE") {
      this.firstNumber = "";
      this.secondNumber = "";
      this.operation = "";
      this.afterEqual = 0;
    }
  }

  update() {
    this.previousDisplay.innerText = `${this.secondNumber} ${
      this.operation === undefined ? "" : this.operation
    }`;
    this.currentDisplay.innerText = `${
      this.firstNumber === "" ? this.secondNumber : this.firstNumber
    }`;
  }
}

const previousDispaly = document.querySelector("[data-previous]");
const currentDisplay = document.querySelector("[data-current]");
const buttonOperant = document.querySelectorAll("[data-operant]");
const buttonNumbers = document.querySelectorAll("[data-number]");
const buttonAllClear = document.querySelector("[data-clearAll]");
const buttonCleanOne = document.querySelector("[data-clearOne]");
const buttonProcent = document.querySelector("[data-procent]");
const buttonEqual = document.querySelector("[data-equal]");
const buttonPlusMinus = document.querySelector("[data-plusMinus]");

const calculator = new Calculator(previousDispaly, currentDisplay);

buttonNumbers.forEach((btn) => {
  btn.addEventListener("click", () => {
    calculator.addNumber(btn.innerText);
    calculator.update();
  });
});

buttonOperant.forEach((btn) => {
  btn.addEventListener("click", () => {
    calculator.addOperation(btn.innerText);
    calculator.update();
  });
});

buttonEqual.addEventListener("click", () => {
  calculator.math(buttonEqual.innerText);
  calculator.update();
});

buttonCleanOne.addEventListener("click", () => {
  calculator.clear(buttonCleanOne.innerText);
  calculator.update();
});

buttonAllClear.addEventListener("click", () => {
  calculator.clear(buttonAllClear.innerText);
  calculator.update();
});

buttonPlusMinus.addEventListener("click", () => {
  calculator.plusMinus();
  calculator.update();
});
