import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { BoardWrapper, GameInfo, Clear } from './styles'
import { createEmptyArray, plantMines, getNeighboringMines, revealEmpty, getHidden, getFlags } from './utils'
import Cell from './Cell'

export default function Board(props) {
  const { width, height, mines } = props

  const [gameStatus, setGameStatus] = useState('Game in Progress')
  const [mineCount, setMineCount] = useState(mines)
  const [boardData, setBoardData] = useState([])


  useEffect(() => {
    const initBoardData = () => {
      let data = createEmptyArray(width, height)
      data = plantMines(data, width, height, mines)
      data = getNeighboringMines(data, width, height)
      return data
    }
    setBoardData(initBoardData())
  }, [height, mines, width])

  const revealBoard = () => {
    let updatedData = boardData
    updatedData.map(dataRow => {
      return dataRow.map(dataItem => {
        return dataItem.isRevealed = true
      })
    })
    setBoardData(updatedData)
  }

  const handleCellClick = (x, y) => {
    const cell = boardData[x][y]
    // check if revealed. return if true
    if (cell.isRevealed || cell.isFlagged) {
      return null
    }

    // check if mine. game over if true
    if (cell.isMine) {
      setGameStatus("You Lost.")
      revealBoard()
      alert("Game Over")
    }

    let updatedData = boardData
    const updatedCell = updatedData[x][y]
    updatedCell.isFlagged = false
    updatedCell.isRevealed = true
    if (updatedCell.isEmpty) {
      updatedData = revealEmpty(x, y, updatedData, width, height)
    }
    // if there is no mines left. You win the game.
    if (getHidden(updatedData).length === mines) {
      setMineCount(0)
      setGameStatus("You Win.")
      revealBoard()
      alert("You Win")
    }

    setBoardData(updatedData)
    setMineCount(mineCount - getFlags(updatedData).length)


  }

  return (
    <BoardWrapper>
      <GameInfo>
        <h1>{gameStatus}</h1>
        <span>Mines remaining: {mineCount}</span>
      </GameInfo>
      {boardData.map(dataRow => {
        return dataRow.map(dataItem => {
          return (
            <div
              key={dataItem.x * dataRow.length + dataItem.y}
              onClick={() => handleCellClick(dataItem.x, dataItem.y)}>
              <Cell
                key={Math.random()}
                {...dataItem}
              />
              {(dataRow[dataRow.length - 1] === dataItem) ? <Clear /> : ""}
            </div>
          )
        })
      })}
    </BoardWrapper >
  )

}

Board.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  mines: PropTypes.number
}

Board.defaultProps = {
  width: 8,
  height: 8,
  mines: 16
}