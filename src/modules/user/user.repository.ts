import { GenericRepository } from "../../shared/repository";
import { User } from "./user.entity";

export class UserRepository extends GenericRepository<User>{

    findByEmail(email: string): User | undefined{
        return this.findAll().find(user => user.email === email)
    }
    
}