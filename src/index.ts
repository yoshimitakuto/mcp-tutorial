import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";
import { z } from "zod";

const inputSchema = z.object({
  say: z.string().describe("The greeting message"),
});

const server = new Server(
  {
    name: "mcp-tutorial",
    version: "1.0.0",
  },
  {
    capabilities: {
      tools: {
        list: true, // ツール一覧提供
        call: true, // ツール実行提供
      },
    },
  }
);

// ツール一覧取得リクエストのハンドラを設定
server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [
      {
        name: "hello-world-tool",
        description: "A simple tool that says hello world",
        inputSchema: inputSchema,
        parametersSchema: {
          type: "object",
          properties: {},
          required: [],
        },
      },
      {
        name: "goodbye-world-tool",
        description: "A simple tool that says goodbye world",
        inputSchema: inputSchema,
        parametersSchema: {
          type: "object",
          properties: {},
          required: [],
        },
      },
    ],
  };
});

// ツール実行リクエストのハンドラを設定
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;

  if (!args || typeof args !== "object") {
    throw new Error("Invalid arguments");
  }

  switch (name) {
    case "hello-world-tool":
      return {
        content: [
          {
            type: "text",
            text: `Hello, World! You said: ${args.say}`,
          },
        ],
      };
    case "goodbye-world-tool":
      return {
        content: [
          {
            type: "text",
            text: `Goodbye, World! You said: ${args.say}`,
          },
        ],
      };
    default:
      throw new Error(`Unknown tool: ${name}`);
  }
});

// サーバーを起動
const transport = new StdioServerTransport();
await server.connect(transport);
