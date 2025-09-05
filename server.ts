import express from "express"
import authRouter from "./src/modules/auth/auth.routes"
import userRouter from "./src/modules/user/user.routes"
import courseRouter from "./src/modules/course/course.routes"
import { AuthService } from "./src/modules/auth/auth.service"

const app = express()
app.use(express.json())

// Initial admin user
const authService = new AuthService()
authService.register({
    name: "Admin",
    email: "admin@no.com",
    password: "admin123",
    role: "ADMIN"
})

app.use("/auth", authRouter)
app.use("/users", userRouter)
app.use("/courses", courseRouter)

//404 fallback
app.use((req, res) => res.status(404).json({ message: "Route not found" }))

app.use((err: any, req: any, res: any, next: any) => {
    res.status(err.status || 500).json({ message: err.message || "Internal Server Error" })
})

app.listen(3000, () => console.log("Server running on port 3000"))
