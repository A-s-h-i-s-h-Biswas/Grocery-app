import React, { useState, useEffect } from 'react'
import List from './List'
import Alert from './Alert'

//***************************** Using Browsers Local Storage ****************************/
//***************************** Using Browsers Local Storage ****************************/
const getLocalStorage = () => {
  let list = localStorage.getItem("lists");
  if (list) {
    return JSON.parse(localStorage.getItem("lists"));
  }
  else {
    return [];
  }
}
//***************************** Using Browsers Local Storage ****************************/
//***************************** Using Browsers Local Storage ****************************/

function App() {
  const [name, setName] = useState("");
  const [lists, setLists] = useState(getLocalStorage());
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [alert, setAlert] = useState({ show: false, msg: "", type: "" });

  ////////////////////////  Starts of Handling Click Event //////////////////////////
  ////////////////////////  Starts of Handling Click Event //////////////////////////
  const handleClick = (event) => {
    event.preventDefault();
    //***************************** handling input validation ****************************//
    if (!name) {
      getAlert(true, "Input value required", "danger");
    }
    //***************************** handling Editing item ****************************/
    else if (name && isEditing) {
      getAlert(true, "Item Edited Successfully", "success");
      setLists(
        lists.map((item) => {
          if (item.id === editId) {
            return { ...item, title: name };
          }
          return item;
        })
      );
      setEditId(null);
      setIsEditing(false);
      setName("");
    }
    //***************************** handling input items ****************************/
    else {
      const newList = { id: new Date().toLocaleTimeString(), title: name };
      setLists((prevLists) => {
        return [...prevLists, newList];
      });
      setName("");
      getAlert(true, "Added successfully.", "success");
    }
  };
  ////////////////////////  End of Handling Click Event //////////////////////////

  //***************************** Alert messege function ****************************/
  //***************************** Alert messege function ****************************/
  const getAlert = (show = false, msg = "", type = "") => {
    setAlert({ show, msg, type });
  };

  //***************************** Clear All Items function ****************************/
  //***************************** Clear All Items function ****************************/
  const clearItems = () => {
    setLists([]);
    getAlert(true, "Grocery Bag is Empty", "danger");
  };

  //***************************** Removing specific item from bag ****************************/
  //***************************** Removing specific item from bag ****************************/
  const removeItem = (id) => {
    setLists(lists.filter((item) => item.id !== id));
    getAlert(true, "Item removed Successfully", "danger");
  };

  //***************************** Editing Specific item usind id ****************************/
  //***************************** Editing Specific item usind id ****************************/
  const editItem = (id) => {
    const foundItem = lists.find((item) => item.id === id);
    setEditId(id);
    setIsEditing(true);
    setName(foundItem.title);
  };

  //******************** Using Browsers Local Storage every time when lists changes  ******************/
  //******************** Using Browsers Local Storage every time when lists changes *******************/
  useEffect(() => {
    localStorage.setItem("lists", JSON.stringify(lists));
  }, [lists]);

  //***************************** returning App component ****************************/
  //***************************** returning App component ****************************/
  return (
    <section className="section-center">
      <form className="grocery-form">
        {alert.show && <Alert {...alert} removeAlert={getAlert} />}
        <h3>Grocery Bag</h3>
        <div className="form-control">
          <input
            type="text"
            className="grocery"
            placeholder="example:  Apple."
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
          <button className="submit-btn" onClick={handleClick}>
            {isEditing ? "Edit" : "Add"}
          </button>
        </div>
      </form>
      {lists.length > 0 && (
        <div className="grocery-container">
          <List lists={lists} removeItem={removeItem} editItem={editItem} />
          <button className="clear-btn" onClick={clearItems}>
            Clear all itema
          </button>
        </div>
      )}
    </section>
  );
}

export default App
