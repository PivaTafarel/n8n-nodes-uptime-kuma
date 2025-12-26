import type { INodeProperties } from "n8n-workflow"

import { monitorFields } from "./monitor.fields"
import { monitorOperationsOptions } from "./monitor.operations"

const resourcesOptions: INodeProperties = {
  displayName: "Resource",
  name: "resource",
  type: "options",
  noDataExpression: true,
  options: [
    {
      name: "Monitor",
      value: "monitor-api",
    },
  ],
  default: "monitor-api",
}

export const kumaNodeProperties = [
  resourcesOptions,
  // Functions available when the "Monitor" resource is selected
  monitorOperationsOptions,
  // Fields available when some operation is selected
  ...monitorFields,
]
