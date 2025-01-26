const PaymentMethodSection = ({ title }) => {
  return (
    <div className="section">
      <h2 style={{ fontWeight: "500" }}>{title}</h2>

      <div className="container-fluid">
        <div className="col-md-12 mt-3">
          <p>Pay with card, bank transfer or USSD.</p>
        </div>
      </div>
    </div>
  );
};

export default PaymentMethodSection;
