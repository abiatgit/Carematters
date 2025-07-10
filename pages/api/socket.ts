import { Server } from "socket.io"
import { NextApiRequest } from "next"
import { NextApiResponseServerIO } from "@/types/next" // define this type below

export const config = {
  api: {
    bodyParser: false,
  },
}

export default function handler(req: NextApiRequest, res: NextApiResponseServerIO) {
    if (!res.socket.server.io) {
      const io = new Server(res.socket.server, {
        path: "/api/socket",
        addTrailingSlash: false,
      })
  
      io.on("connection", (socket) => {
        console.log("New socket connected:", socket.id)
        socket.on("send-message", (msg) => {
          socket.broadcast.emit("new-message", msg)
        })
        socket.on("disconnect", () => {
          console.log("Client disconnected")
        })
      })
  
      res.socket.server.io = io
    }
  
    res.end()
  }
  
