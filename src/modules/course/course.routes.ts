import { Router } from "express"
import { CourseController } from "./course.controller"
import { authMiddleware } from "../../shared/middleware"

const router = Router()
const controller = new CourseController()

router.post("/", authMiddleware(["COACH", "ADMIN"]), controller.add.bind(controller))
router.get("/", controller.getAll.bind(controller))
router.get("/:id", controller.getById.bind(controller))
router.put("/:id", authMiddleware(["COACH", "ADMIN"]), controller.update.bind(controller))
router.delete("/:id", authMiddleware(["COACH", "ADMIN"]), controller.delete.bind(controller))

export default router
