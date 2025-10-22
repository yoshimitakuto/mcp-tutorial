import { Server } from "@modelcontextprotocol/sdk/server/index.js";

const server = new Server(
  {
    name: "mcp-tutorial",
    version: "1.0.0",
  },
  {
    capabilities: {
      tools: {},
    },
  }
);
