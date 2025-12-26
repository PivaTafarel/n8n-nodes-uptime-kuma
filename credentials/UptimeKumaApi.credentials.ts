import type { 
  IAuthenticateGeneric,
  ICredentialTestRequest,
  ICredentialType, 
  INodeProperties 
} from "n8n-workflow"

export class UptimeKumaApi implements ICredentialType {
  name = "uptimeKumaApi"

  displayName = "Uptime Kuma API"
  documentationUrl = 'https://github.com/louislam/uptime-kuma/wiki';
  icon = 'file:uptime-kuma.svg' as const;
  
  authenticate: IAuthenticateGeneric = {
    type: 'generic',
    properties: {},
  };

  test: ICredentialTestRequest = {
    request: {
      method: 'GET',
      url: '={{$credentials.bridgeUrl}}/health',
    },
  };

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
