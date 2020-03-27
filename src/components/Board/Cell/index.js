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
    <CellWrapper {...props}>{getValue()}</CellWrapper>
  )

}

Cell.propTypes = {
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  isEmpty: PropTypes.bool, // The cell has/hasn't adjacent mines
  isRevealed: PropTypes.bool,
  isFlagged: PropTypes.bool,
  isMine: PropTypes.bool,
  neighboringMines: PropTypes.number
}

Cell.defaultProps = {
  isEmpty: true,
  isRevealed: false,
  isFlagged: false,
  isMine: false,
  neighboringMines: 0
}

export default Cell