import ProductGrid from "../components/Productgrid";

export default function ProductsPage({
  products,
  quantityInCart,
  onAdd,
  onGoToCart,
  totalItems,
}) {
  return (
    <section className="page page--products">
      <div className="page__header">
        <div>
          <p className="page__eyebrow">Products</p>
          <h2 className="page__title">Browse the catalog</h2>
          <p className="page__description">
            Pick items to add to your cart. You can switch over to the cart page at any
            time to review quantities and totals.
          </p>
        </div>

        <button type="button" className="page__action" onClick={onGoToCart}>
          Go to cart{totalItems > 0 ? ` (${totalItems})` : ""}
        </button>
      </div>

      <ProductGrid products={products} quantityInCart={quantityInCart} onAdd={onAdd} />
    </section>
  );
}
