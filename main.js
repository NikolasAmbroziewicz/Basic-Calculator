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
  }

  addNumber(number) {
    if (number === "." && this.firstNumber.includes(".")) return;
    this.firstNumber = this.firstNumber.toString() + number.toString();
  }

  addOperation(operation) {
    if (this.firstNumber === "") return console.log("cos");
    if (this.secondNumber !== "") {
      this.math();
    }
    this.operation = operation;
    this.secondNumber = this.firstNumber;
    this.firstNumber = "";
    console.log("tu");
  }

  math() {
    let score;
    const prev = parseFloat(this.firstNumber);
    console.log(prev);
    const curent = parseFloat(this.secondNumber);
    if (isNaN(prev) || isNaN(curent)) return;
    switch (this.operation) {
      case "+":
        score = curent + prev;
        break;
      case "-":
        score = curent - prev;
        break;
      case "X":
        score = curent * prev;
        break;
      case "/":
        score = curent / prev;
        break;
    }

    this.secondNumber = score;
  }

  update() {
    this.previousDisplay.innerText = `${this.firstNumber} ${
      this.operation === undefined ? "" : this.operation
    }`;
    this.currentDisplay.innerText = `${
      this.secondNumber === "" ? this.firstNumber : this.secondNumber
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
  calculator.math();
  calculator.update();
});
