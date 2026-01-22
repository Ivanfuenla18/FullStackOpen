import { useState } from "react";
import { useEffect } from "react";
import AddNotification from "./components/addNotification";
import ErrorNotification from "./components/ErrorNotification";
import personsService from "./services/Persons";

const Filter = ({ value, onChange }) => {
  return (
    <div>
      <h3>Filter persons</h3>
      <input type="text" onChange={onChange} value={value} />
    </div>
  );
};

const PersonForm = ({
  onSubmit,
  handleNameChange,
  handlePhoneChange,
  nameValue,
  phoneValue,
}) => {
  return (
    <>
      <h3>Add a new person</h3>
      <form onSubmit={onSubmit}>
        <div>
          Name: <input onChange={handleNameChange} value={nameValue} />
        </div>
        <div>
          Number: <input onChange={handlePhoneChange} value={phoneValue} />
        </div>
        <br />
        <div>
          <button type="submit">Add</button>
        </div>
      </form>
    </>
  );
};
const Persons = ({ personsToShow, onDelete }) => {
  return (
    <div>
      {personsToShow.map((person) => (
        <div key={person.id}>
          {person.name} / {person.phone}
          <button onClick={() => onDelete(person.id, person.name)}>
            Delete
          </button>
        </div>
      ))}
    </div>
  );
};

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [filter, setFilter] = useState("");
  const [addMessage, setAddMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    personsService
      .getAll()
      .then((response) => {
        setPersons(response.data);
      })
      .catch((error) => {
        console.log(error);
        setErrorMessage("Hubo un fallo al recoger los datos del servidor");
        setTimeout(() => {
          setErrorMessage(null);
        }, 5000);
      });
  }, []);

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handlePhoneChange = (event) => {
    setNewPhone(event.target.value);
  };

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const deletePerson = (id, name) => {
    if (window.confirm(`¿Quieres borrar a ${name}?`)) {
      personsService
        .remove(id)
        .then(() => {
          setPersons(persons.filter((p) => p.id !== id));
        })
        .catch((error) => {
          console.log(error);
          setErrorMessage("El usuario ya no existe en la bbdd: ");
          setTimeout(() => {
            setErrorMessage(null);
          }, 5000);
        });
    }
  };

  const addPerson = (event) => {
    event.preventDefault();

    const existPerson = persons.find(
      (person) => person.name.toLowerCase() === newName.toLowerCase(),
    );

    if (existPerson) {
      const phoneExists = existPerson.phone === newPhone;
      if (phoneExists) {
        alert("El usuario " + existPerson.name + " ya existe");
      } else {
        const pass = window.confirm(
          "El usuario: " +
            existPerson.name +
            " ya existe quieres cambiar el numero: " +
            existPerson.phone +
            " al nuevo numero: " +
            newPhone +
            " ",
        );

        if (pass) {
          const personObject = {
            name: newName,
            phone: newPhone,
          };
          personsService
            .update(existPerson.id, personObject)
            .then((response) => {
              setPersons(
                persons.map((p) =>
                  p.id !== existPerson.id ? p : response.data,
                ),
              );
              setNewName("");
              setNewPhone("");
            })
            .catch((error) => {
              setPersons(persons.filter((p) => p.id !== existPerson.id));
              setErrorMessage(
                "Hubo un fallo al editar a: " +
                  personObject.name +
                  " porque ya no existe en la BBDD",
              );
              setTimeout(() => {
                setErrorMessage(null);
              }, 5000);
            });
        }
        return;
      }
    } else {
      const personObject = {
        name: newName,
        phone: newPhone,
      };

      personsService
        .create(personObject)
        .then((response) => {
          setPersons(persons.concat(response.data));
          setNewName("");
          setNewPhone("");
          setAddMessage(
            "Se acaba de agregar a: " +
              personObject.name +
              " con numero de telefono: " +
              personObject.phone,
          );
          setTimeout(() => {
            setAddMessage(null);
          }, 5000);
        })
        .catch((error) => {
          console.log(error);
          setErrorMessage("Hubo un fallo al crear a: " + personObject.name);
          setTimeout(() => {
            setErrorMessage(null);
          }, 5000);
        });
    }
  };

  const personsToShow = persons.filter((person) =>
    person.name.toLowerCase().includes(filter.toLowerCase()),
  );

  return (
    <div>
      <h1>Phonebook</h1>
      {addMessage && <AddNotification message={addMessage} />}
      {errorMessage && <ErrorNotification message={errorMessage} />}
      <Filter value={filter} onChange={handleFilterChange} />

      <PersonForm
        onSubmit={addPerson}
        handleNameChange={handleNameChange}
        handlePhoneChange={handlePhoneChange}
        nameValue={newName}
        phoneValue={newPhone}
      />

      <h2>Numbers</h2>
      <Persons personsToShow={personsToShow} onDelete={deletePerson} />
    </div>
  );
};

export default App;
