import { useState } from "react";

const StatisticTableLine = ({ text, value }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  );
};

const StaticTable = ({ good, neutral, bad, alls, average, positive }) => {
  return (
    <table>
      <tbody>
        <StatisticTableLine text={"Good"} value={good} />
        <StatisticTableLine text={"Neutral"} value={neutral} />
        <StatisticTableLine text={"Bad"} value={bad} />
        <StatisticTableLine text={"Alls"} value={alls} />
        <StatisticTableLine text={"Average"} value={average} />
        <StatisticTableLine text={"Positive"} value={positive + "%"} />
      </tbody>
    </table>
  );
};

const Statistics = ({ good, neutral, bad }) => {
  const alls = bad + neutral + good;
  const average = alls === 0 ? 0 : (good - bad) / alls;
  const positive = alls === 0 ? 0 : (good / alls) * 100;

  if (alls === 0) {
    return <h2>No feedback given</h2>;
  } else
    return (
      <div>
        <h2>Stadistics</h2>
        <StaticTable
          good={good}
          neutral={neutral}
          bad={bad}
          alls={alls}
          average={average}
          positive={positive}
        />
      </div>
    );
};

const App = () => {
  // guarda los clics de cada botón en su propio estado
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <div>
      <h1>Unicafe</h1>
      <h2>Give feedback</h2>
      <button onClick={() => setGood(good + 1)}>Good</button>
      <button onClick={() => setNeutral(neutral + 1)}>Neutral</button>
      <button onClick={() => setBad(bad + 1)}>Bad</button>

      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
};

export default App;
