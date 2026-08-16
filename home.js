
// ==========================================
// GET BUTTONS
// ==========================================

const calculatorButton =
    document.getElementById(
        "calculatorButton"
    );


const targetButton =
    document.getElementById(
        "targetButton"
    );


// ==========================================
// GO TO INVESTMENT CALCULATOR
// ==========================================

calculatorButton.addEventListener(
    "click",
    function() {

        window.location.href =
            "calculator.html";

    }
);


// ==========================================
// GO TO TARGET CALCULATOR
// ==========================================

targetButton.addEventListener(
    "click",
    function() {

        window.location.href =
            "target.html";

    }
);