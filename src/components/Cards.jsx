import question from "../assets/icons/question.svg"

const Cards = ({ arrCards, openedCards, matched, setOpenedCards}) => {

  const flipCard = (index) => () => {
    if (openedCards.includes(index) || openedCards.length >= 2) return

    setOpenedCards((opened) => [...opened, index]);
  }

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="grid grid-cols-4 gap-5">
        {arrCards.map((item, index) => {
          let isFlipped = false;

          if(openedCards.includes(index))isFlipped = true;

          if(matched.includes(item.id)) {
            isFlipped = true;
          }
          return (
            <div key={index} onClick={flipCard(index)}>
              <div className={`flex justify-center items-center p-5 w-32 h-40 border-4 border-white rounded-2xl hover:scale-110
                  ${isFlipped ? 'bg-purple hover:bg-pink' : 'bg-darkBlue hover:bg-blue'}`}
                  style={{
                    transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
                    transitionDuration: "0.6s",
                    transformStyle: "preserve-3d",
              }}>
                  {isFlipped ? (
                    <img src={item.path} alt="cardFront" className="w-20 transform scale-x-[-1]"/>

                  ) : (
                    <img src={question} alt="cardBack"/>
                  )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Cards