// Utils
import "./App.css";

// Images
import icon_calculator from "./assets/images/icon-calculator.svg";
import illustration_empty from "./assets/images/illustration-empty.svg";

function App() {
  return (
    <>
      <main>
        <section className="calculator_main">
          <header>
            <h1>Mortgage Calculator</h1>
            <button>Clear All</button>
          </header>

          <form action="#">
            <div className="amount_wrapper">
              <label htmlFor="amount">Mortgage Amount</label>
              <div className="amount_input_wrapper">
                <span>£</span>
                <input type="text" name="" id="" />
              </div>
            </div>

            <div className="mortgage_info_wrapper">
              <div className="term_wrapper">
                <label htmlFor="term">Mortgage Term</label>
                <div className="input_wrapper">
                  <input type="text" name="term" id="term" />
                  <span>years</span>
                </div>
              </div>

              <div className="interest_wrapper">
                <label htmlFor="interest">Interest Rate</label>
                <div className="input_wrapper">
                  <input type="text" name="interest" id="interest" />
                  <span>%</span>
                </div>
              </div>
            </div>

            <div className="mortgage_type_wrapper">
              <p>Mortgage Type</p>
              <label className="type_label">
                <input type="radio" name="mortgage_type" />
                <span>Repayment</span>
              </label>
              <label className="type_label">
                <input type="radio" name="mortgage_type" />
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
