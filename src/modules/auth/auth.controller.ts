import { Request, Response } from "express"
import { AuthService } from "./auth.service"

export class AuthController {
    private service = new AuthService()

    async register(req: Request, res: Response) {
        try {
            const user = await this.service.register(req.body)
            res.status(201).json(user)
        } catch (err: any) {
            res.status(400).json({ message: err.message })
        }
    }

    async login(req: Request, res: Response) {
        try {
            const token = await this.service.login(req.body.email, req.body.password)
            res.status(200).json({ token })
        } catch (err: any) {
            res.status(401).json({ message: err.message })
        }
    }
}
