import type { IExecuteFunctions } from "n8n-workflow"
import { bridgeRequest } from "../index"

export async function pauseMonitor(ef: IExecuteFunctions, itemIndex: number) {
  const id = ef.getNodeParameter("id", itemIndex, 0) as number

  return await bridgeRequest(ef, "/emit", {
    event: "pauseMonitor",
    payload: id,
  })
}
