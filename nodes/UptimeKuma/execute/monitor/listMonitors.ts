import type { IExecuteFunctions } from "n8n-workflow"
import { bridgeRequest } from "../index"

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function listMonitors(ef: IExecuteFunctions, itemIndex: number) {
  return await bridgeRequest(ef, "/monitors", {})
}
