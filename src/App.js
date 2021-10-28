import {useEffect, useState} from "react"
import yellowCandy from './images/yellow-candy.png'
import blueCandy from './images/blue-candy.png'
import purpleCandy from './images/purple-candy.png'
import redCandy from './images/red-candy.png'
import greenCandy from './images/green-candy.png'
import orangeCandy from './images/orange-candy.png'
import Score from './components/Score';
import checkColumnsForthreeSameColor from './checkFunctions/checkColumnsForthreeSameColor';
import checkColumnsForFourSameColor from './checkFunctions/checkColumnsForFourSameColor';
import checkRowsForthreeSameColor from './checkFunctions/checkRowsForthreeSameColor';
import checkRowsForFourSameColor from './checkFunctions/checkRowsForFourSameColor';
import moveIntoSquareBelow from './generateBoardAndMouve/moveIntoSquareBelow';
import generateRandomBoard from './generateBoardAndMouve/generateRandomBoard';

const width = 8
const candyColorsList = [purpleCandy, redCandy, yellowCandy, blueCandy, orangeCandy, greenCandy]


const App = () => {
  const [currentColorArrangement, setCurrentColorArrangement] = useState([])
  const [squareBeingDragged, setSquareBeingDragged] = useState(null)
  const [squareBeingReplaced, setSquareBeingReplaced] = useState(null)
  const [currentScore, setCurrentScore] = useState(0)

  const dragStart = (event) => {
    setSquareBeingDragged(event.target)
  }

  const dragDrop = (event) => {
    setSquareBeingReplaced(event.target)
  }

  const dragEnd = () => {
    const squareBeingDraggedId = parseInt(squareBeingDragged.getAttribute('data-id'))
    const squareBeingReplacedId = parseInt(squareBeingReplaced.getAttribute('data-id'))


    currentColorArrangement[squareBeingReplacedId] = squareBeingDragged.getAttribute('src')
    currentColorArrangement[squareBeingDraggedId] = squareBeingReplaced.getAttribute('src')

    const validMoves = [squareBeingDraggedId -1 , squareBeingDraggedId - width, squareBeingDraggedId + 1, squareBeingDraggedId + width ]

    const validMove = validMoves.includes(squareBeingReplacedId)

    const isAColumnOfFour = checkColumnsForFourSameColor(width, currentColorArrangement, setCurrentScore)
    const isARowOfFour = checkRowsForFourSameColor(width, currentColorArrangement, setCurrentScore)
    const isAColumnOfThree = checkColumnsForthreeSameColor(width, currentColorArrangement, setCurrentScore)
    const isARowOfThree = checkRowsForthreeSameColor(width, currentColorArrangement, setCurrentScore)

    if (squareBeingReplacedId && validMove
        && ( isAColumnOfFour
        || isARowOfFour
        || isAColumnOfThree
        || isARowOfThree))
    {
      setSquareBeingDragged(null)
      setSquareBeingReplaced(null)
    } else {
      currentColorArrangement[squareBeingReplacedId] = squareBeingReplaced.getAttribute('src')
      currentColorArrangement[squareBeingDraggedId] = squareBeingDragged.getAttribute('src')
      setCurrentColorArrangement([...currentColorArrangement])
    }
  }



  useEffect(() => {
    generateRandomBoard(width, candyColorsList, setCurrentColorArrangement)
  }, [])

  useEffect(() => {
    const intervalTimer = setInterval(() => {

      checkColumnsForFourSameColor(width, currentColorArrangement, setCurrentScore)
      checkRowsForFourSameColor(width, currentColorArrangement, setCurrentScore)

      checkColumnsForthreeSameColor(width, currentColorArrangement, setCurrentScore)
      checkRowsForthreeSameColor(width, currentColorArrangement, setCurrentScore)

      moveIntoSquareBelow(width, currentColorArrangement, candyColorsList)

      setCurrentColorArrangement([...currentColorArrangement])
    }, 100)

    return () => clearInterval(intervalTimer)
  }, [
      checkColumnsForFourSameColor, checkRowsForFourSameColor,
      checkColumnsForthreeSameColor, checkRowsForthreeSameColor,
      moveIntoSquareBelow, currentColorArrangement
  ])


  return (
      <div className="app">
        <div className="candy-game">
          {
            currentColorArrangement.map((color, index) => (   <img
                    key={index}
                    src={color}
                    alt={color}
                    data-id={index}
                    draggable={true}
                    onDragOver={(e) => e.preventDefault()}
                    onDragEnter={(e) => e.preventDefault()}
                    onDragLeave={(e) => e.preventDefault()}
                    onDragStart={dragStart}
                    onDrop={dragDrop}
                    onDragEnd={dragEnd}
                />
            ))
          }
        </div>
        <Score score={currentScore}></Score>
      </div>
  );
}

export default App
