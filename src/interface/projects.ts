export interface Category {
    id: number;
    name: string;
}
export interface AllProjects {
    id: string;
    name: string;
    description: string;
    budget: number;
    category: Category;
    cost: number,
    services: string[]
}