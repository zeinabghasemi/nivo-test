import "./App.css";
import Appbar from "./components/Appbar";
import Tabbar from "./components/Tabbar";
import Transaction from "./components/Transaction/Transaction";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Appbar />
        <div className="App-body">
          <div className="App-section">
            {/* <Tabbar/> */}
            <Transaction/>
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;
