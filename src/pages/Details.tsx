import { useContext, useEffect, useState } from "react";
import type { Product } from "./Home";
import { Link, useParams } from "react-router";
import { CartContext } from "../cart/cart-context";
type ParametrosDaRota = {
  id: string;
};
export default function Details() {
  const [product, setProduct] = useState<Product | undefined>();
  const { id } = useParams<ParametrosDaRota>();
  const { items, addToCart, removeFromCart, totalItems, totalCart } =
    useContext(CartContext);

  const quantity = items.find((item) => item.id === product?.id)?.quantity ?? 0;

  useEffect(() => {
    if (!id) return;
    fetch(`https://dummyjson.com/products/${id}`)
      .then((res) => res.json())
      .then((response) => setProduct(response));
  }, [id]);
  return (
    <>
      <div className="h-screen max-w-3xl mx-auto flex flex-col gap-2 p-4">
        <Link to="/" className="text-zinc-600 underline">
          &larr; Voltar para a lista
        </Link>
        <div
          key={product?.id}
          className="flex border border-zinc-400 p-2 gap-4"
        >
          <img
            src={product?.thumbnail}
            alt={product?.title}
            className="w-32 h-32 object-cover"
          />
          <div className="flex flex-col gap-1 flex-1">
            <h1 className="text-2xl font-semibold">{product?.title}</h1>
            <p className="text-xl font-normal text-justify">
              {product?.description}
            </p>
            <p className="text-zinc-500">Estoque: {product?.stock}</p>

            <h1 className="text-emerald-500 text-2xl font-bold">
              ${product?.price}
            </h1>
          </div>
        </div>
      </div>

      <div className="flex flex-col p-5 items-center gap-2">
        <button
          className="p-3 border border-zinc-600 rounded"
          onClick={() => product && addToCart(product)}
        >
          +
        </button>
        <h1>{quantity}</h1>
        <button
          className="p-3 border border-zinc-600 rounded"
          onClick={() => product && removeFromCart(product.id)}
        >
          -
        </button>

        <p>
          Carrinho: {totalItems} item(s) — {totalCart}
        </p>
      </div>
    </>
  );
}
