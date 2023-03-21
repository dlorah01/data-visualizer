import Utils from "src/app/feature-modules/helpers/utils"
import { Item } from "../../models/item"

export async function quickSorting(arr: Item[], left = 0, right = arr.length - 1): Promise<void> {
  if (left < right) {
      let pivotIndex = await pivot(arr, left, right)
      //left
      quickSorting(arr, left, pivotIndex - 1)
      //right
      quickSorting(arr, pivotIndex + 1, right)
  }
}

async function pivot(arr: Item[], start: number = 0, end: number = arr.length - 1) {
  let pivot  = arr[start]
  let swapIndex = start
  for (let i = start + 1; i <= end; i++) {
      arr[start].selected = true
      if (pivot.value > arr[i].value) {
          swapIndex++
          swap(arr, swapIndex, i)
          await Utils.sleep()
      }
  }
  swap(arr, start, swapIndex)
  return swapIndex
}

async function swap (arr: Item[], i: number, j: number) {
  arr[i].selected = true, arr[j].selected = true;
  [arr[i], arr[j]] = [arr[j], arr[i]]
  await Utils.sleep()
  arr[i].selected = false, arr[j].selected = false;
  arr[i].sorted = true, arr[j].sorted = true;
}
