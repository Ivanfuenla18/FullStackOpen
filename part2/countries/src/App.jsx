import { useState, useEffect } from "react";
import servicesCountries from "./services/Countries";
import Countries from "./components/Countries";
import Filter from "./components/Filter";
import CountrieInfo from "./components/CountrieInfo";

function App() {
  /* Declaracion de las variables */

  const [countries, setCountries] = useState([]);
  const [filter, setFilter] = useState("");

  /* EL useEffect sirve para traer todos los paises al iniciar la app */

  useEffect(() => {
    servicesCountries
      .getAll()
      .then((response) => {
        setCountries(response.data);
      })
      .catch((err) =>
        console.log("Fallo al obtener los datos del servidor:", err),
      );
  }, []);

  /* 
  Esta pequeña funcion recibe el nombre del pais seleccionado y 
  cambia el filtro lo que hace rederizar todo otra vez y 
  al ser un pais manda solo los datos de ese pais.
  */

  const handdleShowButton = (name) => {
    setFilter(name);
  };

  /* La siguiente funcion maneja el cambio del input del filtro */

  const handdleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  /* Esta variable es la que se encarga de coger el filtro con los paises y filtrarlos*/
  const countriesToShow = countries.filter((country) =>
    country.name.common.toLowerCase().includes(filter.toLowerCase()),
  );

  /* Vale estube mirando y vi esta forma en la que enviamos diferentes cosas a Countrie en funcion de los paises que hay */

  let contentToShow;

  if (countriesToShow.length > 10) {
    contentToShow = <p>Hay demasiados países para mostrar</p>;
  } else if (countriesToShow.length <= 10 && countriesToShow.length >= 2) {
    contentToShow = countriesToShow.map((countrie) => (
      <Countries
        countrie={countrie}
        key={countrie.name.common}
        individual={false}
        handdleButton={() => handdleShowButton(countrie.name.common)}
      />
    ));
  } else if (countriesToShow.length === 1) {
    contentToShow = (
      <Countries countrie={countriesToShow[0]} individual={true} />
    );
  }

  /* Cuerpo de la  app*/

  return (
    <>
      <h1>Paises</h1>
      <Filter change={handdleFilterChange} />
      {contentToShow}
    </>
  );
}
export default App;
