import "./App.css";

import React, { useState, useEffect } from "react";
import Axios from "axios";

function App() {
  const startFruit = {
    fruitsName: "",
    daysSinceIAte: 0,
  };

  const [fruits, setFruits] = useState(startFruit);
  const { fruitsName, daysSinceIAte } = fruits;
  const [allFruits, setAllFruits] = useState([]);
  const [updateFruit, setUpdateFruit] = useState(startFruit);

  useEffect(() => {
    Axios.get("http://localhost:3001/read").then((res) => {
      const { data } = res;
      setAllFruits(data);
    });
  }, [allFruits]);

  function onChange(e) {
    const { value, name } = e.target;

    setFruits((prevFruits) => {
      return { ...prevFruits, [name]: value };
    });
  }

  function onSubmit() {
    Axios.post("http://localhost:3001/insert", {
      fruitsName,
      daysSinceIAte,
    });
    setFruits(startFruit);
  }

  function onDelete(id) {
    Axios.delete(`http://localhost:3001/delete/${id}`);
  }

  function onChangeUpdate(e) {
    const { value, name } = e.target;

    setUpdateFruit((prevFruit) => {
      return {
        ...prevFruit,
        [name]: value,
      };
    });
  }

  function onUpdate(id) {
    Axios.put(`http://localhost:3001/update/${id}`, {
      fruitsName: updateFruit.fruitsName,
      daysSinceIAte: updateFruit.daysSinceIAte,
    });
    setUpdateFruit(startFruit);
  }

  return (
    <div className="app">
      <h1>Fruits </h1>
      <label htmlFor="fruitsName">Fruit Name: </label>
      <input
        type="text"
        name="fruitsName"
        value={fruitsName}
        onChange={onChange}
        autoFocus={true}
      />
      <label htmlFor="daysSinceIAte">Days Since You Ate It: </label>
      <input
        type="number"
        name="daysSinceIAte"
        value={daysSinceIAte}
        onChange={onChange}
      />
      <button onClick={onSubmit}>Add to List</button>
      <hr />
      <h2>Fruits List</h2>
      {allFruits.map(({ _id, fruitsName, daysSinceIAte }) => {
        return (
          <div key={_id} className="container">
            <div className="fruit-item">
              <button
                className="fruit-delete"
                onClick={() => {
                  onDelete(_id);
                }}
              >
                ×
              </button>
              <input
                type="text"
                name="fruitsName"
                value={updateFruit.fruitsName}
                onChange={onChangeUpdate}
              />
              <input
                type="number"
                name="daysSinceIAte"
                value={updateFruit.daysSinceIAte}
                onChange={onChangeUpdate}
              />
              <button
                className="fruit-update"
                onClick={() => {
                  onUpdate(_id);
                }}
              >
                Update
              </button>
              <p>Fruits Name: {fruitsName}</p>
              <p>Days Since You Ate It: {daysSinceIAte}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default App;
