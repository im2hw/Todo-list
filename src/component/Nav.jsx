import React, { useState } from "react";

function Nav({ addCard }) {
  const [todo, setTodo] = useState({
    id: 0,
    title: "",
    body: "",
    isDone: false,
  });

  function changeTitle(event) {
    setTodo({
      ...todo,
      title: event.target.value,
    });
  }

  function changeBody(event) {
    setTodo({
      ...todo,
      body: event.target.value,
    });
  }


  const [currentId, setCurrentId] = useState(0);

  function handleAddCard() {
    if (todo.title && todo.body) {
      const updatedId = currentId + 1;
      setCurrentId(updatedId);
      const newCard = { ...todo, id: updatedId };
      addCard(newCard);

      // 입력값 초기화
      setTodo({
        id: updatedId,
        title: "",
        body: "",
        isDone: false,
      });
    }
  }

  return (
    <div className="nav">
      <div className="wrap-input">
        <div className="input-area">
          <p>Title</p>
          <input
            className="title"
            type="text"
            onChange={changeTitle}
            value={todo.title}
          />
        </div>
        <div className="input-area">
          <p>Content</p>
          <input
            className="body"
            type="text"
            onChange={changeBody}
            value={todo.body}
          />
        </div>
      </div>
      <div className="btn-area">
        <button onClick={handleAddCard}>Add</button>
      </div>
    </div>
  );
}

export default Nav;
