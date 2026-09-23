import { useEffect, useState } from "react";
import { Link } from "react-router";
export type Product = {
  id: number;
  title: string;
  description: string;
  price: number;
  thumbnail: string;
  stock: number;
};

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetch("https://dummyjson.com/products")
      .then((res) => res.json())
      .then((response) => setProducts(response.products));
  }, []);
  //um teste 2
  return (
    <div className="h-screen max-w-3xl mx-auto flex flex-col gap-2 p-4">
      {products.map((product) => (
        <Link key={product.id} to={`/details/${product.id}`}>
          <div className="flex border border-zinc-400 p-2 gap-4">
            <img
              src={product.thumbnail}
              alt={product.title}
              className="w-32 h-32 object-cover"
            />
            <div className="flex flex-col gap-1 flex-1">
              <h1 className="text-2xl font-semibold">{product.title}</h1>
              <p className="text-xl font-normal text-justify">
                {product.description}
              </p>

              <h1 className="text-emerald-500 text-2xl font-bold">
                ${product.price}
              </h1>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
