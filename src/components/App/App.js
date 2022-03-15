import "./App.css";
import Appbar from "../Appbar/Appbar";
import Transaction from "../Transaction/Transaction";
import moment from "moment-jalaali";

const faMonths = [
  'فروردین',
  'اردیبهشت',
  'خرداد',
  'تیر',
  'مرداد',
  'شهریور',
  'مهر',
  'آبان',
  'آذر',
  'دی',
  'بهمن',
  'اسفند',
];

function App() {
  console.log(moment(new Date("12-01-2022")).month()); // 0 - 11
  console.log(moment(new Date("12-01-2022")).format('jYYYY/jMM/jDD'));
  console.log(moment(Date.now()).format('jYYYY/jMM/jDD'));
  const currentJalaliMonth = Number(moment(Date.now()).format('jMM'));
  const currentJalaliYear = Number(moment(Date.now()).format('jYYYY'));
  console.log(currentJalaliMonth); // 1 - 12

  let monthHead = currentJalaliMonth;
  let yearHead = currentJalaliYear;

  function nextMonth() {
    if (monthHead < 12) {
      monthHead = monthHead + 1;
    } else {
      yearHead = yearHead + 1;
      monthHead = 1;
    }
  }

  function prevMonth() {
    if (monthHead > 1) {
      monthHead = monthHead - 1;
    } else {
      yearHead = yearHead - 1;
      monthHead = 12;
    }
  }

  function get3Month() {
    return [
      monthHead == 1 ? 12 : monthHead - 1,
      monthHead,
      monthHead == 12 ? 1 : monthHead + 1,
    ];
  }

  function getFaMonth(m) {
    return faMonths[m - 1];
  }

  const [mBefore, mCurrent, mNext] = get3Month();

  console.log(getFaMonth(mBefore))
  console.log(getFaMonth(mCurrent))
  console.log(getFaMonth(mNext))

  return (
    <div className="App">
      <header className="App-header">
        {/* <Appbar /> */}
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
