import { useState, useEffect } from "react";
import personsService from "./services/Persons";

const Notification = ({ message, type }) => {
  if (!message) return null;
  return <div className={type}>{message}</div>;
};

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");
  const [notification, setNotification] = useState({ msg: null, type: null });

  useEffect(() => {
    personsService.getAll().then((res) => setPersons(res.data));
  }, []);

  const notify = (msg, type = "success") => {
    setNotification({ msg, type });
    setTimeout(() => setNotification({ msg: null, type: null }), 5000);
  };

  const addPerson = (event) => {
    event.preventDefault();
    const existing = persons.find(
      (p) => p.name.toLowerCase() === newName.toLowerCase(),
    );
    const personObject = { name: newName, number: newNumber };

    if (existing) {
      if (window.confirm(`${newName} already exists, update number?`)) {
        personsService
          .update(existing.id, personObject)
          .then((res) => {
            setPersons(
              persons.map((p) => (p.id !== existing.id ? p : res.data)),
            );
            notify(`Updated ${newName}`);
          })
          .catch(() =>
            notify(`Error: ${newName} was already deleted`, "error"),
          );
      }
    } else {
      personsService.create(personObject).then((res) => {
        setPersons(persons.concat(res.data));
        notify(`Added ${newName}`);
        setNewName("");
        setNewNumber("");
      });
    }
  };

  const deletePerson = (id, name) => {
    if (window.confirm(`Delete ${name}?`)) {
      personsService.remove(id).then(() => {
        setPersons(persons.filter((p) => p.id !== id));
      });
    }
  };

  const personsToShow = persons.filter((p) =>
    p.name.toLowerCase().includes(filter.toLowerCase()),
  );

  return (
    <div>
      <h1>Phonebook</h1>
      <Notification message={notification.msg} type={notification.type} />
      <div>
        Filter:{" "}
        <input value={filter} onChange={(e) => setFilter(e.target.value)} />
      </div>
      <form onSubmit={addPerson}>
        <h3>Add New</h3>
        <div>
          Name:{" "}
          <input value={newName} onChange={(e) => setNewName(e.target.value)} />
        </div>
        <div>
          Number:{" "}
          <input
            value={newNumber}
            onChange={(e) => setNewNumber(e.target.value)}
          />
        </div>
        <button type="submit">Add</button>
      </form>
      <h3>Numbers</h3>
      {personsToShow.map((p) => (
        <div key={p.id}>
          {p.name} / {p.number}{" "}
          <button onClick={() => deletePerson(p.id, p.name)}>delete</button>
        </div>
      ))}
    </div>
  );
};

export default App;
