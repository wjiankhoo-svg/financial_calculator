
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
    // result.textContent =
    //     "Initial Investment: RM " + initialInvestment +
    //     " | Monthly Investment: RM " + monthlyInvestment +
    //     " | Annual Return: " + annualReturn + "%" +
    //     " | Investment Period: " + investmentPeriod + " years";

     // Convert annual return from percentage to decimal
    const annualRate = annualReturn / 100;

    // Convert annual return to monthly return
    const monthlyRate = annualRate / 12;

    // Convert years to number of months
    const totalMonths = investmentPeriod * 12;


    // Start with the initial investment
    let balance = initialInvestment;


    // Calculate the investment growth month by month
    for (let month = 1; month <= totalMonths; month++) {

        // Apply monthly investment return
        balance = balance * (1 + monthlyRate);

        // Add monthly investment
        balance = balance + monthlyInvestment;
    }


    // Calculate total money invested
    const totalInvested =
        initialInvestment +
        (monthlyInvestment * totalMonths);


    // Calculate investment profit
    const investmentProfit =
        balance - totalInvested;


    // Display the result
    result.innerHTML = `
        <p>Total Invested: RM ${totalInvested.toFixed(2)}</p>
        <p>Investment Profit: RM ${investmentProfit.toFixed(2)}</p>
        <p>Final Value: RM ${balance.toFixed(2)}</p>
    `;
});