import { useEffect, useMemo, useState } from "react";
import "./App.css";
import ProductsPage from "./pages/ProductsPage";
import CartPage from "./pages/CartPage";

const PRODUCTS = [
  { id: 1, name: "Wireless Over-Ear Headphones", price: 89.99, image: "https://picsum.photos/seed/headphones/300/300", category: "Electronics" },
  { id: 2, name: "Mechanical Keyboard", price: 64.5, image: "https://picsum.photos/seed/keyboard/300/300", category: "Electronics" },
  { id: 3, name: "Ceramic Pour-Over Set", price: 34.0, image: "https://picsum.photos/seed/coffee/300/300", category: "Home" },
  { id: 4, name: "Canvas Weekender Bag", price: 76.25, image: "https://picsum.photos/seed/bag/300/300", category: "Apparel" },
  { id: 5, name: "Minimalist Desk Lamp", price: 42.99, image: "https://picsum.photos/seed/lamp/300/300", category: "Home" },
  { id: 6, name: "Merino Wool Beanie", price: 24.0, image: "https://picsum.photos/seed/beanie/300/300", category: "Apparel" },
  { id: 7, name: "Portable Bluetooth Speaker", price: 55.75, image: "https://picsum.photos/seed/speaker/300/300", category: "Electronics" },
  { id: 8, name: "Stainless Steel Water Bottle", price: 19.99, image: "https://picsum.photos/seed/bottle/300/300", category: "Home" },
];

const VIEWS = {
  PRODUCTS: "products",
  CART: "cart",
};

export default function App() {
  const [cart, setCart] = useState([]); // [{ id, quantity }]
  const [activeView, setActiveView] = useState(VIEWS.PRODUCTS);

  useEffect(() => {
    document.title =
      activeView === VIEWS.PRODUCTS
        ? "Products | Fieldstone Goods"
        : "Cart | Fieldstone Goods";
  }, [activeView]);

  const addToCart = (productId) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === productId);
      if (existing) {
        return prev.map((item) =>
          item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { id: productId, quantity: 1 }];
    });
  };

  const increaseQty = (productId) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decreaseQty = (productId) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.id === productId ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const removeFromCart = (productId) => {
    setCart((prev) => prev.filter((item) => item.id !== productId));
  };

  const clearCart = () => setCart([]);

  // Merge cart entries with full product info so children never need to
  // look products up themselves — they just render what they're given.
  const cartDetails = useMemo(
    () =>
      cart
        .map((item) => {
          const product = PRODUCTS.find((p) => p.id === item.id);
          if (!product) return null;
          return { ...product, quantity: item.quantity, lineTotal: product.price * item.quantity };
        })
        .filter(Boolean),
    [cart]
  );

  const totalCost = useMemo(
    () => cartDetails.reduce((sum, item) => sum + item.lineTotal, 0),
    [cartDetails]
  );

  const totalItems = useMemo(
    () => cart.reduce((sum, item) => sum + item.quantity, 0),
    [cart]
  );

  const quantityInCart = (productId) =>
    cart.find((item) => item.id === productId)?.quantity || 0;

  return (
    <div className="app-shell">
      <header className="app-header">
        <div className="app-header__inner">
          <div className="brand">
            <h1 className="brand__title">
              Fieldstone <span>Goods</span>
            </h1>
            <p className="brand__subtitle">
              {totalItems} item{totalItems === 1 ? "" : "s"} in cart
            </p>
          </div>

          <nav className="page-switcher" aria-label="Switch between pages">
            <button
              type="button"
              className={`page-switcher__button ${
                activeView === VIEWS.PRODUCTS ? "page-switcher__button--active" : ""
              }`}
              aria-pressed={activeView === VIEWS.PRODUCTS}
              onClick={() => setActiveView(VIEWS.PRODUCTS)}
            >
              Products
            </button>
            <button
              type="button"
              className={`page-switcher__button ${
                activeView === VIEWS.CART ? "page-switcher__button--active" : ""
              }`}
              aria-pressed={activeView === VIEWS.CART}
              onClick={() => setActiveView(VIEWS.CART)}
            >
              Cart
              <span className="page-switcher__badge">{totalItems}</span>
            </button>
          </nav>
        </div>
      </header>

      <main className="page-shell">
        {activeView === VIEWS.PRODUCTS ? (
          <ProductsPage
            products={PRODUCTS}
            quantityInCart={quantityInCart}
            onAdd={addToCart}
            onGoToCart={() => setActiveView(VIEWS.CART)}
            totalItems={totalItems}
          />
        ) : (
          <CartPage
            items={cartDetails}
            totalCost={totalCost}
            onIncrease={increaseQty}
            onDecrease={decreaseQty}
            onRemove={removeFromCart}
            onClear={clearCart}
            onGoToProducts={() => setActiveView(VIEWS.PRODUCTS)}
          />
        )}
      </main>
    </div>
  );
}
