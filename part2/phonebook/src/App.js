import { useEffect, useState } from "react";
import PersonForm from "./components/PhoneForm";
import Filter from "./components/Filter";
import { Persons } from "./components/Person";
import personService from "./services/persons";

const GreenNotification = ({ message }) => {
  if (message === null) {
    return null;
  }
  const notifStyle = {
    color: "green",
    background: "lightred",
    fontSize: "20px",
    borderStyle: "solid",
    borderRadius: "5px",
    padding: "10px",
    marginBottom: "10px",
  };
  return <div style={notifStyle}>{message}</div>;
};

const RedNotification = ({ message }) => {
  if (message === null) {
    return null;
  }
  const notifStyle = {
    color: "red",
    background: "lightred",
    fontSize: "20px",
    borderStyle: "solid",
    borderRadius: "5px",
    padding: "10px",
    marginBottom: "10px",
  };
  return <div style={notifStyle}>{message}</div>;
};

const App = () => {
  const [persons, setPersons] = useState([]);

  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [message, setMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    personService.getAll().then((res) => setPersons(res));
  }, []);

  const addPerson = (e) => {
    e.preventDefault();
    const nameEqual = persons.find((p) => p.name === newName);
    if (nameEqual && window.confirm("estas seguro pa?")) {
      return changeNumber(nameEqual.id);
    }
    const newPerson = {
      name: newName,
      number: newNumber,
    };

    personService
      .create(newPerson)
      .then((p) => {
        setPersons(persons.concat(p));
        setMessage(`Person "${p.name}" was succesfully added`);
        setTimeout(() => {
          setMessage(null);
        }, 4000);
      })
      .catch((err) => {
        // console.log('rednotif bf', errorMessage)
        setErrorMessage(`${err.response.data.error}`);
        console.log('sexooooo')
        // console.log('rednotif af', errorMessage)
        // console.log(err.response.data.error);
        // setTimeout(() => {
        //   setErrorMessage(null);
        // }, 3000);
      });
  };

  const changeNumber = (id) => {
    const person = persons.find((p) => p.id === id);
    const changedPerson = { ...person, number: newNumber };

    personService
      .update(id, changedPerson)
      .then((res) =>
        setPersons(persons.map((p) => (p.id !== id ? p : res.data)))
      )
      .catch((err) => {
        setErrorMessage(
          `Person "${newName}" has already been removed from server`
        );
        setTimeout(() => {
          setMessage(null);
        }, 4000);
      });
  };

  const deletePerson = (id) => {
    personService.remove(id);
    setPersons(persons.filter((p) => p.id !== id));
  };

  const handleNameChange = (e) => {
    setNewName(e.target.value);
  };

  const handleNumberChange = (e) => {
    setNewNumber(e.target.value);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter persons={persons} />
      <GreenNotification message={message} />
      <RedNotification message={errorMessage} />
      <PersonForm
        name={newName}
        number={newNumber}
        addPerson={addPerson}
        atNameChange={handleNameChange}
        atNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <Persons persons={persons} deletePerson={deletePerson} />
    </div>
  );
};

export default App;
