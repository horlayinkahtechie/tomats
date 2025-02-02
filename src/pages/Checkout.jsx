import CustomerAddressSection from "../components/CustomerAddressSection";
import DeliveryDetailsSection from "../components/DeliveryDetialsSection";
import Footer from "../components/Footer";
import Ordersummary from "../components/Ordersummary";
import PaymentMethodSection from "../components/PaymentMethodSection";

export default function Checkout() {
  return (
    <>
      <main className="container">
        <h1 className="title mt-5">Confirm order details</h1>
        <CustomerAddressSection className="mt-5" title="1. Customer Address" />
        <DeliveryDetailsSection
          title="2. Delivery Details"
          buttonText="Select"
        />
        <PaymentMethodSection
          title="3. Payment Method"
          buttonText="Change"
          onChange={() => alert("Change Payment Method")}
        />
        <Ordersummary total={7899} itemsTotal={7399} deliveryFees={500} />
      </main>
      <Footer />
    </>
  );
}
