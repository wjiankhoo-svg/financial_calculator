
// Get the input elements from HTML
const initialInvestmentInput = document.getElementById("initialInvestment");
const monthlyInvestmentInput = document.getElementById("monthlyInvestment");
//const annualReturnInput = document.getElementById("annualReturn");
const investmentPeriodInput = document.getElementById("investmentPeriod");
// Number of return rates
const numberOfReturnsInput = document.getElementById("numberOfReturns");


// Buttons
const createReturnInputsButton = document.getElementById("createReturnInputsButton");
const calculateButton = document.getElementById("calculateButton");


// Areas where we will display things
const returnInputs = document.getElementById("returnInputs");
const result = document.getElementById("result");

// ==========================================
// CREATE RETURN RATE INPUTS
// ==========================================

createReturnInputsButton.addEventListener("click", function() {

    // Get the number entered by the user
    const numberOfReturns =
        Number(numberOfReturnsInput.value);


    // Check if the user entered a valid number
    if (numberOfReturns <= 0) {

        alert("Please enter a valid number.");

        return;
    }


    // Remove any old return inputs
    returnInputs.innerHTML = "";


    // Create the return inputs
    for (let i = 1; i <= numberOfReturns; i++) {

        // Create label
        const label =
            document.createElement("label");

        label.textContent =
            "Return " + i + " (%)";


        // Create input
        const input =
            document.createElement("input");

        input.type = "number";

        input.id =
            "return" + i;


        // Add label to webpage
        returnInputs.appendChild(label);


        // Add input to webpage
        returnInputs.appendChild(input);


        // Add line breaks
        returnInputs.appendChild(
            document.createElement("br")
        );

        returnInputs.appendChild(
            document.createElement("br")
        );
    }

});

// ==========================================
// INVESTMENT CALCULATION FUNCTION
// ==========================================

function calculateInvestment(
    initialInvestment,
    monthlyInvestment,
    annualReturn,
    investmentPeriod
) {

    // Convert annual return from percentage
    // to decimal
    const annualRate = annualReturn / 100;


    // Convert annual return to monthly return
    const monthlyRate = annualRate / 12;


    // Convert investment period from years
    // to number of months
    const totalMonths = investmentPeriod * 12;


    // Start with the initial investment
    let balance = initialInvestment;


    // Calculate investment month by month
    for (let month = 1; month <= totalMonths; month++) {

        // Calculate the return for this month
        const monthlyProfit =
            balance * monthlyRate;

         // Round monthly profit to 2 decimal places
        const roundedProfit =
            Number(monthlyProfit.toFixed(2));

        // Add the rounded profit
        balance =
            balance + roundedProfit;


        // Add the monthly investment
        balance =
            balance + monthlyInvestment;

        // Round balance to 2 decimal places
        balance =
            Number(balance.toFixed(2));


    }


    // Return the final investment value
    return balance;
}



// Run this function when the Calculate button is clicked
calculateButton.addEventListener("click", function() {

    // Get values from the input boxes
    const initialInvestment = Number(initialInvestmentInput.value);
    const monthlyInvestment = Number(monthlyInvestmentInput.value);
    // const annualReturn = Number(annualReturnInput.value);
    const investmentPeriod = Number(investmentPeriodInput.value);
     // Get number of return rates
    const numberOfReturns =
        Number(numberOfReturnsInput.value);

     // ==========================================
    // CHECK USER INPUT
    // ==========================================

    if (
        initialInvestment < 0 ||
        monthlyInvestment < 0 ||
        investmentPeriod <= 0 ||
        numberOfReturns <= 0
    ) {

        alert("Please enter valid values.");

        return;
    }

    
     // Create an empty array to store the return rates
    const returnRates = [];

    // Get every return rate
    for (let i = 1; i <= numberOfReturns; i++) {

        const input =
            document.getElementById("return" + i);

        // Check whether the return input exists
        if (!input) {

            alert(
                "Please click 'Choose Return Rates' first."
            );

            return;
        }

        const rate =
            Number(input.value);

          // Check return rate
        if (rate < 0) {

            alert(
                "Return rate cannot be negative."
            );

            return;
        }


        returnRates.push(rate);
    }



    // Display the values in the browser
    // result.textContent =
    //     "Initial Investment: RM " + initialInvestment +
    //     " | Monthly Investment: RM " + monthlyInvestment +
    //     " | Annual Return: " + annualReturn + "%" +
    //     " | Investment Period: " + investmentPeriod + " years";

    

// ==========================================
    // CALCULATE TOTAL INVESTMENT
    // ==========================================

    const totalMonths =
        investmentPeriod * 12;


    const totalInvested =
        initialInvestment +
        (monthlyInvestment * totalMonths);


    // ==========================================
    // CREATE RESULT
    // ==========================================

    let resultHTML = `

        <h3>Investment Comparison</h3>

        <p>
            Total Money Invested:
            RM ${totalInvested.toFixed(2)}
        </p>

        <hr>
    `;


    // ==========================================
    // CALCULATE EACH RETURN RATE
    // ==========================================

    for (let rate of returnRates) {

        // Calculate final value
        const finalValue =
            calculateInvestment(
                initialInvestment,
                monthlyInvestment,
                rate,
                investmentPeriod
            );


        // Calculate investment profit
        const investmentProfit =
            finalValue - totalInvested;


        // Add result to HTML
        resultHTML += `

            <h3>${rate}% Return</h3>

            <p>
                Final Value:
                RM ${finalValue.toFixed(2)}
            </p>

            <p>
                Investment Profit:
                RM ${investmentProfit.toFixed(2)}
            </p>

            <hr>
        `;
    }


    // ==========================================
    // DISPLAY RESULT
    // ==========================================

    result.innerHTML = resultHTML;

});