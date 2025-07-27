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

  const currency_formatter = Intl.NumberFormat("en-US", {
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
    console.log(infos);
  };

  const handle_radio_change = (e) => {
    setInfos((prev) => {
      return {
        ...prev,
        type: e.target.id,
      };
    });
    console.log(infos);
  };

  const handle_submit = (e) => {
    e.preventDefault();

    let type = infos["type"];

    if (type === "repayment") {
      const amount = infos["amount"];
      const interestRate = infos["interest"] / 100 / 12;
      const months = infos["term"] * 12;

      const repayment =
        (amount * (interestRate * Math.pow(1 + interestRate, months))) /
        (Math.pow(1 + interestRate, months) - 1);

      console.log(repayment.toFixed(2)); // → 1797.74
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
              <div className="amount_input_wrapper">
                <span>£</span>
                <input
                  type="number"
                  onChange={handle_change}
                  name="amount"
                  value={infos["amount"]}
                  required
                />
              </div>
            </div>

            <div className="mortgage_info_wrapper">
              <div className="term_wrapper">
                <label htmlFor="term">Mortgage Term</label>
                <div className="input_wrapper">
                  <input
                    type="number"
                    onChange={handle_change}
                    name="term"
                    value={infos["term"]}
                    required
                  />
                  <span>years</span>
                </div>
              </div>

              <div className="interest_wrapper">
                <label htmlFor="interest">Interest Rate</label>
                <div className="input_wrapper">
                  <input
                    type="number"
                    onChange={handle_change}
                    name="interest"
                    value={infos["interest"]}
                    required
                  />
                  <span>%</span>
                </div>
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
                  required
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
                  required
                />
                <span>Interest Only</span>
              </label>
            </div>

            <button className="submit_btn">
              <img src={icon_calculator} alt="Icon Calculator" />
              Calculate Repayments
            </button>
          </form>
        </section>

        <section className="infos_main">
          {/* Form not submitted */}
          <img src={illustration_empty} alt="Illustration Empty" />
          <h1>Results shown here</h1>
          <p>
            Complete the form and click "calculate repayments" to see what your
            monthly repayments would be.
          </p>
        </section>
      </main>
    </>
  );
}

export default App;
