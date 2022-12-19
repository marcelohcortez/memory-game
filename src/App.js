import { useState } from 'react'

import './App.css';

function App() {
  const [grid, setGrid] = useState([
    [0, 1, 2, 3],
    [0, 1, 2, 3],
    [0, 0, 0, 0]
  ])

  const [isRevealed, setIsRevealed] = useState(new Array(grid.length).fill('').map( () => 
    new Array(grid[0].length).fill(false)
  ))
  
  const [firstItem, setFirstItem] = useState()

  function selectedCard(row, column) {
    if (isRevealed[row][column]) return

    const newIsRevealed = [...isRevealed]

    newIsRevealed[row][column] = true
    setIsRevealed(newIsRevealed)

    if (firstItem) {
      checkIfCardsAreEqual(newIsRevealed, row, column)
    } else {
      setFirstItem({row, column})
    }   
  }

  function checkIfCardsAreEqual(newIsRevealed, row, column) {
    const clickedCard = grid[row][column]
    const firstCard = grid[firstItem.row][firstItem.column]

    if (firstCard !== clickedCard) {
      setTimeout(() => {
        newIsRevealed[row][column] = false
        newIsRevealed[firstItem.row][firstItem.column] = false
        setIsRevealed([...newIsRevealed])
      }, 1000)
    } else {
      const won = isRevealed.flat().every((state) => state)
      if (won) {
        setTimeout( () => {
          alert('You won!')
        }, 1000)
      }
    }
    
    setFirstItem(undefined)
  }

  return (
    <div className="App">
      <div className='grid'>
        {grid.map( (row, rowIndex) => (
          <div className='row' key={rowIndex}>{row.map( (number, columnIndex) => (
            <div className='card' key={columnIndex} 
              onClick={ () => selectedCard(rowIndex, columnIndex)}>
              {isRevealed[rowIndex][columnIndex] ? number : ''}
            </div>
          ))}</div>
        ))}
      </div>
    </div>
  );
}

export default App;
