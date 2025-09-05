import { UserRepository } from "../user/user.repository"
import { User } from "../user/user.entity"
import argon2 from "argon2"
import jwt from "jsonwebtoken"

const JWT_SECRET = "raghad3abu"

export class AuthService {
    private userRepo = new UserRepository()

    async register(user: Partial<User>): Promise<User> {
        if (this.userRepo.findByEmail(user.email!)) {
            throw new Error("email already exists")
        }

        const hashedPassword = await argon2.hash(user.password!)

        const newUser: User = {
            id: (Math.random() * 100000).toFixed(0),
            name: user.name!,
            email: user.email!,
            password: hashedPassword,
            role: user.role || "STUDENT",
            createdAt: new Date(),
            updatedAt: new Date()
        }

        this.userRepo.create(newUser)
        return newUser
    }

    async login(email: string, password: string): Promise<string> {
        const user = this.userRepo.findByEmail(email)
        if (!user) throw new Error("incorrect email")

        const isValid = await argon2.verify(user.password, password)
        if (!isValid) throw new Error("incorrect password")

        const token = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, { expiresIn: "1h" })
        return token
    }

    getUserById(id: string): User | undefined {
        return this.userRepo.findById(id)
    }

    getRepository() {
        return this.userRepo
    }
}
