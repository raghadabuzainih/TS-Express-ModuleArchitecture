import { Request, Response } from "express"
import { CourseService } from "./course.service"

export class CourseController {
    private service = new CourseService()

    add(req: any, res: Response) {
        const course = this.service.addCourse({ ...req.body, creatorId: req.user.id } )
        res.status(201).json(course)
    }

    getAll(req: Request, res: Response) {
        res.status(200).json(this.service.getAllCourses())
    }

    getById(req: any, res: Response) {
        const course = this.service.getCourse(req.params.id)
        if (!course) return res.status(404).json({ message: "Course not found" })
        res.json(course)
    }

    update(req: any, res: Response) {
        const course = this.service.getCourse(req.params.id)
        if (!course) return res.status(404).json({ message: "Course not found" })
        if (req.user.role !== "ADMIN")
            return res.status(403).json({ message: "Forbidden" })
        const updated = this.service.updateCourse(req.params.id, req.body)
        res.json(updated)
    }

    delete(req: any, res: Response) {
        const course = this.service.getCourse(req.params.id)
        if (!course) return res.status(404).json({ message: "Course not found" })
        if (req.user.role !== "ADMIN")
            return res.status(403).json({ message: "Forbidden" })
        this.service.deleteCourse(req.params.id)
        res.json({ message: "Deleted" })
    }
}
