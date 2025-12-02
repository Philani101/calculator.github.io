function addition(x: number, y: number): number {
  return x + y;
}

function substraction(x: number, y: number): number {
  return x - y;
}

function multiplication(x: number, y: number): number {
  return x * y;
}

function division(x: number, y: number): number {
  if (y === 0) {
    throw new Error("Cannot divide by zero");
  }
  return x / y;
}

function calc(x: number, y: number, symbol: string): number {
  if (symbol === "+") {
    return addition(x, y);
  }
  if (symbol === "×" || symbol === "x" || symbol === "*") {
    return multiplication(x, y);
  }
  if (symbol === "/") {
    return division(x, y);
  }
  if (symbol === "-") {
    return substraction(x, y);
  }
  return 0;
}

let tempNumber: string = "";
type finalListValues = string | number;
let finalList: finalListValues[] = [];
let miniDisplay: string = "";
let prevAnswer: string = "";

document.addEventListener("DOMContentLoaded", () => {
  console.log("Calculator initialized");
  
  const display = document.querySelector('.displayText') as HTMLInputElement;
  const miniDisplayElement = document.querySelector('.miniDisplay') as HTMLElement;
  
  // Check if required elements exist
  if (!display) {
    console.error("Display element not found");
    return;
  }

  // Helper function to update mini display safely
  const updateMiniDisplay = (text: string) => {
    if (miniDisplayElement) {
      miniDisplayElement.innerText = text;
    }
  };

  // Helper function to show error
  const showError = (message: string) => {
    display.value = "Error";
    updateMiniDisplay(message);
    tempNumber = "";
    finalList = [];
    miniDisplay = "";
    console.error(message);
  };

  // Helper function to handle number inputs
  const handleNumberClick = (event: Event) => {
    event.preventDefault();
    const target = event.target as HTMLInputElement;
    
    if (!target || !target.value) {
      console.error("Invalid button target");
      return;
    }

    // Prevent multiple decimal points
    if (target.value === "." && tempNumber.includes(".")) {
      return;
    }

    // Prevent leading zeros (except for 0.x)
    if (tempNumber === "0" && target.value !== ".") {
      tempNumber = target.value;
    } else {
      tempNumber = tempNumber + target.value;
    }
    
    console.log(tempNumber);
    display.value = tempNumber;
  };

  // Number buttons
  const numberButtons = ['#one', '#two', '#three', '#four', '#five', '#six', '#seven', '#eight', '#nine', '#zero', '#fullstop'];
  numberButtons.forEach(selector => {
    const button = document.querySelector(selector);
    if (button) {
      button.addEventListener("click", handleNumberClick);
    } else {
      console.warn(`Button ${selector} not found`);
    }
  });

  // ANS button
  document.querySelector('#ans')?.addEventListener("click", (event: Event) => {
    event.preventDefault();
    if (prevAnswer && prevAnswer !== "Error") {
      tempNumber = prevAnswer;
      display.value = tempNumber;
    }
  });

  // Clear functionality
  document.querySelector('#clear')?.addEventListener("click", (event: Event) => {
    event.preventDefault();
    tempNumber = "";
    finalList = [];
    miniDisplay = "";
    prevAnswer = "";
    updateMiniDisplay("");
    console.log("Calculator cleared");
    display.value = "0";
  });

  // Delete functionality
  document.querySelector('#delete')?.addEventListener("click", (event: Event) => {
    event.preventDefault();
    if (tempNumber.length > 0) {
      tempNumber = tempNumber.slice(0, -1);
      console.log(tempNumber);
      display.value = tempNumber || "0";
    }
  });

  // Helper function for operators
  const handleOperator = (event: Event) => {
    event.preventDefault();
    
    // Don't add operator if no number entered
    if (tempNumber === "" && finalList.length === 0) {
      return;
    }

    // If tempNumber is empty but we have previous result, use it
    if (tempNumber === "" && prevAnswer && prevAnswer !== "Error") {
      tempNumber = prevAnswer;
    }

    if (tempNumber === "") {
      return;
    }
    
    const num = parseFloat(tempNumber);
    
    // Check if number is valid
    if (isNaN(num)) {
      showError("Invalid number");
      return;
    }
    
    finalList.push(num);
   miniDisplay = miniDisplay + tempNumber;
    tempNumber = "";
    display.value = "0";
    
    const symbol = event.target as HTMLInputElement;
    if (!symbol || !symbol.value) {
      console.error("Invalid operator");
      return;
    }
    
    finalList.push(symbol.value);
    miniDisplay = miniDisplay + symbol.value;
    console.log("miniDisplay: ", miniDisplay);
    updateMiniDisplay(miniDisplay);
  };

  // Operators functionality
  const operatorButtons = ['#plus', '#times', '#minus', '#divide'];
  operatorButtons.forEach(selector => {
    const button = document.querySelector(selector);
    if (button) {
      button.addEventListener("click", handleOperator);
    } else {
      console.warn(`Operator button ${selector} not found`);
    }
  });

  // Equals operator functionality
  document.querySelector('#equalto')?.addEventListener("click", (event: Event) => {
    event.preventDefault();
    console.log("clicked =");
    
    try {
      updateMiniDisplay(miniDisplay + tempNumber);
      
      if (tempNumber !== "") {
        const num = parseFloat(tempNumber);
        
        // Check if number is valid
        if (isNaN(num)) {
          showError("Invalid number");
          return;
        }
        
        finalList.push(num);
      }
      
      console.log("Final list:", finalList);
      
      // Calculate result
      if (finalList.length === 0) {
        display.value = "0";
        return;
      }
      
      // Check if we have a valid expression (odd length)
      if (finalList.length % 2 === 0) {
        showError("Incomplete expression");
        return;
      }
      
      let result = finalList[0] as number;
      
      // Check if first element is a valid number
      if (isNaN(result)) {
        showError("Invalid expression");
        return;
      }
      
      for (let i = 1; i < finalList.length; i += 2) {
        const operator = finalList[i] as string;
        const nextNum = finalList[i + 1] as number;
        
        if (nextNum === undefined || isNaN(nextNum)) {
          showError("Invalid number in expression");
          return;
        }
        
        if (typeof operator !== 'string') {
          showError("Invalid operator");
          return;
        }
        
        result = calc(result, nextNum, operator);
        
        // Check for infinity or NaN results
        if (!isFinite(result)) {
          showError("Result is not a finite number");
          return;
        }
      }
      
      console.log("Result:", result);
      
      // Round to avoid floating point errors
      const roundedResult = Math.round(result * 1000000000) / 1000000000;
      display.value = roundedResult.toString();
      prevAnswer = roundedResult.toString();
      
      // Reset for next calculation
      tempNumber = display.value;
      finalList = [];
      miniDisplay = "";
      
    } catch (error) {
      if (error instanceof Error) {
        showError(error.message);
      } else {
        showError("An unknown error occurred");
      }
    }
  });
});