import { useState } from "react";

const Filter = ({ persons }) => {
    const [filter, setFilter] = useState("");
  
    const findPerson = () => {
      let list = []
      list = !filter 
      ? [] 
      : persons.filter((p)=>p.name.toLowerCase().includes(filter.toLowerCase())); 

      return list;
    };
  
    const handleFilterChange = (e) => {
      setFilter(e.target.value);
    };
  
    return (
      <div>
        <h1>filter</h1>
        <div>
          filter shown with:{" "}
          <input value={filter} onChange={handleFilterChange} />
        </div>
        {findPerson().map((res,i)=><p key={i}>{res.name}</p>
        )}
      </div>
    );
  };

export default Filter;