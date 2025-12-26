import type {
  IDataObject,
  IExecuteFunctions,
  ILoadOptionsFunctions,
  INodeExecutionData,
  INodePropertyOptions,
  INodeType,
  INodeTypeDescription,
} from "n8n-workflow"
import {
  NodeApiError,
  NodeConnectionTypes,
  NodeOperationError,
} from "n8n-workflow"

import { kumaNodeProperties } from "./properties"
import { resourceOperationsFunctions, bridgeRequest } from "./execute"

export class UptimeKuma implements INodeType {
  description: INodeTypeDescription = {
    displayName: "Uptime Kuma",
    name: "uptimeKuma",
    icon: { light: "file:uptime-kuma.svg", dark: "file:uptime-kuma.dark.svg" },
    group: ["input"],
    version: 1,
    description: "Uptime Kuma Node",
    defaults: {
      name: "Uptime Kuma",
    },
    inputs: [NodeConnectionTypes.Main],
    outputs: [NodeConnectionTypes.Main],
    usableAsTool: true,
    credentials: [
      {
        name: "uptimeKumaApi",
        required: true,
      },
    ],
    // The structure of the node's properties:
    // • Resources: Recursos available (Ex: Monitor, ...)
    // • Operations: Operation on each resource (Ex: Add Monitor, ...)
    // • Fields: Fields to fill in for each operation
    properties: kumaNodeProperties,
  }

  methods = {
    loadOptions: {
      async getMonitorGroups(
        this: ILoadOptionsFunctions
      ): Promise<INodePropertyOptions[]> {
        const response = await bridgeRequest(this, "/groups", {})

        return [
          { name: "No Group", value: "" },
          ...(response as Array<{ name: string; id: string | number }>).map((group) => ({
            name: group.name,
            value: group.id,
          })),
        ]
      },
      // async getNotifications(
      //   this: ILoadOptionsFunctions
      // ): Promise<INodePropertyOptions[]> {
      //   let response = await bridgeRequest(this, "/notifications", {})

      //   return response.map((notification: any) => ({
      //     name: notification.name,
      //     value: notification.id,
      //   }))
      // },
    },
  }

  async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
    const items = this.getInputData()

    const returnData: INodeExecutionData[] = []

    // Iterates over all input items
    for (let itemIndex = 0; itemIndex < items.length; itemIndex++) {
      try {
        const resource = this.getNodeParameter("resource", itemIndex) as string
        const operation = this.getNodeParameter(
          "operation",
          itemIndex
        ) as string

        const nResults = ["monitor-api--list-monitors"]

        const fn = resourceOperationsFunctions[resource]?.[operation]

        // If the function is not found, return an error
        if (!fn) {
          throw new NodeApiError(this.getNode(), {
            message: "Operation not supported.",
            description: `The function "${operation}" for the resource "${resource}" is not supported!`,
          })
        }

        // Execute the function
        const responseData = await fn(this, itemIndex)

        if (nResults.includes(resource + "--" + operation)) {
          (responseData as IDataObject[]).forEach((item) => {
            returnData.push({
              json: item,
              pairedItem: { item: itemIndex },
            })
          })
        } else {
          returnData.push({
            json: responseData as IDataObject,
            pairedItem: { item: itemIndex },
          })
        }
      } catch (error) {
        if (this.continueOnFail()) {
          returnData.push({
            json: { error: error.message },
            pairedItem: { item: itemIndex },
          })
        } else {
          // Adding `itemIndex` allows other workflows to handle this error
          if (error.context) {
            // If the error thrown already contains the context property,
            // only append the itemIndex
            error.context.itemIndex = itemIndex
            throw error
          }

          throw new NodeOperationError(this.getNode(), error, {
            itemIndex,
          })
        }
      }
    }

    return [returnData]
  }
}
