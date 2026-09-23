import { createContext } from "react";

export type Product = {
  id: number;
  title: string;
  description: string;
  price: number;
  thumbnail: string;
};

export type Items = Product & {
  quantity: number;
};

export type CartContextProps = {
  addToCart: (product: Product) => void;
  removeFromCart: (id: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalCart: string;
  items: Items[];
};

export const CartContext = createContext<CartContextProps>(
  {} as CartContextProps,
);
