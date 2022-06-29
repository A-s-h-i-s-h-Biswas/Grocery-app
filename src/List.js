import React from 'react'
import { FaEdit, FaTrash } from 'react-icons/fa'
const List = ({ lists, removeItem, editItem }) => {
  return (
    <div className="grocery-list">
      {lists.map((list) => {
        const { id, title } = list;
        return (
          <article className="grocery-item">
            <p className="title">{title}</p>
            <div className="btn-container">
              <button  onClick={()=>{editItem(id)}} className="edit-btn">
                <FaEdit />
              </button>
              <button
                onClick={() => {
                  removeItem(id);
                }}
                className="delete-btn"
              >
                <FaTrash />
              </button>
            </div>
          </article>
        );
      })}
    </div>
  );
};

export default List
