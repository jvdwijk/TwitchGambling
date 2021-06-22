import { createServer } from "http";
import { Server } from 'socket.io'
import * as dotenv from "dotenv";
import SlotMachineGame from "./games/slotMachineGame";
import Game from "./games/game";

dotenv.config();

const SERVER_PORT = 3008;

const httpServer = createServer();
const io = new Server(httpServer, {cors: {origin: '*'}});

const slotMachineGame: Game = new SlotMachineGame('slots', io);
slotMachineGame.start();

httpServer.listen(SERVER_PORT);
