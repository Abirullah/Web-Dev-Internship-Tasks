const formatPrice = (value) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(value);

function CartItem({ item, onIncrease, onDecrease, onRemove }) {
  return (
    <article className="cart-item">
      <img
        className="cart-item__image"
        src={item.image}
        alt={item.name}
      />
      <div className="cart-item__body">
        <p className="cart-item__name">{item.name}</p>
        <p className="cart-item__meta">{formatPrice(item.price)} each</p>
      </div>

      <div className="cart-item__controls quantity-stepper">
        <button
          type="button"
          onClick={() => onDecrease(item.id)}
          className="quantity-stepper__button"
          aria-label="Decrease quantity"
        >
          −
        </button>
        <span className="quantity-stepper__value">{item.quantity}</span>
        <button
          type="button"
          onClick={() => onIncrease(item.id)}
          className="quantity-stepper__button"
          aria-label="Increase quantity"
        >
          +
        </button>
      </div>

      <span className="cart-item__total">{formatPrice(item.lineTotal)}</span>

      <button
        type="button"
        onClick={() => onRemove(item.id)}
        className="cart-item__remove"
      >
        Remove
      </button>
    </article>
  );
}

export default function CartPanel({ items, totalCost, onIncrease, onDecrease, onRemove, onClear }) {
  return (
    <div className="cart-panel">
      <div className="cart-panel__header">
        <p className="cart-panel__label">Cart summary</p>
        {items.length > 0 && (
          <button
            type="button"
            onClick={onClear}
            className="cart-panel__clear"
          >
            Clear cart
          </button>
        )}
      </div>

      {items.length === 0 ? (
        <div className="cart-panel__empty">
          <p className="cart-panel__empty-title">Your cart is empty.</p>
          <p className="cart-panel__empty-text">
            Switch back to products and add something to get started.
          </p>
        </div>
      ) : (
        <div className="cart-panel__list">
          {items.map((item) => (
            <CartItem
              key={item.id}
              item={item}
              onIncrease={onIncrease}
              onDecrease={onDecrease}
              onRemove={onRemove}
            />
          ))}
        </div>
      )}

      <div className="cart-panel__summary">
        <span className="cart-panel__summary-label">Total</span>
        <span className="cart-panel__summary-value">{formatPrice(totalCost)}</span>
      </div>

      <button
        type="button"
        disabled={items.length === 0}
        className="cart-panel__checkout"
      >
        Checkout
      </button>
    </div>
  );
}
