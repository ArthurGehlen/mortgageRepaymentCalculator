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
            <h2>Mortgage Calculator</h2>
            <button>Clear All</button>
          </header>

          <form action="#">
            <div className="amount_wrapper">
              <label htmlFor="amount">Morgage Amount</label>
              <div className="input_wrapper">
                <span>£</span>
                <input type="text" name="" id="" />
              </div>
            </div>

            <div className="mortgage_info_wrapper">
              <div className="amount_wrapper">
                <label htmlFor="amount">Morgage Amount</label>
                <div className="input_wrapper">
                  <input type="text" name="" id="" />
                  <span>years</span>
                </div>
              </div>

              <div className="amount_wrapper">
                <label htmlFor="amount">Morgage Amount</label>
                <div className="input_wrapper">
                  <input type="text" name="" id="" />
                  <span>%</span>
                </div>
              </div>
            </div>

            <div className="mortgage_type_wrapper">
              <button>
                <input type="radio" name="mortgage_type" />
                Repayment
              </button>
              <button>
                <input type="radio" name="mortgage_type" />
                Interest Only
              </button>
            </div>

            <button>
              <img src={icon_calculator} alt="Icon Calculator" />
              Calculate Repayment
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
