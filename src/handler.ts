import * as serverless from "serverless-http";
import * as express from "express";

const app = express();

app.get("/", (req: any, res: any) => {
  res.send("Hello!");
});

app.get("/path", (req: any, res: any) => {
  res.send("Hello from path!");
});

/*
handler.listen(3000, () => {
  console.log("Server running on port 3000");
});
*/

export const handler = serverless(app);
