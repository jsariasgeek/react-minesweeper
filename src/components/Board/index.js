import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { BoardWrapper, GameInfo, Clear } from './styles'
import { createEmptyArray, plantMines, getNeighboringMines } from './utils'
import Cell from './Cell'

export default function Board(props) {
  const { width, height, mines } = props

  const [gameStatus, setGameStatus] = useState('Game in Progress')
  const [mineCount, setMineCount] = useState(mines)
  const [boardData, setBoardData] = useState([])


  useEffect(() => {
    const initBoardData = () => {
      let data = createEmptyArray()
      data = plantMines(data, width, height, mines)
      data = getNeighboringMines(data, width, height)
      return data
    }
    setBoardData(initBoardData())
  }, [height, mines, width])

  return (
    <BoardWrapper>
      <GameInfo>
        <h1>{gameStatus}</h1>
        <span>Mines remaining:</span>
      </GameInfo>
      {boardData.map(dataRow => {
        return dataRow.map(dataItem => {
          return (
            <div key={dataItem.x * dataRow.length + dataItem.y}>
              <Cell {...dataItem}>{dataRow[dataRow.length - 1] === dataItem ? <Clear /> : ""}</Cell>
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