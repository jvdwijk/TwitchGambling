import { createServer } from "http";
import { Server } from 'socket.io'
import * as dotenv from "dotenv";

dotenv.config();

const SERVER_PORT = 3008;

const httpServer = createServer();
const io = new Server(httpServer, {});

//TODO: rewrite slotmachine to ts after it's been converted to ts itself
const SlotMachineGame = require("./games/slotmachine/slotMachineGame") 
const slotMachineGame = new SlotMachineGame('slots', io);

httpServer.listen(SERVER_PORT);
