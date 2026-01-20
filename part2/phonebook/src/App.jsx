import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";

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

const Persons = ({ personsToShow }) => {
  return (
    <div>
      {personsToShow.map((person) => (
        <div key={person.name}>
          {person.name} / {person.phone}
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

  useEffect(() => {
    console.log("effect");
    axios.get("http://localhost:3001/persons").then((response) => {
      console.log("promise fulfilled");
      setPersons(response.data);
    });
  }, []);

  console.log("render", persons.length, "notes");

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handlePhoneChange = (event) => {
    setNewPhone(event.target.value);
  };

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const addPerson = (event) => {
    event.preventDefault();

    const alreadyExists = persons.some(
      (person) => person.name.toLowerCase() === newName.toLowerCase(),
    );

    if (alreadyExists) {
      alert(`${newName} is already added to phonebook`);
      return;
    }

    const personObject = {
      name: newName,
      phone: newPhone,
    };

    setPersons([...persons, personObject]);
    setNewName("");
    setNewPhone("");
  };

  const personsToShow = persons.filter((person) =>
    person.name.toLowerCase().includes(filter.toLowerCase()),
  );

  return (
    <div>
      <h2>Phonebook</h2>

      <Filter value={filter} onChange={handleFilterChange} />

      <PersonForm
        onSubmit={addPerson}
        handleNameChange={handleNameChange}
        handlePhoneChange={handlePhoneChange}
        nameValue={newName}
        phoneValue={newPhone}
      />

      <h2>Numbers</h2>
      <Persons personsToShow={personsToShow} />
    </div>
  );
};

export default App;
