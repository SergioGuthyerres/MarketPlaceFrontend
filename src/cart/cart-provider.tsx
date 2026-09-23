import { type ReactNode, useMemo, useState } from "react";
import { CartContext, type Items, type Product } from "./cart-context";

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<Items[]>([]);

  const addToCart = (product: Product) => {
    setItems((prevState) => {
      const exist = prevState.find((item) => item.id === product.id);

      if (exist) {
        return prevState.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }
      return [...prevState, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (id: number) => {
    setItems((prevState) => {
      const exist = prevState.find((item) => item.id === id);

      if (!exist) {
        return prevState;
      }

      if (exist.quantity > 1) {
        return prevState.map((item) =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item,
        );
      }

      return prevState.filter((item) => item.id !== id);
    });
  };

  const clearCart = () => {
    setItems([] as Items[]);
  };

  const totalItems = useMemo(() => {
    return items.reduce((acc, item) => acc + item.quantity, 0);
  }, [items]);

  const totalCart = useMemo(() => {
    return items.reduce((acc, item) => acc + item.quantity * item.price, 0);
  }, [items]).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        clearCart,
        totalItems,
        totalCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
