import { Response, NextFunction } from "express"
import jwt from "jsonwebtoken"
const JWT_SECRET = "raghad3abu"

export const authMiddleware = (roles: string[] = []) => {
    return (req: any, res: Response, next: NextFunction) => {
        const authHeader = req.headers.authorization;
        if (!authHeader) return res.status(401).json({ message: "No token provided" })

        const token = authHeader.split(" ")[1]
        try {
            const decoded: any = jwt.verify(token, JWT_SECRET)
            req.user = decoded

            if (roles.length && !roles.includes(decoded.role)) {
                return res.status(403).json({ message: "Forbidden" })
            }

            next()
        } catch {
            return res.status(401).json({ message: "Invalid token" })
        }
    }
}
