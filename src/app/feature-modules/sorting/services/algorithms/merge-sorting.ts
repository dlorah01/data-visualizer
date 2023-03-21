import { Item } from "../../models/item";

async function merge(arr1: Item[], arr2: Item[]) {
  let results = [];
  let i = 0;
  let j = 0;
  while (i < arr1.length && j < arr2.length) {
    if (arr2[j].value > arr1[i].value) {
      results.push(arr1[i]);
      i++;
    } else {
      results.push(arr2[j]);
      j++;
    }
  }
  while (i < arr1.length) {
    results.push(arr1[i]);
    i++;
  }
  while (j < arr2.length) {
    results.push(arr2[j]);
    j++;
  }
  return results;
}

// Recrusive Merge Sort
export async function mergeSorting(arr: Item[]) {
  console.log('tamaño de entrada', arr.length)
  if (arr.length <= 1) {
    arr = [...arr]
  }
  else {
    let mid = Math.floor(arr.length / 2);
    let left = [];
    for (let i = 0; i < mid; i++) {
      left.push({...arr[i]})
    }
    await mergeSorting(left)
    let right = [];
    for (let i = mid; i < arr.length; i++) {
      right.push({...arr[i]})
    }
    console.log('right 1', right)
    await mergeSorting(right)
    console.log('right 2', right)
    arr = await merge(left, right)
    console.log('tamano slaida', arr.length)
  }
}
