//Construction
const { useState, useEffect } = React;

const LiveValue = () => {
  const CPM_VALUE = 0.1356226

  const [formValue, setFormValue] = useState(0);
  const [cpmIncrease, setCpmIncrease] = useState(1000);
  const [newCpmIncrease, setNewCpmIncrease] = useState({
    cpmBlance: 1000,
    usdBlance: 100,
  });


  const [currentState, setCurrentState] = useState("")
  const [currentAmount, setCurrentAmount] = useState(0)
  // Crypto Value State
  const [ETH, setETH] = useState(0)
  const [BNB, setBNB] = useState(0)
  const [BTC, setBTC] = useState(0)
  const handleForm = (e) => {
    setCurrentState(e.target.value)

  };


  // Todo: Fetch Data
  useEffect(() => {
    axios({
      method: "get",
      url: "https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest",
      headers: {
        "X-CMC_PRO_API_KEY": "f836f93b-6ac2-4e0d-8010-ee59b9033da9",
      },
    }).then(function (res) {
      res.data.data.forEach(item => {
        let price = item.quote.USD.price
        // Todo: if match ETH
        if (item.symbol.toUpperCase() === "ETH") {
          setETH(price)
        }

        // Todo: if match BNB
        if (item.symbol.toUpperCase() === "BNB") {
          setBNB(price)
        }

        // Todo: if match BTC
        if (item.symbol.toUpperCase() === "BTC") {
          setBTC(price)
        }
      })

    });
  }, [currentState])

  // Todo: Calculate Crypto Conversion
  useEffect(() => {

    // Check: if match CPM-ETH
    if (currentState === "CPM-ETH") {
      cpmToETH()
    }

    // Check: if match CPM-USD
    if (currentState === "CPM-USD") {
      cpmToUSD()
    }

    // Check: if match CPM-BNB
    if (currentState === "CPM-BNB") {
      cpmToBNB()
    }

    // Check: if match CPM-BTC
    if (currentState === "CPM-BTC") {
      cpmToBTC()
    }

    // Check: if match ETH-USD
    if (currentState === "ETH-USD") {
      ethToUSD()
    }

    // Check: if match ETH-CPM
    if (currentState === "ETH-CPM") {
      ethToCPM()
    }

    // Check: if match BTC-USD
    if (currentState === "BTC-USD") {
      btcToUSD()
    }

    // Check: if match BTC-CPM
    if (currentState === "BTC-CPM") {
      btcToCPM()
    }

  }, [currentState, formValue])

  // Todo: Big Data Calculate

  // cpmToETH
  function cpmToETH() {
    let CPM_USD = CPM_VALUE * Number(formValue)
    let GET_ETH_BY_ONE_USD = 1 / Number(ETH)
    let result = CPM_USD * GET_ETH_BY_ONE_USD
    setCurrentAmount(result)
  }

  // cpmToUSD
  function cpmToUSD() {
    let result = CPM_VALUE * Number(formValue)
    setCurrentAmount(result)
  }

  // cpmToBNB
  function cpmToBNB() {
    let CPM_USD = CPM_VALUE * Number(formValue)
    let GET_BNB_BY_ONE_USD = 1 / Number(BNB)
    let result = CPM_USD * GET_BNB_BY_ONE_USD
    setCurrentAmount(result)
  }

  // cpmToBTC
  function cpmToBTC() {
    let CPM_USD = CPM_VALUE * Number(formValue)
    let GET_BTC_BY_ONE_USD = 1 / Number(BTC)
    let result = CPM_USD * GET_BTC_BY_ONE_USD
    setCurrentAmount(result)
  }

  // ethToUSD
  function ethToUSD() {
    let result = ETH * Number(formValue)
    setCurrentAmount(result)
  }

  // ethToCPM
  function ethToCPM() {
    let ETH_USD = ETH * Number(formValue)
    let GET_CPM_BY_ONE_USD = 1 / Number(CPM_VALUE)
    let result = ETH_USD * GET_CPM_BY_ONE_USD
    setCurrentAmount(result)
  }

  // btcToUSD
  function btcToUSD() {
    let result = BTC * Number(formValue)
    setCurrentAmount(result)
  }

  // btcToCPM
  function btcToCPM() {
    let BTC_USD = BTC * Number(formValue)
    let GET_CPM_BY_ONE_USD = 1 / Number(CPM_VALUE)
    let result = BTC_USD * GET_CPM_BY_ONE_USD
    setCurrentAmount(result)
  }

  return (
    <section id="cpm_live_value" style={{ maxWidth: "750px", margin: "auto" }}>
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="coin_form mb-4 m-auto w-sm-100 ">
              <div style={{ borderRadius: "5px" }}>
                <div
                  className="form_header text-center p-3 text-center"
                  style={{
                    border: "1px solid gray",
                    background: "black",
                    color: "white",
                  }}
                >
                  <h3>CPM Coin Value</h3>
                  <h4>1 CPM COIN = $0.0674103</h4>
                </div>
                <form action="" className="currency-convertor p-5 ">
                  <h5>Currency Convertor</h5>
                  <h6 className="pt-3">Exchange-symbol</h6>
                  <select
                    class="form-select form-select-md mb-3"
                    aria-label=".form-select-lg example"
                    style={{ cursor: "pointer" }}
                    onChange={handleForm}                  >

                    <option value="">Select One</option>
                    <option value="CPM-ETH">CPM-ETH</option>
                    <option value="CPM-USD">CPM-USD</option>
                    <option value="CPM-BNB">CPM-BNB</option>
                    <option value="CPM-BTC">CPM-BTC</option>
                    <option value="ETH-USD">ETH-USD</option>
                    <option value="ETH-CPM">ETH-CPM</option>
                    <option value="BTC-USD">BTC-USD</option>
                    <option value="BTC-CPM">BTC-CPM</option>
                    
                  </select>



                  <div className="row cpm-description ">
                    <div className="col-md-6">
                      <h5>I have:</h5>
                      <p>
                        {currentState.split("-")[0]}
                      </p>
                      <span className="amount">Amount:</span> <br />
                      <input
                        type="number"
                        name=""
                        className="form-control w-75 mt-1"
                        id=""
                        value={formValue}
                        onChange={(e) =>
                          setFormValue(e.target.value)
                        }
                      />
                    </div>
                    <div className="col-md-6">
                      <h5>I want:</h5>
                      <p>
                        {currentState.split("-")[1]}
                      </p>
                      <span className="amount ">Amount:</span>

                      <h6
                        class="input_design w-75 mt-1"
                        style={{ borderRadius: "2px" }}
                      >
                        {currentAmount}
                      </h6>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>



      {/* ------------ISecond Part----------- */}

      <div id="cpm_evolution" className="mb-5 mx-2">
        <div className="container">
          <div className="row ">
            <div className="coin_form mb-5 m-auto w-100 text-center px-5 ">
              <h4 className="pt-3" style={{ color: "#757171" }}>
                CPM Evolution
              </h4>
              <p>
                step 1:{" "}
                <span className="main">Your Current CPM Coin Balnace is :</span>
              </p>
              <div className="row">
                <div className="col-md-6">
                  <h5>CPM Coin (CPM)</h5>
                  <input
                    type="text"
                    name=""
                    id=""
                    value={cpmIncrease}
                    onChange={(e) => setCpmIncrease(e.target.value)}
                    className="form-control"
                  />
                </div>
                <div className="col-md-6">
                  <h5>American Dollar (USD)</h5>
                  <h4 className="amount-h">
                    $ {(cpmIncrease * 0.0678113).toFixed(2)}
                  </h4>
                </div>
              </div>
              <div className="step-2 row mt-5">
                <p className="mt-2  px-2">
                  step 2:{" "}
                  <span className="main">
                    Your New CPM Coin value if it increase at:
                  </span>
                </p>
                <div className="row">
                  <div className="col-md-6">
                    <h5>Your CPM Balance</h5>
                    <input
                      type="text"
                      name=""
                      id=""
                      className="form-control  "
                      value={newCpmIncrease.cpmBlance}
                      onChange={(e) =>
                        setNewCpmIncrease({
                          ...newCpmIncrease,
                          cpmBlance: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="col-md-6">
                    <h5>CPM Increase at (USD) $:</h5>
                    <input
                      type="text"
                      name=""
                      id=""
                      className="form-control "
                      value={newCpmIncrease.usdBlance}
                      onChange={(e) =>
                        setNewCpmIncrease({
                          ...newCpmIncrease,
                          usdBlance: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="bottom text-center mb-3">
          <div className="first">
            <h5 className="proc">Progression %</h5>
            <h4 className="usd_cpm">$ 0.00 %</h4>
          </div>
          <div className="second pt-4 pb-2">
            <h5 className="proc">New Balance USD</h5>
            <h4 className="usd_cpm">
              ${" "}
              {(
                newCpmIncrease.cpmBlance * newCpmIncrease.usdBlance
              ).toLocaleString("en-US")}
            </h4>
          </div>
        </div>
      </div>
    </section>
  );
};

// APP
const App = () => (
  <div className="container mt-4">
    <LiveValue />
  </div>
);

ReactDOM.render(<App />, document.querySelector("#root"));
