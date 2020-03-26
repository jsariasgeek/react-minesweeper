import React from 'react'
import PropTypes from 'prop-types'
import { CellWrapper } from './styles'

function Cell(props) {
  const { isRevealed, isFlagged, isMine, neighboringMines } = props

  const getValue = () => {
    if (!isRevealed) {
      return isFlagged ? "🚩" : null
    }
    if (isMine) {
      return "💣"
    }
    if (neighboringMines === 0) {
      return null
    }
    return neighboringMines
  }

  return (
    <CellWrapper>{getValue}</CellWrapper>
  )

}

Cell.propTypes = {
  isRevealed: PropTypes.bool,
  isFlagged: PropTypes.bool,
  isMine: PropTypes.bool,
  neighboringMines: PropTypes.number
}

Cell.propTypes = {
  isRevealed: false,
  isFlagged: false,
  isMine: false,
  neighboringMines: 0
}

export default Cell