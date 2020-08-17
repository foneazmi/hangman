import React, { useState, useEffect } from "react";
import "./App.css";
import Header from "./components/Header";
import Figure from "./components/Figure";
import WrongLetters from "./components/WrongLetters";
import Word from "./components/Word";
import Popup from "./components/Popup";
import Notifications from "./components/Notifications";

import { showNotifications as show } from "./helpers/helpers";

const words = ["application", "programming", "interface", "wizard"];

let selectedWord = words[Math.floor(Math.random() * words.length)];

function App() {
  const [playable, setPlayable] = useState(true);
  const [correctLetters, setCorrectLetters] = useState([]);
  const [wrongLetters, setWrongLetters] = useState([]);
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    const handlerKeydown = (event) => {
      const { key, keyCode } = event;
      if (playable && keyCode >= 65 && keyCode <= 90) {
        const letter = key.toLowerCase();
        if (selectedWord.includes(letter)) {
          if (!correctLetters.includes(letter)) {
            setCorrectLetters((curr) => [...curr, letter]);
          } else {
            show(setShowNotification);
            // showNotification();
          }
        } else {
          if (!wrongLetters.includes(letter)) {
            setWrongLetters((curr) => [...curr, letter]);
          } else {
            show(setShowNotification);
            // showNotification();
          }
        }
      }
    };
    window.addEventListener("keydown", handlerKeydown);

    return () => window.removeEventListener("keydown", handlerKeydown);
  }, [correctLetters, playable, wrongLetters]);

  function playAgain() {
    setPlayable(true);

    setCorrectLetters([]);
    setWrongLetters([]);

    selectedWord = words[Math.floor(Math.random() * words.length)];
  }

  return (
    <>
      <Header />
      <div className="game-container">
        <Figure wrongLetters={wrongLetters} />
        <WrongLetters wrongLetters={wrongLetters} />
        <Word selectedWord={selectedWord} correctLetters={correctLetters} />
      </div>
      <Popup
        selectedWord={selectedWord}
        correctLetters={correctLetters}
        wrongLetters={wrongLetters}
        setPlayable={setPlayable}
        playAgain={playAgain}
      />
      <Notifications showNotification={showNotification} />
    </>
  );
}

export default App;
