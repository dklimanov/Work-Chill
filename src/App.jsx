import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [lastWorkDate, setLastWorkDate] = useState(new Date());

  const [firstWishDate, setFirstWishDate] = useState(new Date());
  const [secondWishDate, setSecondWishDate] = useState(new Date());
  const [isFirstChill, setIsFirstChill] = useState(false);
  const [isSecondChill, setIsSecondChill] = useState(false);
  const [showResult, setShowResult] = useState(false);

  const count = (num, seed) => {
    if (num - 2 >= 0) {
      return count(num - 2, seed + 1);
    } else {
      return seed;
    }
  };

  const onClickHandler = () => {
    const workDate = new Date(lastWorkDate);
    const firstDate = new Date(firstWishDate);
    const secondDate = new Date(secondWishDate);
    const firstDiff = (firstDate - workDate) / (1000 * 60 * 60 * 24);
    const secondDiff = (secondDate - workDate) / (1000 * 60 * 60 * 24);
    const firstParity = count(firstDiff, 0);
    const secondParity = count(secondDiff, 0);
    if ((firstDiff % 2 === 0 && firstParity % 2 !== 0) || (firstDiff % 2 !== 0 && firstParity % 2 === 0)) {
      setIsFirstChill(() => true);
    } else {
      setIsFirstChill(() => false);
    }
    if ((secondDiff % 2 === 0 && secondParity % 2 !== 0) || (secondDiff % 2 !== 0 && secondParity % 2 === 0)) {
      setIsSecondChill(() => true);
    } else {
      setIsSecondChill(() => false);
    }
    setShowResult(true);
  };

  return (
    <div>
      <div>
        <label>
          Последний рабочий день
          <input type="date" value={lastWorkDate} onChange={(e) => setLastWorkDate(e.target.value)} />
        </label>
      </div>
      Желаемые даты
      <div className="flex-container">
        <label>
          Первая дата
          <input type="date" value={firstWishDate} onChange={(e) => setFirstWishDate(e.target.value)} />
        </label>
        <label>
          Вторая дата
          <input type="date" value={secondWishDate} onChange={(e) => setSecondWishDate(e.target.value)} />
        </label>
      </div>
      <div>
        <button onClick={onClickHandler}>Узнать</button>
      </div>
      <div className="flex-container">
        {showResult && (
          <>
            <div>
              {isFirstChill ?
                `Ура! У тебя выходной ${(new Date(firstWishDate)).toLocaleDateString('ru-RU')}`
                : `К сожалению ты работаешь ${(new Date(firstWishDate)).toLocaleDateString('ru-RU')}`}
            </div>
            <div>
              {isSecondChill ?
                `Ура! У тебя выходной ${(new Date(secondWishDate)).toLocaleDateString('ru-RU')}`
                : `К сожалению ты работаешь ${(new Date(secondWishDate)).toLocaleDateString('ru-RU')}`}
            </div>  
          </>
        )}
      </div>
    </div>
  )
}

export default App
