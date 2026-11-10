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
      // Delete Monitor
      name: "Delete Monitor",
      action: "Delete an existing monitor",
      description: "Delete an existing Monitor",
      value: "delete-monitor",
    },
    {
      // Edit Monitor
      name: "Edit Monitor",
      action: "Edit an existing monitor",
      description: "Edit an existing Monitor",
      value: "edit-monitor",
    },
    {
      // List Monitors
      name: "List Monitors",
      action: "List all monitors",
      description: "List all Monitors",
      value: "list-monitors",
    },
    {
      name: "Pause Monitor",
      action: "Pause an active monitor",
      description: "Pause monitoring for an existing monitor",
      value: "pause-monitor",
    },
    {
      name: "Play Monitor",
      action: "Resume a paused monitor",
      description: "Resume monitoring for an existing monitor",
      value: "play-monitor",
    },
  ],

  // Define default to "New Monitor"
  default: "add-monitor",
}
