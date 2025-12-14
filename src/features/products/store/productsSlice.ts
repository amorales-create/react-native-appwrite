import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product } from '../../shared/types';

interface ProductsState {
    items: Product[];
    loading: boolean;
    error: string | null;
}

// Mock product data
const mockProducts: Product[] = [
    {
        id: '1',
        name: 'Laptop Pro',
        description: 'High-performance laptop for professionals',
        price: 1299.99,
        image: '💻',
        category: 'Electronics',
    },
    {
        id: '2',
        name: 'Wireless Mouse',
        description: 'Ergonomic wireless mouse',
        price: 29.99,
        image: '🖱️',
        category: 'Accessories',
    },
    {
        id: '3',
        name: 'Mechanical Keyboard',
        description: 'RGB mechanical keyboard',
        price: 149.99,
        image: '⌨️',
        category: 'Accessories',
    },
    {
        id: '4',
        name: 'USB-C Hub',
        description: 'Multi-port USB-C adapter',
        price: 49.99,
        image: '🔌',
        category: 'Accessories',
    },
    {
        id: '5',
        name: 'Webcam HD',
        description: '1080p HD webcam',
        price: 79.99,
        image: '📹',
        category: 'Electronics',
    },
    {
        id: '6',
        name: 'Headphones',
        description: 'Noise-cancelling headphones',
        price: 199.99,
        image: '🎧',
        category: 'Audio',
    },
];

const initialState: ProductsState = {
    items: [],
    loading: false,
    error: null,
};

const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        fetchProductsStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        fetchProductsSuccess: (state, action: PayloadAction<Product[]>) => {
            state.loading = false;
            state.items = action.payload;
        },
        fetchProductsFailure: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
        },
        loadMockProducts: (state) => {
            state.items = mockProducts;
            state.loading = false;
            state.error = null;
        },
    },
});

export const {
    fetchProductsStart,
    fetchProductsSuccess,
    fetchProductsFailure,
    loadMockProducts,
} = productsSlice.actions;

export default productsSlice.reducer;
