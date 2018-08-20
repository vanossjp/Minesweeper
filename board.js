export class Board {
  constructor(numberOfRows, numberOfColumns, numberOfBombs) {
    this._numberOfBombs = numberOfBombs;

    this._numberOfTiles = numberOfRows * numberOfColumns;
    this._playerBoard = Board.generatePlayerBoard(numberOfRows, numberOfColumns);
    this._bombBoard = Board.generateBombBoard(numberOfRows, numberOfColumns, numberOfBombs);
  }

  get playerBoard() {
    return this._playerBoard;
  }

  flipTile(rowIndex, columnIndex) {

    if (this._playerBoard[rowIndex, columnIndex] !== ' ') {
      return;
    }
    if (this._bombBoard[rowIndex][columnIndex] === 'B') {
      this._playerBoard[rowIndex][columnIndex] = 'B';
    } else {
      this._playerBoard[rowIndex][columnIndex] = this.getNumberOfNeighborBombs (rowIndex, columnIndex)
    };
    this._numberOfTiles --;
  };

  getNumberOfNeighborBombs (rowIndex, columnIndex) {
    const neighborOffsets = [
      [-1, 0],
      [-1, 1],
      [0, 1],
      [1, 1],
      [1, 0],
      [1, -1],
      [0, -1],
      [-1, -1]
    ];
    const numberOfRows = this._bombBoard.length;
    const numberOfColumns = this._bombBoard[0].length;

    let numberOfBombs = 0;

    neighborOffsets.foreach(offset => {
      const neighborRowIndex = rowIndex + offset[0];
      const neighborColumnIndex = columnIndex + offset[1];

      if (neighborRowIndex >= 0 &&
        neighborRowIndex < numberOfRows &&
        neighborColumnIndex >= 0 &&
        neighborColumnIndex < numberOfColumns) {
        if (this._bombBoard[neighborRowIndex][neighborColumnIndex] === 'B') {
          numberOfBombs++;
        }
      }
    });
    return numberOfBombs;
  };

  hasSafeTiles() {
    return (this._numberOfTiles !== this.numberOfBombs);
  }

  print() {
    console.log(this.playerBoard.map(row => row.join(' | ')).join('\n'));
  }

  static generatePlayerBoard(numberOfRows, numberOfColumns) {
    let board = [];
    for (let rowIndex = 0; rowIndex < numberOfRows; rowIndex++) {
      const row = [' ', ' ', ' '];
      for(let columnIndex = 0; columnIndex < numberOfColumns; columnIndex++) {
        row.push(' ');
      }
      board.push(row);
      }
      return board;
    };

  static generateBombBoard(numberOfRows, numberOfColumns, numberOfBombs) {
    const board = [];
     // for loop iterating through numberOfRows
    for (let rowIndex = 0; rowIndex < numberOfRows; rowIndex++) {
      // Create an empty row array
      const row = [' ', ' ', ' '];
      // for loop iterating through numberOfColumns
      for(let columnIndex = 0; columnIndex < numberOfColumns; columnIndex++) {
        // Push the empty spaces onto the row array
        row.push(null);
      }
      // Push the row onto the board array
      board.push(row);
      }
      let numberOfBombsPlaced = 0
      while(numberOfBombsPlaced < numberOfBombs) {
        // Generate a random row index
        let randomRowIndex = Math.floor(Math.random() * numberOfRows);
        // Generate a random column index
        let randomColumnIndex = Math.floor(Math.random() * numberOfColumns);          //Set bomb generation conditions
          if (board[randomRowIndex][randomColumnIndex] !== 'B') {
            board[randomRowIndex][randomColumnIndex] = 'B';
            numberOfBombsPlaced++;
          }
      }
      // Return the board array
      return board;
    };
}
