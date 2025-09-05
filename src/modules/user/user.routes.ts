import { Router } from "express"
import { UserController } from "./user.controller"
import { authMiddleware } from "../../shared/middleware"

const router = Router()
const controller = new UserController()

router.get("/me", authMiddleware(), controller.getProfile.bind(controller))
router.put("/me", authMiddleware(), controller.updateProfile.bind(controller))
router.post("/coach", authMiddleware(["ADMIN"]), controller.addCoach.bind(controller))

export default router
