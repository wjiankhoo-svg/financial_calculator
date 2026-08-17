
// ==========================================
// GET HTML ELEMENTS
// ==========================================

const targetAmountInput =
    document.getElementById(
        "targetAmount"
    );


const targetInitialInvestmentInput =
    document.getElementById(
        "targetInitialInvestment"
    );


const currentMonthlyInvestmentInput =
    document.getElementById(
        "currentMonthlyInvestment"
    );


const targetInvestmentPeriodInput =
    document.getElementById(
        "targetInvestmentPeriod"
    );

    const targetInvestmentPeriodUnitInput =
    document.getElementById(
        "targetInvestmentPeriodUnit"
    );


const targetReturnInput =
    document.getElementById(
        "targetReturn"
    );


const targetCalculateButton =
    document.getElementById(
        "targetCalculateButton"
    );


const targetResult =
    document.getElementById(
        "targetResult"
    );


const backButton =
    document.getElementById(
        "backButton"
    );

// ==========================================
// CALCULATE FINAL VALUE
// ==========================================

function calculateFinalValue(
    initialInvestment,
    monthlyInvestment,
    annualReturn,
    totalMonths
) {

    // Convert annual return to decimal
    const annualRate =
        annualReturn / 100;


    // Convert annual rate to monthly rate
    const monthlyRate =
        annualRate / 12;


    // Convert years to months
    //const totalMonths =investmentPeriod * 12;


    // Start with initial investment
    let balance =
        initialInvestment;


    // Calculate month by month
    for (
        let month = 1;
        month <= totalMonths;
        month++
    ) {

        // Calculate monthly profit
        const monthlyProfit =
            balance * monthlyRate;


        // Round monthly profit
        const roundedProfit =
            Number(
                monthlyProfit.toFixed(2)
            );


        // Add profit
        balance =
            balance + roundedProfit;


        // Add monthly investment
        balance =
            balance + monthlyInvestment;


        // Round balance
        balance =
            Number(
                balance.toFixed(2)
            );
    }


    return balance;
}

// ==========================================
// FIND REQUIRED MONTHLY INVESTMENT
// USING BINARY SEARCH
// ==========================================

function findRequiredMonthlyInvestment(
    targetAmount,
    initialInvestment,
    annualReturn,
    totalMonths
    //investmentPeriod
) {

    let low = 0;

    let high = targetAmount;


    // Keep searching until
    // the difference is less than RM0.01

    while (
        high - low > 0.01
    ) {

        const middle =
            (low + high) / 2;


        const finalValue =
            calculateFinalValue(
                initialInvestment,
                middle,
                annualReturn,
                 totalMonths
                 //investmentPeriod
            );


        if (
            finalValue >= targetAmount
        ) {

            // Monthly investment is
            // enough, so try lower
            high = middle;

        }
        else {

            // Monthly investment is
            // not enough, so try higher
            low = middle;

        }
    }


    // Round up to nearest cent
    return Number(
        high.toFixed(2)
    );
}

// ==========================================
// CALCULATE TARGET
// ==========================================

targetCalculateButton.addEventListener(
    "click",
    function() {

        // ==================================
        // GET USER INPUT
        // ==================================

        const targetAmount =
            Number(
                targetAmountInput.value
            );


        const initialInvestment =
            Number(
                targetInitialInvestmentInput.value
            );


        const currentMonthlyInvestment =
            Number(
                currentMonthlyInvestmentInput.value
            );


        const investmentPeriod =
            Number(
                targetInvestmentPeriodInput.value
            );

        const investmentPeriodUnit =
    targetInvestmentPeriodUnitInput.value;


        const annualReturn =
            Number(
                targetReturnInput.value
            );

        let totalMonths;


if (investmentPeriodUnit === "years") {

    totalMonths =
        investmentPeriod * 12;

}
else {

    totalMonths =
        investmentPeriod;

}


        // ==================================
        // VALIDATION
        // ==================================

        // ==========================================
        // TARGET AMOUNT VALIDATION
        // ==========================================

        if (
            !Number.isFinite(targetAmount) ||
            targetAmount <= 0
        ) {

            alert(
                "Target Amount must be greater than 0."
            );

            return;
        }

        // ==========================================
        // INITIAL INVESTMENT VALIDATION
        // ==========================================
                
        if (
            !Number.isFinite(initialInvestment) ||
            initialInvestment < 0
        ) {

            alert(
                "Please enter a valid Initial Investment."
            );

            return;
        }

        // ==========================================
        // MONTHLY INVESTMENT VALIDATION
        // ==========================================

        if (
            !Number.isFinite(currentMonthlyInvestment) ||
            currentMonthlyInvestment < 0
        ) {

            alert(
                "Please enter a valid Monthly Investment."
            );

            return;
        }

        // ==========================================
// INVESTMENT PERIOD VALIDATION
// ==========================================

if (
    !Number.isFinite(investmentPeriod) ||
    investmentPeriod <= 0
) {

    alert(
        "Investment Period must be greater than 0."
    );

    return;
}



        // ==========================================
        // EXPECTED RETURN VALIDATION
        // ==========================================

        if (
            !Number.isFinite(annualReturn) ||
            annualReturn < 0
        ) {

            alert(
                "Expected Return cannot be negative."
            );

            return;
        }

        // if (
        //     targetAmount <= 0 ||
        //     initialInvestment < 0 ||
        //     currentMonthlyInvestment < 0 ||
        //     investmentPeriod <= 0 ||
        //     annualReturn < 0
        // ) {

        //     alert(
        //         "Please enter valid values."
        //     );

        //     return;
        // }


        // ==================================
        // INITIAL INVESTMENT CHECK
        // ==================================

        if (
            initialInvestment >= targetAmount
        ) {

            alert(
                "Your initial investment already reaches your target."
            );

            return;
        }


        // ==================================
        // FIND REQUIRED MONTHLY INVESTMENT
        // ==================================

        const requiredMonthlyInvestment =
            findRequiredMonthlyInvestment(
                targetAmount,
                initialInvestment,
                annualReturn,
                totalMonths
                  //investmentPeriod
            );


        // ==================================
        // CALCULATE CURRENT PLAN
        // ==================================

        const currentFinalValue =
            calculateFinalValue(
                initialInvestment,
                currentMonthlyInvestment,
                annualReturn,
                  totalMonths
                  //investmentPeriod
            );


        // ==================================
        // CALCULATE DIFFERENCE
        // ==================================

        const monthlyDifference =
            requiredMonthlyInvestment -
            currentMonthlyInvestment;

        // ==========================================
// DETERMINE MONTHLY STATUS
// ==========================================

let monthlyStatus = "";


if (monthlyDifference > 0) {

    monthlyStatus = `
        <p>
            Monthly Shortfall:
            <strong>
                RM ${monthlyDifference.toFixed(2)}
                more per month
            </strong>
        </p>
    `;

}
else if (monthlyDifference < 0) {

    const monthlySurplus =
        Math.abs(monthlyDifference);

    monthlyStatus = `
        <p>
            Monthly Surplus:
            <strong>
                RM ${monthlySurplus.toFixed(2)}
                above required amount
            </strong>
        </p>
    `;

}
else {

    monthlyStatus = `
        <p>
            <strong>
                You are exactly on track.
            </strong>
        </p>
    `;
}


        // ==================================
        // DISPLAY RESULT
        // ==================================

        const periodText =
    investmentPeriodUnit === "years"
        ? `${investmentPeriod} years`
        : `${investmentPeriod} months`;

        targetResult.innerHTML = `

            <div class="target-result-card">

                <h4>
                    Your Target Plan
                </h4>


                <div class="target-result-item">

            <span>
                Target Amount
            </span>

            <strong>
                RM ${targetAmount.toFixed(2)}
            </strong>

        </div>


                <div class="target-result-item">

            <span>
                Investment Period
            </span>

            <strong>
                ${periodText}
            </strong>

        </div>

                 <div class="target-result-item">

            <span>
                Expected Return
            </span>

            <strong>
                ${annualReturn}%
            </strong>

        </div>



                <div class="required-investment">

            <span>
                Required Monthly Investment
            </span>

            <strong>
                RM ${requiredMonthlyInvestment.toFixed(2)}
            </strong>

        </div>

    </div>

    <div class="target-result-card">

        <h3>
            Your Current Plan
        </h3>



                <div class="target-result-item">

            <span>
                Current Monthly Investment
            </span>

            <strong>
                RM ${currentMonthlyInvestment.toFixed(2)}
            </strong>

        </div>


        <div class="target-result-item">

            <span>
                Expected Final Value
            </span>

            <strong>
                RM ${currentFinalValue.toFixed(2)}
            </strong>

        </div>


        <div class="monthly-difference">

            <span>
                Monthly Shortfall / Surplus
            </span>

            <strong>
                RM ${monthlyDifference.toFixed(2)}
            </strong>

            
                ${monthlyStatus}
            

        </div>

    </div>

`;
               
    }
);

// ==========================================
// BACK TO CALCULATOR
// ==========================================

backButton.addEventListener(
    "click",
    function() {

        window.location.href =
            "index.html";

    }
);