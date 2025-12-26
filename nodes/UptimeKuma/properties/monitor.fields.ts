import type { INodeProperties } from "n8n-workflow"

export const monitorFields: INodeProperties[] = [
  // Add and Edit Monitor Fields
  {
    displayName: "Monitor ID",
    name: "id",
    type: "number",
    default: "",
    required: true,
    displayOptions: {
      show: {
        resource: ["monitor-api"],
        operation: ["edit-monitor", "delete-monitor"],
      },
    },
  },
  {
    displayName: "Monitor Type",
    name: "type",
    type: "options",
    default: "http",
    required: true,
    options: [{ name: "HTTP(s)", value: "http" }],
    displayOptions: {
      show: {
        resource: ["monitor-api"],
        operation: ["add-monitor", "edit-monitor"],
      },
    },
  },
  {
    displayName: "Friendly Name",
    name: "name",
    type: "string",
    default: "",
    required: true,
    displayOptions: {
      show: {
        resource: ["monitor-api"],
        operation: ["add-monitor", "edit-monitor"],
      },
    },
  },
  {
    displayName: "URL",
    name: "url",
    type: "string",
    default: "",
    required: true,
    displayOptions: {
      show: {
        resource: ["monitor-api"],
        operation: ["add-monitor", "edit-monitor"],
        type: ["http"],
      },
    },
  },
  {
    displayName: "Heartbeat Interval",
    name: "interval",
    type: "number",
    default: 60,
    required: true,
    description: "Heartbeat Interval (Check every X seconds)",
    displayOptions: {
      show: {
        resource: ["monitor-api"],
        operation: ["add-monitor", "edit-monitor"],
      },
    },
  },
  {
    displayName: "Retries",
    name: "maxretries",
    type: "number",
    default: 3,
    description:
      "Maximum retries before the service is marked as down and a notification is sent",
    displayOptions: {
      show: {
        resource: ["monitor-api"],
        operation: ["add-monitor", "edit-monitor"],
      },
    },
  },
  {
    displayName: "Heartbeat Retry Interval",
    name: "retryInterval",
    type: "number",
    default: 60,
    description: "Heartbeat Retry Interval (Retry every X seconds)",
    displayOptions: {
      show: {
        resource: ["monitor-api"],
        operation: ["add-monitor", "edit-monitor"],
      },
    },
  },
  {
    displayName: "Request Timeout",
    name: "timeout",
    type: "number",
    default: 48,
    description: "Request Timeout (Timeout after X seconds)",
    displayOptions: {
      show: {
        resource: ["monitor-api"],
        operation: ["add-monitor", "edit-monitor"],
        type: ["http"],
      },
    },
  },
  {
    displayName: 'Resend Notification if Down X Times Consecutively',
    name: "resendInterval",
    type: "number",
    default: 0,
    description:
      "Resend Notification if Down X times consecutively (Resend every X times) - (0 = desabilitado)",
    displayOptions: {
      show: {
        resource: ["monitor-api"],
        operation: ["add-monitor", "edit-monitor"],
      },
    },
  },
  {
    displayName: "Certificate Expiry Notification",
    name: "expiryNotification",
    type: "boolean",
    default: false,
    description: "Whether to enable certificate expiry notification",
  },
  {
    displayName: 'Ignore TLS/SSL Errors for HTTPS Websites',
    name: "ignoreTls",
    type: "boolean",
    default: false,
    description: "Whether to ignore TLS/SSL errors for HTTPS websites",
    displayOptions: {
      show: {
        resource: ["monitor-api"],
        operation: ["add-monitor", "edit-monitor"],
        type: ["http"],
      },
    },
  },
  {
    displayName: 'Add the \'Uptime_kuma_cachebuster\' Parameter',
    name: "cacheBust",
    type: "boolean",
    default: false,
    description: 'Whether to add a randomly generated parameter to skip caches',
    displayOptions: {
      show: {
        resource: ["monitor-api"],
        operation: ["add-monitor", "edit-monitor"],
        type: ["http"],
      },
    },
  },
  {
    displayName: "Upside Down Mode",
    name: "upsideDown",
    type: "boolean",
    default: false,
    description:
      "Whether to flip the status upside down. If the service is reachable, it is DOWN.",
    displayOptions: {
      show: {
        resource: ["monitor-api"],
        operation: ["add-monitor", "edit-monitor"],
      },
    },
  },
  {
    displayName: "Max Redirects",
    name: "maxredirects",
    type: "number",
    default: 10,
    description:
      "Maximum number of redirects to follow. Set to 0 to disable redirects.",
    displayOptions: {
      show: {
        resource: ["monitor-api"],
        operation: ["add-monitor", "edit-monitor"],
        type: ["http"],
      },
    },
  },
  {
    displayName: "Accepted Status Codes",
    name: "accepted_statuscodes",
    type: "string",
    default: "200-299",
    description: 'Select status codes which are considered as a successful response',
    displayOptions: {
      show: {
        resource: ["monitor-api"],
        operation: ["add-monitor", "edit-monitor"],
        type: ["http"],
      },
    },
  },
  {
    displayName: "IP Family",
    name: "ipFamily",
    type: "options",
    default: "",
    description: 'Uses the Happy Eyeballs algorithm for determining the IP family',
    options: [
      { name: "Auto Select", value: "" },
      { name: "IPv4", value: "ipv4" },
      { name: "IPv6", value: "ipv6" },
    ],
    displayOptions: {
      show: {
        resource: ["monitor-api"],
        operation: ["add-monitor", "edit-monitor"],
        type: ["http"],
      },
    },
  },
  {
    displayName: 'Monitor Group Name or ID',
    name: "parent",
    type: "options",
				description: 'Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>',
    default: "",
    typeOptions: {
      loadOptionsMethod: "getMonitorGroups",
    },
    displayOptions: {
      show: {
        resource: ["monitor-api"],
        operation: ["add-monitor", "edit-monitor"],
      },
    },
  },
  {
    displayName: "Description",
    name: "description",
    type: "string",
    default: "",
    displayOptions: {
      show: {
        resource: ["monitor-api"],
        operation: ["add-monitor", "edit-monitor"],
      },
    },
  },
  {
    displayName: "Notifications",
    name: "notificationIDList",
    type: "json",
    default: "",
    displayOptions: {
      show: {
        resource: ["monitor-api"],
        operation: ["add-monitor", "edit-monitor"],
      },
    },
  },
  {
    displayName: "HTTP Options",
    name: "httpOptions",
    type: "collection",
    default: {},
    placeholder: "HTTP Options",
    displayOptions: {
      show: {
        resource: ["monitor-api"],
        operation: ["add-monitor", "edit-monitor"],
        type: ["http"],
      },
    },
    options: [
      {
        displayName: "Method",
        name: "method",
        type: "options",
        default: "GET",
        options: [{ name: "GET", value: "GET" }],
      },
    ],
  },
]
