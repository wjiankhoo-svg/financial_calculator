
// Get the input elements from HTML
const initialInvestmentInput = document.getElementById("initialInvestment");
const monthlyInvestmentInput = document.getElementById("monthlyInvestment");
const annualReturnInput = document.getElementById("annualReturn");
const investmentPeriodInput = document.getElementById("investmentPeriod");

// Get the Calculate button
const calculateButton = document.getElementById("calculateButton");

// Get the result paragraph
const result = document.getElementById("result");


// Run this function when the Calculate button is clicked
calculateButton.addEventListener("click", function() {

    // Get values from the input boxes
    const initialInvestment = Number(initialInvestmentInput.value);
    const monthlyInvestment = Number(monthlyInvestmentInput.value);
    const annualReturn = Number(annualReturnInput.value);
    const investmentPeriod = Number(investmentPeriodInput.value);

    // Display the values in the browser
    result.textContent =
        "Initial Investment: RM " + initialInvestment +
        " | Monthly Investment: RM " + monthlyInvestment +
        " | Annual Return: " + annualReturn + "%" +
        " | Investment Period: " + investmentPeriod + " years";
});