import React, { useEffect, useState } from "react";
import Header from "./Header";
import Nav from "./Nav";
import Main from "./Main";

function Layout() {
  const [cards, setCards] = useState([]);
  const [completedCards, setCompletedCards] = useState([]);

  useEffect(function () {
    const savedCards = JSON.parse(localStorage.getItem("cards")) || [];
    setCards(savedCards);
  }, []);

  function addCard(newCard) {
    const updatedCards = [...cards, newCard];
    setCards(updatedCards);

    localStorage.setItem('cards', JSON.stringify(updatedCards));
  }

  return (
    <div className="layout">
      <Header />
      <Nav addCard={addCard} />
      <Main cards={cards} setCards={setCards} completedCards={completedCards} setCompletedCards={setCompletedCards} />
    </div>
  );
}

export default Layout;
