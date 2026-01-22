import CountrieInfo from "./CountrieInfo";

const Countries = ({ countrie, individual, handdleButton }) => {
  if (individual) {
    return <CountrieInfo countrie={countrie} />;
  }

  return (
    <div>
      <strong>{countrie.name.common}</strong>
      <button onClick={handdleButton}>Show</button>
    </div>
  );
};
export default Countries;
