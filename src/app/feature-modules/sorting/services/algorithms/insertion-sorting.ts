import Utils from "src/app/feature-modules/helpers/utils";
import { Item } from "../../models/item";

export async function insertionSorting(arr: Item[]): Promise<void> {
  for (let i = 0; i < arr.length; i++) {
      arr[i].selected = true
      let currentVal =  arr[i]
      let finalJ = i - 1 >= 0 ? i - 1 : 0
      for (let j = i - 1; j >= 0  && arr[j].value > currentVal.value; j--) {
          arr[j].selected = true;
          arr[j + 1].selected = true;
          [arr[j], arr[j+1]] = [currentVal, arr[j]]
          await Utils.sleep()
          arr[j].selected = false;
          arr[j + 1].selected = false;
          finalJ = j
      }
      arr[finalJ].sorted = true
      arr[i].selected = false
  }
  arr[arr.length - 1].sorted = true
}
