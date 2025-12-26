import type { INodeProperties } from "n8n-workflow"

export const monitorOperationsOptions: INodeProperties = {
  displayName: "Operation",
  name: "operation",
  type: "options",
  noDataExpression: true,
  displayOptions: {
    show: {
      resource: ["monitor-api"], // Value defined in properties/index.ts
    },
  },

  // Allowed operations for the "Monitor" resource
  options: [
    {
      // Create Monitor
      name: "Add Monitor",
      action: "Create a new monitor",
      description: "Create a new Monitor",
      value: "add-monitor",
    },
    {
      // Edit Monitor
      name: "Edit Monitor",
      action: "Edit an existing monitor",
      description: "Edit an existing Monitor",
      value: "edit-monitor",
    },
    {
      // Delete Monitor
      name: "Delete Monitor",
      action: "Delete an existing monitor",
      description: "Delete an existing Monitor",
      value: "delete-monitor",
    },
    {
      // List Monitors
      name: "List Monitors",
      action: "List all monitors",
      description: "List all Monitors",
      value: "list-monitors",
    },
  ],

  // Define default to "New Monitor"
  default: "add-monitor",
}
