import { CourseRepository } from "./course.repository"
import { Course } from "./course.entity"

export class CourseService {
    private repo = new CourseRepository()

    addCourse(course: Course): Course {
        course.id = (Math.random() * 100000).toFixed(0)
        course.createdAt = new Date()
        course.updatedAt = new Date()
        return this.repo.create(course)
    }

    getAllCourses(): Course[] {
        return this.repo.findAll()
    }

    getCourse(id: string): Course | undefined {
        return this.repo.findById(id)
    }

    updateCourse(id: string, updated: Partial<Course>): Course | undefined {
        updated.updatedAt = new Date()
        return this.repo.update(id, updated)
    }

    deleteCourse(id: string): boolean {
        return this.repo.delete(id)
    }
}
