import { Response } from "express"
import { UserService } from "./user.service"

export class UserController {
    private service = new UserService()

    getProfile(req: any, res: Response) {
        const user = this.service.getProfile(req.user.id)
        res.status(200).json(user)
    }

    updateProfile(req: any, res: Response) {
        const updated = this.service.updateProfile(req.user.id, req.body)
        res.status(200).json(updated)
    }

    addCoach(req: any, res: Response) {
        try {
            const coach = this.service.addCoach(req.body)
            res.status(201).json(coach)
        } catch (err: any) {
            res.status(400).json({ message: err.message })
        }
    }
}