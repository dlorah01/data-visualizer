import Utils from "src/app/feature-modules/helpers/utils";
import { NodeTree } from "../../models/node";

export async function dfsPostOrder(arr: NodeTree[], data: NodeTree[]): Promise<void> {
        let node = arr[0]
        async function traverse(node: NodeTree): Promise<void> {
          await Utils.sleep(300)
          node.selected = true
          await Utils.sleep(300)
          if (node.left !== -1) await traverse(arr[node.left])
          if (node.right !== -1) await traverse(arr[node.right])
          await Utils.sleep(300)
          await data.push(node)
          await Utils.sleep(300)
          node.selected = false
          node.traversed = true
        }
        await traverse(node)
}
