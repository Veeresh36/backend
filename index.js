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

// ✔ Render requires this
const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
    console.log("Server running on port", PORT);
});

// SOCKET CONNECTION
io.on("connection", (socket) => {
    console.log("New user connected:", socket.id);

    socket.on("sendMessage", (data) => {
        io.emit("receiveMessage", data);
    });

    socket.on("disconnect", () => {
        console.log("User disconnected:", socket.id);
    });
});
