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
  return x / y;
}

function calc(x: number, y: number, symbol: string): number {
  if (symbol === "+") {
    return addition(x, y);
  }
  if (symbol === "*" || symbol === "x") {
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

document.addEventListener("DOMContentLoaded", () => {
  console.log("done");
  const display = document.querySelector('.displayText') as HTMLInputElement;

  // Helper function to handle number inputs
  const handleNumberClick = (event: Event) => {
    event.preventDefault();
    const target = event.target as HTMLInputElement;
    tempNumber = tempNumber + target.value;
    console.log(tempNumber);
    display.value = tempNumber;
  };

  // Number buttons
  document.querySelector('#one')?.addEventListener("click", handleNumberClick);
  document.querySelector('#two')?.addEventListener("click", handleNumberClick);
  document.querySelector('#three')?.addEventListener("click", handleNumberClick);
  document.querySelector('#four')?.addEventListener("click", handleNumberClick);
  document.querySelector('#five')?.addEventListener("click", handleNumberClick);
  document.querySelector('#six')?.addEventListener("click", handleNumberClick);
  document.querySelector('#seven')?.addEventListener("click", handleNumberClick);
  document.querySelector('#eight')?.addEventListener("click", handleNumberClick);
  document.querySelector('#nine')?.addEventListener("click", handleNumberClick);
  document.querySelector('#zero')?.addEventListener("click", handleNumberClick);
  document.querySelector('#fullstop')?.addEventListener("click", handleNumberClick);

  // Clear and delete functionality
  document.querySelector('#clear')?.addEventListener("click", (event: Event) => {
    event.preventDefault();
    tempNumber = "";
    finalList = [];
    miniDisplay = "";
    console.log(tempNumber);
    display.value = "0";
  });

  document.querySelector('#delete')?.addEventListener("click", (event: Event) => {
    event.preventDefault();
    tempNumber = tempNumber.slice(0, -1);
    console.log(tempNumber);
    display.value = tempNumber || "0";
  });

  // Helper function for operators
  const handleOperator = (event: Event) => {
    event.preventDefault();
    if (tempNumber === "") return; // Don't add operator if no number entered
    
    const num = parseFloat(tempNumber);
    finalList.push(num);
    miniDisplay = miniDisplay + tempNumber;
    tempNumber = "";
    display.value = "0";
    
    const symbol = event.target as HTMLInputElement;
    finalList.push(symbol.value);
    miniDisplay = miniDisplay + symbol.value;
    console.log(miniDisplay);
  };

  // Operators functionality
  document.querySelector('#plus')?.addEventListener("click", handleOperator);
  document.querySelector('#times')?.addEventListener("click", handleOperator);
  document.querySelector('#minus')?.addEventListener("click", handleOperator);
  document.querySelector('#divide')?.addEventListener("click", handleOperator);

  // Equals operator functionality
  document.querySelector('#equalto')?.addEventListener("click", (event: Event) => {
    event.preventDefault();
    console.log("clicked =");
    
    if (tempNumber !== "") {
      const num = parseFloat(tempNumber);
      finalList.push(num);
    }
    
    console.log("Final list:", finalList);
    
    // Calculate result
    if (finalList.length === 0) {
      display.value = "0";
      return;
    }
    
    let result = finalList[0] as number;
    
    for (let i = 1; i < finalList.length; i += 2) {
      const operator = finalList[i] as string;
      const nextNum = finalList[i + 1] as number;
      
      if (nextNum !== undefined) {
        result = calc(result, nextNum, operator);
      }
    }
    
    console.log("Result:", result);
    display.value = result.toString();
    
    // Reset for next calculation
    tempNumber = "";
    finalList = [];
    miniDisplay = "";
  });
});