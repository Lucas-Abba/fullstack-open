export const Persons = ({ persons, deletePerson }) => {
  return (
    <div>
      {persons.map((person) => (
        <Person key={person.id} data={person} deletePerson={deletePerson}/>
      ))}
    </div>
  );
};

export const Person = ({ data, deletePerson }) => {
  return (
    <p>
      {data.name} {data.number}
      <button onClick={()=>deletePerson(data.id)}>Delete</button>
    </p>
  );
};
