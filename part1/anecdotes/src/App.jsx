import { useState } from "react";

const anecdotes = [
  "If it hurts, do it more often.",
  "Adding manpower to a late software project makes it later!",
  "The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
  "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
  "Premature optimization is the root of all evil.",
  "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
  "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
  "The only way to go fast, is to go well.",
];

const App = () => {
  const [selected, setSelected] = useState(0);

  const [votos, setvotos] = useState(new Array(anecdotes.length).fill(0));

  const handdelClick = () => {
    setSelected(Math.floor(Math.random() * anecdotes.length));
  };

  const handdleVotos = () => {
    const copia = [...votos];

    copia[selected] += 1;

    setvotos(copia);
  };

  const maxVotos = Math.max(...votos);
  const indiceGanador = votos.indexOf(maxVotos);

  return (
    <div>
      <h2>Anecdote</h2>
      <h3>{anecdotes[selected]}</h3>
      <h3>Votos: {votos[selected]}</h3>

      <button onClick={handdleVotos}>Vote</button>
      <button onClick={handdelClick}>Next Anecdote</button>
      <h2>Anecdota con mas votos</h2>
      <h3>{anecdotes[indiceGanador]} </h3>
      <h3></h3>
    </div>
  );
};

export default App;
