// Hooks
import { useState } from "react";

// Utils
import "./App.css";

// Images
import icon_calculator from "./assets/images/icon-calculator.svg";
import illustration_empty from "./assets/images/illustration-empty.svg";

function App() {
  const [infos, setInfos] = useState({
    amount: "",
    term: "",
    interest: "",
    type: "",
  });
  const [monthlyRepayment, setMonthlyRepayment] = useState("");
  const [totalRepayment, setTotalRepayment] = useState("");
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [errors, setErrors] = useState({
    amount: false,
    term: false,
    interest: false,
    type: false,
  });

  const currency_formatter = Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
  });

  const clear_all = () => {
    setInfos({
      amount: "",
      term: "",
      interest: "",
      type: "",
    });

    const radios = document.querySelectorAll('input[name="mortgage_type"]');
    radios.forEach((radio) => {
      radio.checked = false;
    });
  };

  const handle_change = (e) => {
    setInfos((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };

  const handle_radio_change = (e) => {
    setInfos((prev) => {
      return {
        ...prev,
        type: e.target.id,
      };
    });
  };

  const handle_submit = (e) => {
    e.preventDefault();

    const new_errors = {
      amount: infos.amount === "",
      term: infos.term === "",
      interest: infos.interest === "",
      type: infos.type === "",
    };

    setErrors(new_errors);

    const has_errors = Object.values(new_errors).some((v) => v);
    if (has_errors) return;

    const type = infos["type"];
    const amount = infos["amount"].replace(".", "").trim(); // valor emprestado
    const interest_rate = infos["interest"]; // taxa de juros
    const months = infos["term"] * 12; // total de meses

    if (type === "repayment") {
      const monthly_fee = interest_rate / 1200;

      const monthly_repayment =
        (amount * (monthly_fee * Math.pow(1 + monthly_fee, months))) /
        (Math.pow(1 + monthly_fee, months) - 1);

      const total_monthly_repayment = monthly_repayment * months;

      setMonthlyRepayment(currency_formatter.format(monthly_repayment));
      setTotalRepayment(currency_formatter.format(total_monthly_repayment));
      setFormSubmitted(true);
    }

    if (type === "interest_only") {
      const monthly_interest = (amount * interest_rate) / 1200;
      const total_interest = monthly_interest * months;

      setMonthlyRepayment(currency_formatter.format(monthly_interest));
      setTotalRepayment(currency_formatter.format(total_interest));
      setFormSubmitted(true);
    }
  };

  return (
    <>
      <main>
        <section className="calculator_main">
          <header>
            <h1>Mortgage Calculator</h1>
            <button onClick={clear_all}>Clear All</button>
          </header>

          <form onSubmit={handle_submit}>
            <div className="amount_wrapper">
              <label htmlFor="amount">Mortgage Amount</label>
              <div
                className={`amount_input_wrapper ${
                  errors.amount ? "input_error" : ""
                }`}
              >
                <span>£</span>
                <input
                  type="number"
                  name="amount"
                  onChange={handle_change}
                  value={infos["amount"]}
                />
              </div>
              {errors.amount && (
                <p className="error_message">This field is required</p>
              )}
            </div>

            <div className="mortgage_info_wrapper">
              <div className="term_wrapper">
                <label htmlFor="term">Mortgage Term</label>
                <div
                  className={`input_wrapper ${
                    errors.term ? "input_error" : ""
                  }`}
                >
                  <input
                    type="number"
                    onChange={handle_change}
                    name="term"
                    value={infos["term"]}
                  />
                  <span>years</span>
                </div>
                {errors.term && (
                  <p className="error_message">This field is required</p>
                )}
              </div>

              <div className="interest_wrapper">
                <label htmlFor="interest">Interest Rate</label>
                <div
                  className={`input_wrapper ${
                    errors.interest ? "input_error" : ""
                  }`}
                >
                  <input
                    type="number"
                    onChange={handle_change}
                    name="interest"
                    value={infos["interest"]}
                  />
                  <span>%</span>
                </div>
                {errors.interest && (
                  <p className="error_message">This field is required</p>
                )}
              </div>
            </div>

            <div className="mortgage_type_wrapper">
              <p>Mortgage Type</p>
              <label className="type_label">
                <input
                  type="radio"
                  name="mortgage_type"
                  onChange={handle_radio_change}
                  id="repayment"
                  value={infos["type"]}
                />
                <span>Repayment</span>
              </label>
              <label className="type_label">
                <input
                  type="radio"
                  name="mortgage_type"
                  onChange={handle_radio_change}
                  id="interest_only"
                  value={infos["type"]}
                />
                <span>Interest Only</span>
              </label>
              {errors.type && (
                <p className="error_message">This field is required</p>
              )}
            </div>

            <button className="submit_btn">
              <img src={icon_calculator} alt="Icon Calculator" />
              Calculate Repayments
            </button>
          </form>
        </section>

        <section className="infos_main">
          {formSubmitted != true ? (
            <>
              <img src={illustration_empty} alt="Illustration Empty" />
              <h1>Results shown here</h1>
              <p>{monthlyRepayment}</p>
              <p>{totalRepayment}</p>
              <p>
                Complete the form and click "calculate repayments" to see what
                your monthly repayments would be.
              </p>
            </>
          ) : (
            <div className="results_container">
              <h2>Your results</h2>
              <p>
                Your results are shown below based on the information you
                provided. To adjust the results, edit the form and click
                "calculate repayments" again.
              </p>

              <div className="results_shown">
                <div className="separator"></div>
                <p>Your monthly repayments</p>
                <h1>{monthlyRepayment}</h1>

                <hr />

                <p>Total you'll repay over the term</p>
                <h2>{totalRepayment}</h2>
              </div>
            </div>
          )}
        </section>
      </main>
    </>
  );
}

export default App;
