import React, {useState} from "react";


function ToyForm({onAddItem}) {
const [name, setName] = useState("")
const [image, setImage] = useState("")

function handleFormSubmit(e) {
  e.preventDefault()
  const itemData = {
    name: name,
    image: image,
    likes: 0
  };

  fetch("http://localhost:3001/toys", {
    method: "POST",
    headers: {
      "Content-Type" : "application/json",
    },
    body: JSON.stringify(itemData)
  })
  .then((res) => res.json())
  .then((newItem) => onAddItem(newItem));

}

  return (
    <div className="container">
      <form className="add-toy-form" onSubmit={handleFormSubmit}>
        <h3>Create a toy!</h3>
        <input
          type="text"
          name={name}
          placeholder="Enter a toy's name..."
          className="input-text"
          onChange={(e) => setName(e.target.value)}
        />
        <br />
        <input
          type="text"
          name={image}
          placeholder="Enter a toy's image URL..."
          className="input-text"
          onChange={(e) => setImage(e.target.value)}
        />
        <br />
        <input
          type="submit"
          name="submit"
          value="Create New Toy"
          className="submit"
        />
      </form>
    </div>
  );
}

export default ToyForm;
