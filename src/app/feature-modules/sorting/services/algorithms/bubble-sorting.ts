import Utils from "src/app/feature-modules/helpers/utils"
import { Item } from "../../models/item"

export async function bubbleSorting(arr: Item[]): Promise<void> {
  for (let i = arr.length; i > 0; i--) {
    for (let j = 0; j < i -1; j++) {
      arr[j].selected = true
      arr[j + 1].selected = true
        if (arr[j].value > arr[j + 1].value) {
          [arr[j], arr[j+1]] = [arr[j + 1], arr[j]]
        }
        await Utils.sleep()
      arr[j].selected = false
      arr[j + 1].selected = false
    }
    arr[i - 1].sorted = true
  }
}
