import { User } from "./user.entity"
import { AuthService } from "../auth/auth.service"

export class UserService {
    private authService = new AuthService()

    getProfile(id: string): User | undefined {
        return this.authService.getUserById(id)
    }

    updateProfile(id: string, data: Partial<User>): User | undefined {
        return this.authService.getRepository().update(id, { ...data, updatedAt: new Date() })
    }

    async addCoach(data: Partial<User>): Promise<User> {
        if (data.role !== "COACH") throw new Error("Role must be COACH")
        return await this.authService.register(data)
    }
}