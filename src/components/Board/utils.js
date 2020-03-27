import cloneDeep from 'lodash/cloneDeep'

export function getRandomNumber(dimension) {
  return Math.floor((Math.random() * 1000) + 1) % dimension
}

/**
 * function responsible for create the inital empty array
 */
export const createEmptyArray = (width, height) => {
  const data = []
  for (let i = 0; i < height; i++) {
    data.push([])
    for (let j = 0; j < width; j++) {
      data[i][j] = {
        x: i,
        y: j,
        isMine: false,
        neighboringMines: 0,
        isRevealed: false,
        isEmpty: false,
        isFlagged: false
      }
    }
  }
  return data
}




/**
   * This method is responsible for planting the mines on the board
   */
export const plantMines = (data, width, height, mines) => {
  let randomX, randomY, minesPlanted = 0
  while (minesPlanted < mines) {
    randomX = getRandomNumber(width)
    randomY = getRandomNumber(height)
    if (!data[randomX][randomY].isMine) {
      data[randomX][randomY].isMine = true
      minesPlanted++
    }
  }
  return data
}

/**
 * This method is responsible for calculate the Neighbouring Mines for each cell
 * on the board
 * @param {*} data 
 */
export const getNeighboringMines = (data, width, height) => {
  let updatedData = cloneDeep(data)
  for (let i = 0; i < height; i++) {
    for (let j = 0; j < width; j++) {
      if (!data[i][j].isMine) {
        let mine = 0
        const area = traverseBoard(data[i][j].x, data[i][j].y, data)
        area.map(value => {
          if (value.isMine) {
            mine++
          }
        })
        if (mine === 0) {
          updatedData[i][j].isEmpty = true
        }
        updatedData[i][j].neighboringMines = mine
      }
    }
  }
  return updatedData
}


/**
 * Looks for neighbouring cells and returns them
 */
const traverseBoard = (x, y, data, width, height) => {
  const el = []

  //up
  if (x > 0) {
    el.push(data[x - 1][y])
  }

  //down
  if (x < height - 1) {
    el.push(data[x + 1][y])
  }

  //left
  if (y > 0) {
    el.push(data[x][y - 1])
  }

  //right
  if (y < width - 1) {
    el.push(data[x][y + 1])
  }

  //top left
  if (x > 0 && y > 0) {
    el.push(data[x - 1][y - 1])
  }

  //top right
  if (x > 0 && y < width - 1) {
    el.push(data[x - 1][y + 1])
  }

  //bottom right
  if (x < height - 1 && y < width - 1) {
    el.push(data[x + 1][y + 1])
  }

  //bottom left
  if (x < height - 1 && y > 0) {
    el.push(data[x + 1][y - 1])
  }

  return el
}

export const revealEmpty = (x, y, data, width, height) => {
  let area = traverseBoard(x, y, data, width, height)
  area.forEach(cell => {
    if (!cell.isFlagged && !cell.isRevealed && (cell.isEmpty || !cell.isMine)) {
      data[cell.x][cell.y].isRevealed = true
      if (cell.isEmpty) {
        revealEmpty(cell.x, cell.y, data)
      }
    }
  })
  return data
}

/** Get Hidden Cells */
export const getHidden = data => {
  let mineArray = []
  data.map(dataRow => {
    return dataRow.map(dataItem => {
      if (!dataItem.isRevealed) {
        mineArray.push(dataItem)
      }
    })
  })
  return mineArray
}

/**Get Flags */
export const getFlags = data => {
  let mineArray = []
  data.map(dataRow => {
    dataRow.map(dataItem => {
      if (dataItem.isFlagged) {
        mineArray.push(dataItem)
      }
    })
  })
  return mineArray
}

/**Get Mines */
export const getMines = data => {
  let mineArray = []
  data.forEach(dataRow => {
    dataRow.forEach(dataItem => {
      if (dataItem.isMine) {
        mineArray.push(dataItem)
      }
    })
  })
  return mineArray
}