// ==========================================
// GET SAVED DATA
// ==========================================

const savedData =
    localStorage.getItem("investmentData");

// const investmentChart =
//     document.getElementById("investmentChart");

// ==========================================
// CHECK IF DATA EXISTS
// ==========================================

if (!savedData) {

    document.body.innerHTML = `
        <h1>No Investment Data Found</h1>

        <p>
            Please go back to the calculator
            and calculate your investment first.
        </p>
    `;

}
else {

    // Convert JSON string back into
    // a JavaScript object
    const investmentData =
        JSON.parse(savedData);


    // ==========================================
    // GET HTML ELEMENTS
    // ==========================================

    const returnSelector =
        document.getElementById("returnSelector");

    const monthlyResult =
        document.getElementById("monthlyResult");

    const backButton =
        document.getElementById("backButton");

    const graphButton =
        document.getElementById("graphButton");

    const homeButton =
        document.getElementById("homeButton");


    // ==========================================
    // CREATE RETURN RATE OPTIONS
    // ==========================================

    for (
        let i = 0;
        i < investmentData.returnRates.length;
        i++
    ) {

        const rate =
            investmentData.returnRates[i];


        // Create option
        const option =
            document.createElement("option");


        // Value used by JavaScript
        option.value =
            rate;


        // Text shown to user
        option.textContent =
            rate + "%";


        // Add option to dropdown
        returnSelector.appendChild(option);
    }


    // ==========================================
    // SHOW MONTHLY DETAILS
    // ==========================================

    function showMonthlyDetails(rate) {

        // Get investment information
        const initialInvestment =
            investmentData.initialInvestment;

        const monthlyInvestment =
            investmentData.monthlyInvestment;

        const investmentPeriod =
            investmentData.investmentPeriod;

        const investmentPeriodUnit =
    investmentData.investmentPeriodUnit;

const totalMonths =
    investmentData.totalMonths;


        // ==========================================
        // CALCULATE MONTHLY RATE
        // ==========================================

        const annualRate =
            rate / 100;

        const monthlyRate =
            annualRate / 12;


        // ==========================================
        // TOTAL NUMBER OF MONTHS
        // ==========================================

        //const totalMonths =  investmentPeriod * 12;


        // ==========================================
        // STARTING BALANCE
        // ==========================================

        let balance =
            initialInvestment;


        // ==========================================
        // TOTAL MONEY INVESTED
        // ==========================================

        let totalInvested =
            initialInvestment;

        // const chartLabels = [];
        // const chartValues = [];

        // ==========================================
        // CREATE TABLE
        // ==========================================

        let tableHTML = `

            <h2>${rate}% Return</h2>
            (${investmentPeriod} ${investmentPeriodUnit})
            </h2>

            <table border="1">

                <tr>

                    <th>Month</th>

                    <th>Starting Balance</th>

                    <th>Monthly Investment</th>

                    <th>Monthly Return</th>

                    <th>Ending Balance</th>

                </tr>
        `;

        
        // ==========================================
        // CALCULATE EACH MONTH
        // ==========================================

        for (
            let month = 1;
            month <= totalMonths;
            month++
        ) {

            // Starting balance for this month
            const startingBalance =
                balance;


            // Calculate monthly profit
            const monthlyProfit =
                balance * monthlyRate;


            // ROUND MONTHLY PROFIT
            const roundedProfit =
                Number(
                    monthlyProfit.toFixed(2)
                );


            // Add rounded profit
            balance =
                balance + roundedProfit;


            // Add monthly investment
            balance =
                balance + monthlyInvestment;


            // ROUND ENDING BALANCE
            balance =
                Number(
                    balance.toFixed(2)
                );

            // chartLabels.push(month);

            // chartValues.push(balance);


            // Update total invested
            totalInvested =
                totalInvested + monthlyInvestment;


            // Add row to table
            tableHTML += `

                <tr>

                    <td>
                        ${month}
                    </td>

                    <td>
                        RM ${startingBalance.toFixed(2)}
                    </td>

                    <td>
                        RM ${monthlyInvestment.toFixed(2)}
                    </td>

                    <td>
                        RM ${roundedProfit.toFixed(2)}
                    </td>

                    <td>
                        RM ${balance.toFixed(2)}
                    </td>

                </tr>
            `;
        }

//         // ==========================================
// // CREATE INVESTMENT CHART
// // ==========================================

// // removes the old chart before creating the new one.
// if (window.currentInvestmentChart) {

//     window.currentInvestmentChart.destroy();

// }


// window.currentInvestmentChart =
//     new Chart(investmentChart, {

//         type: "line",

//         data: {

//             labels: chartLabels,

//             datasets: [{

//                 label:
//                     rate + "% Return",

//                 data:
//                     chartValues,

//                 tension: 0.2

//             }]
//         },

//         options: {

//             responsive: true,

//             scales: {

//                 x: {

//                     title: {

//                         display: true,

//                         text: "Month"
//                     }
//                 },

//                 y: {

//                     title: {

//                         display: true,

//                         text: "Portfolio Value (RM)"
//                     }
//                 }
//             }
//         }
//     });



        // ==========================================
        // FINISH TABLE
        // ==========================================

        tableHTML += `

            </table>

            <br>

            <h3>Summary</h3>

            <p>
                Total Invested:
                RM ${totalInvested.toFixed(2)}
            </p>

            <p>
                Final Value:
                RM ${balance.toFixed(2)}
            </p>

            <p>
                Investment Profit:
                RM ${(balance - totalInvested).toFixed(2)}
            </p>
        `;


        // Display table
        monthlyResult.innerHTML =
            tableHTML;
    }


    // ==========================================
    // SHOW FIRST RETURN RATE
    // ==========================================

    showMonthlyDetails(
        Number(returnSelector.value)
    );


    // ==========================================
    // CHANGE RETURN RATE
    // ==========================================

    returnSelector.addEventListener(
        "change",
        function() {

            const selectedRate =
                Number(returnSelector.value);


            showMonthlyDetails(
                selectedRate
            );
        }
    );


    // ==========================================
    // BACK BUTTON
    // ==========================================

    backButton.addEventListener(
        "click",
        function() {

            window.location.href =
                "calculator.html";
        }
    );

    graphButton.addEventListener(
    "click",
    function() {

        window.location.href =
            "graph.html";

    }
);

homeButton.addEventListener(
    "click",
    function() {

        window.location.href =
            "index.html";

    }
);

}