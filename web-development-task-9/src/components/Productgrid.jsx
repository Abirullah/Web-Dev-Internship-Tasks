import { useEffect, useRef, useState } from "react";

const formatPrice = (value) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(value);

function ProductCard({ product, quantity, onAdd }) {
  const [justAdded, setJustAdded] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        window.clearTimeout(timerRef.current);
      }
    };
  }, []);

  const handleAdd = () => {
    onAdd(product.id);
    setJustAdded(true);
    if (timerRef.current) {
      window.clearTimeout(timerRef.current);
    }
    timerRef.current = window.setTimeout(() => {
      setJustAdded(false);
      timerRef.current = null;
    }, 900);
  };

  return (
    <article className="product-card">
      <div className="product-card__media">
        <img
          className="product-card__image"
          src={product.image}
          alt={product.name}
        />
      </div>
      <div className="product-card__content">
        <p className="product-card__category">{product.category}</p>
        <h3 className="product-card__title">{product.name}</h3>
        <div className="product-card__footer">
          <span className="product-card__price">{formatPrice(product.price)}</span>
          <button
            type="button"
            onClick={handleAdd}
            className={`product-card__button ${
              justAdded ? "product-card__button--added" : ""
            }`}
          >
            {justAdded ? "Added ✓" : quantity > 0 ? `In cart · ${quantity}` : "Add to cart"}
          </button>
        </div>
      </div>
    </article>
  );
}

export default function ProductGrid({ products, quantityInCart, onAdd }) {
  return (
    <div className="product-grid">
      <div className="product-grid__list">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            quantity={quantityInCart(product.id)}
            onAdd={onAdd}
          />
        ))}
      </div>
    </div>
  );
}
