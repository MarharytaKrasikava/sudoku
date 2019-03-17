module.exports = function solveSudoku(matrix) {
  let obj = fillObj(matrix);  
  solve (matrix);
  return matrix;

function findDoublesInRow(array, num, row) {
  for (let c = 0; c < 9; c++) {    
      if (array[row][c] == num) {
        return true;
      }
    }return false;
  }
function findDoublesInCol(array, num, col) {
  for (let r = 0; r < 9; r++) {
    if (array[r][col] == num) {
      return true;
    }
  }return false;
}
function findDoublesInSector (array, row, col, num){
  let blockRowStart = 3 * (Math.floor(row / 3));
  let blockColumnStart = 3 * (Math.floor(col / 3));
  for (let r = 0; r < 3; r++) {
    for (let c = 0; c < 3; c++) {            
      if (array[r + blockRowStart][c + blockColumnStart] == num) {
        return true;
      }
    }
  }return false;
}

function findDoubles(array, row, col, num){
  return !findDoublesInRow(array, num, row)  && !findDoublesInCol(array, num, col) && !findDoublesInSector (array, row, col, num);
}

  function findPossibleValues(array, i, j) {
    let allValues = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    for (let c = 0; c < 9; c++) {
      for (let val = 0; val < allValues.length; val++) {
        if (array[i][c] == allValues[val]) {
          allValues.splice(val, 1);
        }
      }
    }if (allValues.length > 1) {
      for (let r = 0; r < 9; r++) {
        for (let val = 0; val < allValues.length; val++) {
          if (array[r][j] == allValues[val]) {
            allValues.splice(val, 1);
          }
        }
      }if (allValues.length > 1) {
        let blockRowStart = 3 * (Math.floor(i / 3));
        let blockColumnStart = 3 * (Math.floor(j / 3));
        for (let r = 0; r < 3; r++) {
          for (let c = 0; c < 3; c++) {
            for (let val = 0; val < allValues.length; val++) {
              if (array[r + blockRowStart][c + blockColumnStart] == allValues[val]) {
                allValues.splice(val, 1);
              }
            }
          }
        }
      }
    }
    return (allValues);
  }
  function fillObj(array) {
    let zeroes = {};
    let s = 0;
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        if (array[i][j] == 0) {
          let foundValues=findPossibleValues(array, i, j);          
          if (foundValues.length==1){
            matrix[i][j]=foundValues[0];
            //alert (foundValues[0]);
            //alert (matrix[i][j]);
            fillObj(array);
          }
          else {zeroes[s] = findPossibleValues(array, i, j);}
        }
        s++;
      }
    }    
    return zeroes;
  }
  
  function solve(array) {   
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        if (array[i][j] == 0) {
          let key=j+9*i;
          let foundValues = obj[key];
          for (var v=0; v<foundValues.length; v++) {
            if (findDoubles(array, i, j, foundValues[v])){
              array[i][j]=foundValues[v];
              if (solve(array)) {
                return true;
              } else {
                array[i][j] = 0;
              }
            } 
          } return false;   
        }
      }
    } return true;
  }
  
}
