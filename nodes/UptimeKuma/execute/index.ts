import {
  NodeOperationError,
  type IExecuteFunctions,
  type ILoadOptionsFunctions,
} from "n8n-workflow"

import { addMonitor } from "./monitor/addMonitor"
import { deleteMonitor } from "./monitor/deleteMonitor"
import { editMonitor } from "./monitor/editMonitor"
import { listMonitors } from "./monitor/listMonitors"

type ResourceOperationFunctions = {
  [resource: string]: {
    [operation: string]: (
      ef: IExecuteFunctions,
      itemIndex: number
    ) => Promise<any>
  }
}

export const bridgeRequest = async (
  ef: IExecuteFunctions | ILoadOptionsFunctions,
  path: string,
  body: any
) => {
  try {
    console.log("Sending request to Uptime Kuma API:", path, body)
    const credentials = await ef.getCredentials("uptimeKumaApi")

    if (!credentials) {
      throw new NodeOperationError(ef.getNode(), "No credentials returned!")
    }

    body.uri = credentials.kumaUrl
    body.credentials = {
      username: credentials.username,
      password: credentials.password,
    }

    return await ef.helpers.httpRequest({
      method: "POST",
      url: `${credentials.bridgeUrl}${path}`,
      body,
      json: true,
    })
  } catch (error) {
    throw new NodeOperationError(
      ef.getNode(),
      `Failed to load monitor groups: ${error.message}`
    )
  }
}

// este dicionario é utilizado para mapear as operações disponíveis para cada recurso e operação para cada função
export const resourceOperationsFunctions: ResourceOperationFunctions = {
  "monitor-api": {
    "add-monitor": addMonitor,
    "delete-monitor": deleteMonitor,
    "edit-monitor": editMonitor,
    "list-monitors": listMonitors,
  },
}
