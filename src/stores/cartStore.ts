import { create } from 'zustand';

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  calories: number;
  image: string;
  category: string;
  tags: string[];
  available: boolean;
}

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface CartStore {
  items: CartItem[];
  timeSlot: string | null;
  addItem: (item: MenuItem) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  setTimeSlot: (timeSlot: string) => void;
}

export const useCartStore = create<CartStore>((set) => ({
  items: [],
  timeSlot: null,
  
  addItem: (item: MenuItem) => set((state) => {
    const existingItem = state.items.find((i) => i.id === item.id);
    
    if (existingItem) {
      return {
        items: state.items.map((i) => 
          i.id === item.id 
            ? { ...i, quantity: i.quantity + 1 } 
            : i
        ),
      };
    }
    
    return {
      items: [...state.items, { 
        id: item.id,
        name: item.name,
        price: item.price,
        quantity: 1,
        image: item.image,
      }],
    };
  }),
  
  removeItem: (id: string) => set((state) => ({
    items: state.items.filter((item) => item.id !== id),
  })),
  
  updateQuantity: (id: string, quantity: number) => set((state) => {
    if (quantity <= 0) {
      return { items: state.items.filter((item) => item.id !== id) };
    }
    
    return {
      items: state.items.map((item) => 
        item.id === id ? { ...item, quantity } : item
      ),
    };
  }),
  
  clearCart: () => set({ items: [] }),
  
  setTimeSlot: (timeSlot: string) => set({ timeSlot }),
}));