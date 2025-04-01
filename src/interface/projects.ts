export interface Category {
    id: number;
    name: string;
}
export interface Service {
    id: string;
    name: string;
    cost: number;
    description: string;
}
export interface AllProjects {
    id: string;
    name: string;
    description: string;
    budget: number;
    category: Category;
    cost: number,
    services: Service[]
}