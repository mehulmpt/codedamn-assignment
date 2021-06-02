import compression from "compression";
import cors from "cors";
import * as dotenv from "dotenv";
import express from "express";
import http from "http";
import "reflect-metadata";
import { createConnection } from "typeorm";
import { handleErrors } from "./middlewares/handleErrors";
import routes from "./routes";
import { fileType } from "./utils/FormatFiles";
import { ReadFromFile, writeToFile } from "./utils/ReadWriteToFile";
import { RunCMD } from "./utils/RunCMD";
dotenv.config();

const PORT = process.env.PORT || 5000;

const USER_ACTIVE: Record<string, string> = {};

const app = express();
const server = http.createServer(app);
const io = require("socket.io")(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
    allowedHeaders: ["*"],
    credentials: true,
  },
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(compression());
app.use(cors());
app.use(routes);
app.use(handleErrors);

io.on("connection", function (socket: any) {
  socket.on("addMe", function (message: string) {
    USER_ACTIVE[socket.id] = message;
  });

  socket.on("data", (data: fileType) => {
    const email = USER_ACTIVE[socket.id];
    if (data !== null && data !== undefined && email !== undefined) {
      writeToFile(email, data);
    }
  });

  socket.on("getData", (data: fileType) => {
    const email = USER_ACTIVE[socket.id];
    if (data !== null || data !== undefined || email !== undefined) {
      const fileData = ReadFromFile(email, data);
      socket.emit("savedData", fileData);
    }
  });

  socket.on("runCommand", (data: string) => {
    if (data.trim().length) {
      const cmd = RunCMD(data);
      const finalData = {
        stdOut: cmd.stdout?.toString() || "",
        stdErr: cmd.stderr?.toString() || "",
        err: cmd.error?.toString() || "",
      };
      socket.emit("commandResult", finalData);
    }
  });

  socket.on("disconnect", () => {
    delete USER_ACTIVE[socket.id];
    console.log(USER_ACTIVE);
  });
});

createConnection()
  .then(async () => {
    server.listen(PORT, () => {
      console.log(`Server 🚀 Started On PORT ${PORT}`);
    });
  })
  .catch((error: Error) => {
    console.log(error);
  });
