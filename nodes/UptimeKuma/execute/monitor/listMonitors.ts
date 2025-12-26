import type { IExecuteFunctions } from "n8n-workflow"
import { bridgeRequest } from ".."

export async function listMonitors(ef: IExecuteFunctions, itemIndex: number) {
  return await bridgeRequest(ef, "/monitors", {})
}
