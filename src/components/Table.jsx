import { useState, useEffect } from 'react';
import Cards from './Cards';

import backgr from "../assets/backgr.jpg";
import like from "../assets/icons/like.svg";
import beaker from "../assets/icons/beaker.svg";
import message from "../assets/icons/message.svg";
import camera from "../assets/icons/camera.svg";
import cog from "../assets/icons/cog.svg";
import dislike from "../assets/icons/dislike.svg";
import heart from "../assets/icons/heart.svg";
import mail from "../assets/icons/mail.svg";

const initArrCards = [
  { id: 1, path: like },
  { id: 2, path: beaker },
  { id: 3, path: message },
  { id: 4, path: camera },
  { id: 5, path: cog },
  { id: 6, path: dislike },
  { id: 7, path: heart },
  { id: 8, path: mail }
];

const allCards = [...initArrCards, ...initArrCards];

const Table = () => {
  const [arrCards, setArrCards] = useState([]);
  const [openedCards, setOpenedCards] = useState([]);
  const [matched, setMatchedCards] = useState([]);
  const [moves, setMoves] = useState(0);
  const [isVictory, setIsVictory] = useState(false);

  const shuffle = (array) => {
    let rand, temp;

    for (let i = array.length - 1; i > 0; i--) {
      rand = Math.floor(Math.random() * (i + 1));

      temp = array[i];
      array[i] = array[rand];
      array[rand] = temp;
    }

    return array;
  };

  const handleGameRestart = () => {
    setArrCards(shuffle(allCards));
    setOpenedCards([]);
    setMatchedCards([]);
    setMoves(0);
    setIsVictory(false);
  };

  const setVictoryButton = () => {
    setIsVictory(true);
  }

  useEffect(() => {
    setArrCards(shuffle(allCards));
  }, []);

  useEffect(() => {
    if (openedCards.length < 2) return;

    setMoves(prevMove => prevMove + 1);

    const firstMatch = arrCards[openedCards[0]];
    const secondMatch = arrCards[openedCards[1]];

    if (secondMatch && (firstMatch.id === secondMatch.id)) {
      setMatchedCards([...matched, firstMatch.id]);
    }

    if (openedCards.length >= 2) {
      setTimeout(() => setOpenedCards([]), 800);
    }
  }, [openedCards]);

  useEffect(() => {
    if (matched.length === allCards.length / 2) {
      setTimeout(() => {
        setIsVictory(true);
      }, 700);
    }
  }, [matched]);

  return (
    <div className='flex justify-center items-center gap-x-40 relative'>
      <img src={backgr} alt="Background" className='w-full h-full absolute inset-x-0 inset-y-0 -z-10' />
      <div className='w-1/6 text-white text-2xl font-semibold tracking-wide flex items-center justify-end'>
        Moves: {moves}
      </div>
      {isVictory ? (
        <div className="absolute inset-0 flex justify-center items-center bg-black bg-opacity-50 z-20">
          <div className="bg-white p-8 rounded-xl shadow-lg text-2xl font-semibold text-center">
            Congratulations! You've won in {moves} moves.
            <button
              onClick={handleGameRestart}
              className='block mx-auto mt-8 px-6 py-3 bg-darkBlue text-white rounded-xl 
                font-semibold hover:bg-blue transition-transform active:scale-90'
            >
              Restart
            </button>
          </div>
        </div>
      ) : null}
      <Cards
        arrCards={arrCards}
        openedCards={openedCards}
        matched={matched}
        setOpenedCards={setOpenedCards}
      />
      <button onClick={handleGameRestart} className='w-1/6 text-white text-2xl font-semibold tracking-wide 
            p-3 border-4 border-white rounded-xl bg-darkBlue hover:bg-blue
            transition-transform active:scale-90'>
        Restart
      </button>
      <button onClick={setVictoryButton} className='w-1/12 text-white text-xl font-semibold tracking-wide 
            py-3 border-4 border-white rounded-xl bg-darkBlue hover:bg-blue
            transition-transform active:scale-90 m-10 absolute left-0 bottom-0'>
        Set Victory
      </button>
    </div>
  );
};

export default Table;
