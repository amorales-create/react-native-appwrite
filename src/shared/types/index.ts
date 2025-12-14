// Shared TypeScript types and interfaces

export interface User {
    id: string;
    email?: string;
    name?: string;
    type: 'email' | 'google' | 'guest';
}

export interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    image: string;
    category: string;
}

export type Theme = 'light' | 'dark';
export type Language = 'es' | 'en';
