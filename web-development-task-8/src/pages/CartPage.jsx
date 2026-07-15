import CartPanel from "../components/Cartpannel";

export default function CartPage({
  items,
  totalCost,
  onIncrease,
  onDecrease,
  onRemove,
  onClear,
  onGoToProducts,
}) {
  return (
    <section className="page page--cart">
      <div className="page__header">
        <div>
          <p className="page__eyebrow">Cart</p>
          <h2 className="page__title">Review your items</h2>
          <p className="page__description">
            Adjust quantities, remove items, and check the total before checkout.
          </p>
        </div>

        <button type="button" className="page__action" onClick={onGoToProducts}>
          Back to products
        </button>
      </div>

      <CartPanel
        items={items}
        totalCost={totalCost}
        onIncrease={onIncrease}
        onDecrease={onDecrease}
        onRemove={onRemove}
        onClear={onClear}
      />
    </section>
  );
}
