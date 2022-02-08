import React, { useState, useEffect } from "react";

import Header from "./Header";
import ToyForm from "./ToyForm";
import ToyContainer from "./ToyContainer";

function App() {
  const [showForm, setShowForm] = useState(false);
  const [toyItems, setToyItems] = useState([])

  useEffect(() => {
    fetch("http://localhost:3001/toys")
    .then((res) => res.json())
    .then((data) => setToyItems(data))
  }, []);

  function handleClick() {
    setShowForm((showForm) => !showForm);
  }

  function handleAddItem(newItem) {
    setToyItems([...toyItems, newItem]);
  }

  function handleDeleteToy(toyToDelete) {
    const updatedItems = toyItems.filter((item) => item.id !== toyToDelete.id);
    setToyItems(updatedItems);
  }

  function handleUpdateToy(updatedToy) {
      const updatedItems = toyItems.map((item) => {
        if (item.id === updatedToy.id) {
          return updatedToy
        } else {
          return item;
        }
      });
      setToyItems(updatedItems);
    }
    
  return (
    <>
      <Header />
      {showForm ? <ToyForm onAddItem={handleAddItem}/> : null}
      <div className="buttonContainer">
        <button onClick={handleClick}>Add a Toy</button>
      </div>
      <ToyContainer
          toyItems={toyItems}
          onDeleteToy={handleDeleteToy}
          onUpdateToy={handleUpdateToy}
      />
    </>
  );
}

export default App;
