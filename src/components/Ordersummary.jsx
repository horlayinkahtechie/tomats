const Ordersummary = ({ total, itemsTotal, deliveryFees }) => {
  return (
    <div className="cart-summary">
      <h2>Order summary</h2>
      <p>Item&apos;s total (1): ₦{itemsTotal}</p>
      <p>Delivery fees: ₦{deliveryFees}</p>
      <h3>Total: ₦{total}</h3>
      <button className="confirm-btn">Proceed to pay</button>
    </div>
  );
};

export default Ordersummary;
