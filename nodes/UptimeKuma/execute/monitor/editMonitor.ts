import type { IExecuteFunctions } from "n8n-workflow"
import { bridgeRequest } from "../index"
import { buildMonitorPayload } from "./addMonitor"

export async function editMonitor(ef: IExecuteFunctions, itemIndex: number) {
  return await bridgeRequest(ef, "/emit", {
    event: "editMonitor",
    payload: buildMonitorPayload(ef, itemIndex),
  })
}
