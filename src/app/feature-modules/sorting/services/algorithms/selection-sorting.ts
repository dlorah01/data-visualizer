import Utils from "src/app/feature-modules/helpers/utils"
import { Item } from "../../models/item"

export async function selectionSorting(arr: Item[]): Promise<void> {
  for (let i = 0; i < arr.length; i++) {
    let smallest = i
    for (let j = i + 1; j < arr.length; j++) {
      arr[i].selected = true
      arr[j].selected = true
        if (arr[j].value < arr[smallest].value) {
            smallest = j
          }
          await Utils.sleep()
        arr[i].selected = false
        arr[j].selected = false
    }
    if (i !== smallest){
      [arr[smallest], arr[i]] = [arr[i], arr[smallest]]
      await Utils.sleep()
    }
    arr[i].sorted = true
  }
}
