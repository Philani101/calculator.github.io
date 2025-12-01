function addition(x, y) {
    return x + y;
}
function substraction(x, y) {
    return x - y;
}
function multiplication(x, y) {
    return x * y;
}
function division(x, y) {
    return x / y;
}
function calc(x, y, symbol) {
    if (symbol === "+") {
        return addition(x, y);
    }
    if (symbol === "*" || symbol === "&times") {
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
var tempNumber = "";
var finalList = [];
var miniDisplay = "";
document.addEventListener("DOMContentLoaded", function () {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t;
    console.log("done");
    var display = document.querySelector('.displayText');
    // Helper function to handle number inputs
    var handleNumberClick = function (event) {
        event.preventDefault();
        var target = event.target;
        tempNumber = tempNumber + target.value;
        console.log(tempNumber);
        display.value = tempNumber;
    };
    // Number buttons
    (_a = document.querySelector('#one')) === null || _a === void 0 ? void 0 : _a.addEventListener("click", handleNumberClick);
    (_b = document.querySelector('#two')) === null || _b === void 0 ? void 0 : _b.addEventListener("click", handleNumberClick);
    (_c = document.querySelector('#three')) === null || _c === void 0 ? void 0 : _c.addEventListener("click", handleNumberClick);
    (_d = document.querySelector('#four')) === null || _d === void 0 ? void 0 : _d.addEventListener("click", handleNumberClick);
    (_e = document.querySelector('#five')) === null || _e === void 0 ? void 0 : _e.addEventListener("click", handleNumberClick);
    (_f = document.querySelector('#six')) === null || _f === void 0 ? void 0 : _f.addEventListener("click", handleNumberClick);
    (_g = document.querySelector('#seven')) === null || _g === void 0 ? void 0 : _g.addEventListener("click", handleNumberClick);
    (_h = document.querySelector('#eight')) === null || _h === void 0 ? void 0 : _h.addEventListener("click", handleNumberClick);
    (_j = document.querySelector('#nine')) === null || _j === void 0 ? void 0 : _j.addEventListener("click", handleNumberClick);
    (_k = document.querySelector('#zero')) === null || _k === void 0 ? void 0 : _k.addEventListener("click", handleNumberClick);
    (_l = document.querySelector('#fullstop')) === null || _l === void 0 ? void 0 : _l.addEventListener("click", handleNumberClick);
    // Clear and delete functionality
    (_m = document.querySelector('#clear')) === null || _m === void 0 ? void 0 : _m.addEventListener("click", function (event) {
        event.preventDefault();
        tempNumber = "";
        finalList = [];
        miniDisplay = "";
        console.log(tempNumber);
        display.value = "0";
    });
    (_o = document.querySelector('#delete')) === null || _o === void 0 ? void 0 : _o.addEventListener("click", function (event) {
        event.preventDefault();
        tempNumber = tempNumber.slice(0, -1);
        console.log(tempNumber);
        display.value = tempNumber || "0";
    });
    // Helper function for operators
    var handleOperator = function (event) {
        event.preventDefault();
        if (tempNumber === "")
            return; // Don't add operator if no number entered
        var num = parseFloat(tempNumber);
        finalList.push(num);
        miniDisplay = miniDisplay + tempNumber;
        tempNumber = "";
        display.value = "0";
        var symbol = event.target;
        finalList.push(symbol.value);
        miniDisplay = miniDisplay + symbol.value;
        console.log("miniDisplay: ", miniDisplay);
        var mini = document.querySelector('.miniDisplay');
        mini.innerText = miniDisplay;
    };
    // Operators functionality
    (_p = document.querySelector('#plus')) === null || _p === void 0 ? void 0 : _p.addEventListener("click", handleOperator);
    (_q = document.querySelector('#times')) === null || _q === void 0 ? void 0 : _q.addEventListener("click", handleOperator);
    (_r = document.querySelector('#minus')) === null || _r === void 0 ? void 0 : _r.addEventListener("click", handleOperator);
    (_s = document.querySelector('#divide')) === null || _s === void 0 ? void 0 : _s.addEventListener("click", handleOperator);
    // Equals operator functionality
    (_t = document.querySelector('#equalto')) === null || _t === void 0 ? void 0 : _t.addEventListener("click", function (event) {
        event.preventDefault();
        console.log("clicked =");
        if (tempNumber !== "") {
            var num = parseFloat(tempNumber);
            finalList.push(num);
        }
        console.log("Final list:", finalList);
        // Calculate result
        if (finalList.length === 0) {
            display.value = "0";
            return;
        }
        var result = finalList[0];
        for (var i = 1; i < finalList.length; i += 2) {
            var operator = finalList[i];
            var nextNum = finalList[i + 1];
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
