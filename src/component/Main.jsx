function Main({ cards, setCards, completedCards, setCompletedCards }) {
  function handleWorkingBtn(index) {
    const updatedCards = [...cards];
    const card = updatedCards[index];

    if (card) {
      // "완료" 상태에서 "취소" 버튼을 누른 경우
      if (card.isDone) {
        card.isDone = false;

        // completedCards 배열에서 해당 카드를 제거
        const updatedCompletedCards = completedCards.filter(
          (c) => c.id !== card.id
        );
        setCompletedCards(updatedCompletedCards);

        // work-zone에 해당 카드 추가
        setCards([...updatedCards, card]);

      } else { // "취소" 상태에서 "완료" 버튼을 누른 경우
        card.isDone = true;

        // completedCards 배열에 새 카드를 추가
        setCompletedCards([...completedCards, card]);

        // work-zone에서 해당 카드 제거
        updatedCards.splice(index, 1);
        setCards(updatedCards);
      }
    }
  }

  function handleDoneBtn(index) {
    // "end-zone" -> "work-zone"
    const cardToMove = completedCards[index];
    const updatedCompletedCards = completedCards.filter((c, i) => i !== index);
    setCompletedCards(updatedCompletedCards);
  
    // "work-zone"으로 카드 이동
    setCards([...cards, { ...cardToMove, isDone: false }]);
  
    // 버튼을 "완료"로 변경
    const updatedCards = [...cards, { ...cardToMove, isDone: false }];
    setCards(updatedCards);
  }

  function handleDoneRemoveBtn(index) {
    // "end-zone"의 카드를 삭제
    const updatedCompletedCards = completedCards.filter((c, i) => i !== index);
    setCompletedCards(updatedCompletedCards);
  }

  function removeBtn(index) {
    const updatedCards = [...cards];
    updatedCards.splice(index, 1); 
    setCards(updatedCards);

    // 로컬 스토리지에서 해당 카드 제거
    const updatedLocalStorage = JSON.parse(localStorage.getItem("cards"));
    updatedLocalStorage.splice(index, 1);
    localStorage.setItem("cards", JSON.stringify(updatedLocalStorage));
  }

  return (
    <main>
      <div className="work-zone">
        <h3>Working🔥</h3>
        <div className="add-card">
          {cards.map((card, index) => (
            <div key={index} className="card">
              <h3>{card.title}</h3>
              <p>{card.body}</p>
              <div className="btn-area2">
                <button className="remove-btn" onClick={removeBtn}>
                  삭제
                </button>
                <button
                  className="control-btn"
                  onClick={() => handleWorkingBtn(index)}
                >
                  {card.isDone ? "취소" : "완료"}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="end-zone">
        <h3>Done✅</h3>
        <div className="add-card">
          {completedCards.map((completedCard, index) => (
            <div key={index} className="card">
              <h3>{completedCard.title}</h3>
              <p>{completedCard.body}</p>
              <div className="btn-area2">
                <button
                  className="remove-btn"
                  onClick={() => handleDoneRemoveBtn(index)}
                >
                  삭제
                </button>
                <button
                  className="control-btn"
                  onClick={() => handleDoneBtn(index)}
                >
                 {completedCard.isDone ? "취소" : "완료"}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}

export default Main;
