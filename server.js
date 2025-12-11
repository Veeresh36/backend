import express from "express";
import cors from "cors";
import { createServer } from "http";
import { Server } from "socket.io";

const app = express();
app.use(cors());
app.use(express.json());

const server = createServer(app);

// SOCKET.IO SETUP
const io = new Server(server, {
    cors: {
        origin: [
            "http://localhost:5173",
            "https://chat-app-phi-mocha-58.vercel.app"
        ],
        methods: ["GET", "POST"],
        credentials: true
    }
});

// Main socket connection
io.on("connection", (socket) => {
    console.log("New user connected:", socket.id);

    socket.on("sendMessage", (data) => {
        io.emit("receiveMessage", data); // send to everyone
    });

    socket.on("disconnect", () => {
        console.log("User disconnected:", socket.id);
    });
});

const PORT = 5000;
server.listen(PORT, () => {
    console.log("Backend running on port " + PORT);
});
