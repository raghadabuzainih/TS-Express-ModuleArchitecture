export class GenericRepository<T extends { id: string }>{
    private items: T[] = []
    findAll(): T[] {
        return this.items
    }
    findById(id: string): T | undefined {
        return this.items.find(item => item.id === id)
    }
    create(item: T): T{
        this.items.push(item)
        return item
    }
    update(id: string, updatedItem: Partial<T>): T | undefined {
        const index = this.items.findIndex(item => item.id === id)
        if(index === -1) return undefined
        this.items[index] = {
            ...this.items[index],
            ...updatedItem
        } as T //to ensure that type of updated item is T
        return this.items[index]
    }
    delete(id: string): boolean {
        const index = this.items.findIndex(item => item.id === id)
        if(index === -1) return false
        this.items.splice(index, 1)
        return true
    }
}