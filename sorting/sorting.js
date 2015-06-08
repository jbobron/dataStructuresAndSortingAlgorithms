/* Quick Sort */

//https://www.youtube.com/watch?v=aQiWF4E8flQ
function quickSort(array) {
  var wall = 0;
  var currentIndex = 0;
  var pivotIndex = array.length-1;
  var temp;
  if(array.length <= 1){
    return array;
  }
  while(currentIndex < pivotIndex){
    if(array[currentIndex] < array[pivotIndex]){
      temp = array[currentIndex];
      array[currentIndex] = array[wall];
      array[wall] = temp;
      wall = wall + 1;
    }
    currentIndex++;
  }
  //ex: array @ this point equals [2,3,1,7,5,6,4]
  //ex: return quickSort([2,3,1]) + pivot + quickSort([7,5,6])
  return quickSort(array.slice(0,wall)).concat(array[pivotIndex]).concat(quickSort(array.slice(wall,pivotIndex)));
}
console.log(quickSort([7,2,5,3,1,6,4]));


/* merge sort */

function mergeSort(array) {
  function merge(left, right){
    var result = [];
    while(left.length && right.length){
      if(left[0] > right[0]){
        result.push(right.shift());
      } else {
        result.push(left.shift());
      }
    }
    while(left.length || right.length){
      if(left.length){
        result.push(left.shift());
      }else{
        result.push(right.shift());
      }
    }
    return result;
  }
  if(array.length === 1){
    return array;
  }
  var mid = Math.floor(array.length/2);
  var left = array.slice(0,mid);
  var right = array.slice(mid,array.length);
  return merge(mergeSort(left),mergeSort(right))
}
// console.log(mergeSort([6,7,2,1,5,4,3]));


/*bubble sort */

function bubbleSort(array){
  var isSorted;
  var temp;
  while(!isSorted){
    isSorted = true;
    for(var i = 0; i < array.length-1; i++){
      if(array[i] > array[i+1]){
        isSorted = false;
        temp = array[i];
        array[i] = array[i+1];
        array[i+1] = temp;
      }
    }
  }
  return array;
}
// console.log(bubbleSort([6,7,2,1,5,4,3]))

/*insertion sort */

function insertionSort(array){
  var isSorted = false;
  for(var i = 0; i < array.length; i++){
    var val = array[i];
    var hole = i;
    while(hole > 0 && val < array[hole-1]){
      array[hole] = array[hole-1];
      hole--;
    }
    array[hole] = val;
  }
  return array;
}
// console.log(insertionSort([6,7,2,1,5,4,3]))