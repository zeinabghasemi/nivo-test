import "./App.css";
import Appbar from "../Appbar/Appbar";
import Transaction from "../Transaction/Transaction";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Appbar />
        <div className="App-body">
          <div className="App-section">
            <Transaction />
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;
