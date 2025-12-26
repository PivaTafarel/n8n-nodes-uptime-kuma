import type { IExecuteFunctions } from "n8n-workflow"
import { bridgeRequest } from "../index"

export function buildMonitorPayload(ef: IExecuteFunctions, itemIndex: number) {
  const monitorData: Record<string, unknown> = {}

  const id = ef.getNodeParameter("id", itemIndex, 0) as number

  if (id) {
    monitorData.id = id
  }

  const type = (monitorData.type = ef.getNodeParameter(
    "type",
    itemIndex
  ) as string)
  monitorData.name = ef.getNodeParameter("name", itemIndex) as string
  monitorData.interval = ef.getNodeParameter(
    "interval",
    itemIndex,
    60
  ) as number
  monitorData.maxretries = ef.getNodeParameter(
    "maxretries",
    itemIndex,
    3
  ) as number
  monitorData.retryInterval = ef.getNodeParameter(
    "retryInterval",
    itemIndex,
    60
  ) as number
  monitorData.resendInterval = ef.getNodeParameter(
    "resendInterval",
    itemIndex,
    0
  ) as number
  monitorData.expiryNotification = ef.getNodeParameter(
    "expiryNotification",
    itemIndex,
    false
  ) as boolean
  monitorData.upsideDown = ef.getNodeParameter(
    "upsideDown",
    itemIndex,
    false
  ) as boolean
  monitorData.parent = ef.getNodeParameter("parent", itemIndex, "") as string
  monitorData.description = ef.getNodeParameter(
    "description",
    itemIndex,
    ""
  ) as string
  const notificationIDList = ef.getNodeParameter(
    "notificationIDList",
    itemIndex,
    ""
  ) as string

  if (notificationIDList) {
    monitorData.notificationIDList = JSON.parse(notificationIDList)
  }

  // Optional fields based on type
  if (["http"].includes(type)) {
    monitorData.url = ef.getNodeParameter("url", itemIndex) as string
    monitorData.timeout = ef.getNodeParameter(
      "timeout",
      itemIndex,
      48
    ) as number
    monitorData.ignoreTls = ef.getNodeParameter(
      "ignoreTls",
      itemIndex,
      false
    ) as boolean
    monitorData.cacheBust = ef.getNodeParameter(
      "cacheBust",
      itemIndex,
      false
    ) as boolean
    monitorData.maxredirects = ef.getNodeParameter(
      "maxredirects",
      itemIndex,
      10
    ) as number
    monitorData.accepted_statuscodes = JSON.parse(
      `["${ef.getNodeParameter("accepted_statuscodes", itemIndex, "200-299") as string}"]`
    )
    monitorData.ipFamily = ef.getNodeParameter(
      "ipFamily",
      itemIndex,
      ""
    ) as string
    monitorData.method = ef.getNodeParameter(
      "method",
      itemIndex,
      "GET"
    ) as string
  }

  return monitorData
}

export async function addMonitor(ef: IExecuteFunctions, itemIndex: number) {
  return await bridgeRequest(ef, "/emit", {
    event: "add",
    payload: buildMonitorPayload(ef, itemIndex),
  })
}
