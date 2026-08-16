

// ==========================================
// GET SAVED DATA
// ==========================================

const savedData =
    localStorage.getItem("investmentData");


if (!savedData) {

    document.body.innerHTML = `

        <h1>No Investment Data Found</h1>

        <p>
            Please calculate your investment
            first.
        </p>

    `;

}
else {

    const investmentData =
        JSON.parse(savedData);


    // ==========================================
    // GET HTML ELEMENTS
    // ==========================================

    const investmentChart =
        document.getElementById(
            "investmentChart"
        );


    const backButton =
        document.getElementById(
            "backButton"
        );

    const detailButton =
    document.getElementById(
        "detailButton"
    );


    // ==========================================
    // CHART DATA
    // ==========================================

    const datasets = [];

        // ==========================================
    // CALCULATE EACH RETURN RATE
    // ==========================================

    for (
        let rate of investmentData.returnRates
    ) {

        // Annual return
        const annualRate =
            rate / 100;


        // Monthly return
        const monthlyRate =
            annualRate / 12;


        // Total months
        const totalMonths =
            investmentData.investmentPeriod * 12;


        // Starting balance
        let balance =
            investmentData.initialInvestment;


        // Store balance for every month
        const chartValues = [];


        // ==========================================
        // MONTHLY CALCULATION
        // ==========================================

        for (
            let month = 1;
            month <= totalMonths;
            month++
        ) {

            // Calculate monthly profit
            const monthlyProfit =
                balance * monthlyRate;


            // Round profit to 2 decimals
            const roundedProfit =
                Number(
                    monthlyProfit.toFixed(2)
                );


            // Add profit
            balance =
                balance + roundedProfit;


            // Add monthly investment
            balance =
                balance +
                investmentData.monthlyInvestment;


            // Round ending balance
            balance =
                Number(
                    balance.toFixed(2)
                );


            // Save balance
            chartValues.push(balance);
        }


        // ==========================================
        // CREATE DATASET
        // ==========================================

        datasets.push({

            label:
                rate + "% Return",

            data:
                chartValues,

            tension: 0.2,

            fill: false

        });
    }

        // ==========================================
    // CREATE MONTH LABELS
    // ==========================================

    const totalMonths =
        investmentData.investmentPeriod * 12;


    const labels = [];


    for (
        let month = 1;
        month <= totalMonths;
        month++
    ) {

        labels.push(
            month
        );
    }


    // ==========================================
    // CREATE CHART
    // ==========================================

    new Chart(
        investmentChart,
        {

            type: "line",

            data: {

                labels:
                    labels,

                datasets:
                    datasets
            },


            options: {

                responsive: true,


                plugins: {

                    title: {

                        display: true,

                        text:
                            "Investment Growth Comparison"
                    }

                },


                scales: {

                    x: {

                        title: {

                            display: true,

                            text:
                                "Month"
                        }

                    },


                    y: {

                        title: {

                            display: true,

                            text:
                                "Portfolio Value (RM)"
                        }

                    }

                }

            }

        }
    );


    // ==========================================
    // BACK BUTTON
    // ==========================================

    backButton.addEventListener(
        "click",
        function() {

            window.location.href =
                "index.html";

        }
    );

    // ==========================================
// VIEW DETAILS
// ==========================================

detailButton.addEventListener(
    "click",
    function() {

        window.location.href =
            "detail.html";

    }
);

}