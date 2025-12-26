import type { ICredentialType, INodeProperties } from "n8n-workflow"

export class UptimeKuma implements ICredentialType {
  name = "uptimeKumaApi"

  displayName = "Uptime Kuma API"

  properties: INodeProperties[] = [
    {
      displayName: "Bridge URL",
      name: "bridgeUrl",
      type: "string",
      default: "",
      placeholder: "http://localhost:3000",
      required: true,
    },
    {
      displayName: "Uptime Kuma URL",
      name: "kumaUrl",
      type: "string",
      default: "",
      placeholder: "http://localhost:3001",
      required: true,
    },
    {
      displayName: "Username",
      name: "username",
      type: "string",
      default: "",
      required: true,
    },
    {
      displayName: "Password",
      name: "password",
      type: "string",
      typeOptions: { password: true },
      default: "",
      required: true,
    },
  ]
}
