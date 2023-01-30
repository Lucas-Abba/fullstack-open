const PersonForm = ({
  name,
  number,
  addPerson,
  atNameChange,
  atNumberChange,
}) => {
  return (
    <form onSubmit={addPerson}>
      <h3>Add a new</h3>
      <div>
        name: <input value={name} onChange={atNameChange} />
        number: <input value={number} onChange={atNumberChange} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

export default PersonForm;
