# financial_calculator

Investment Calculator
│
├── 1. Goal Calculator
│      ├── Target amount
│      ├── Current savings
│      ├── Monthly investment
│      ├── Expected return
│      └── Investment period
│
├── 2. Compound Interest Calculator
│      ├── Compare different returns
│      ├── 3%
│      ├── 5%
│      ├── 7%
│      └── 10%
│
├── 3. Investment Comparison
│      ├── Investment A
│      ├── Investment B
│      ├── Investment C
│      └── Compare final returns
│
└── 4. Target vs Reality
       ├── Target
       ├── Actual savings
       ├── Actual return
       ├── Projected value
       └── Gap to target

# ############################################################ #

Phase 1 — Basic Compound Interest Calculator

# investment-calculator/
│
├── index.html
├── style.css
└── script.js

Phase 2 — Compound Interest + Monthly Investment

Phase 3 — Compare Different Investment Returns
        — Actual Calculation + Comparison Result

# How many returns do you want to compare?How many returns do you want to compare?
# Add a "View Details" page

Phase 4 - show the detail of each month at differet html

Phase 5 — improve the UI + add a portfolio growth chart.
│
├── 5.1  Improve summary result
│
├── 5.2  Improve monthly detail table
│
├── 5.3  Add portfolio growth chart
│
└── 5.4  Make the chart respond to different return rates

Phase 6 — Separate Details and Graph

Phase 7 — Target Calculator:
│
├── 7.4 — Why did I add "Current Monthly Investment"?
          This is important because of your original idea. 
          We don't just want: "How much do I need?"
          We also want: "Am I currently on track?


                 Find monthly investment
                          │
                          ↓
              ┌────────────────────┐
              │ low = RM0           │
              │ high = target       │
              └─────────┬──────────┘
                        ↓
                  Find middle
                        ↓
               Calculate final value
                        ↓
              Does it reach target?
                  /           \
                YES            NO
                 ↓              ↓
          Search LOWER     Search HIGHER
                 │              │
                 └──────┬───────┘
                        ↓
                  Repeat again
                        ↓
               Difference < RM0.01
                        ↓
                Return `high`


Phase 8 - let user to choose how many year they want to calculate
        - also need like can go bck calculator or go view graph, bck to calculator or view detail

