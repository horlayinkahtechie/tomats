import { useEffect, useState } from "react";
import supabase from "../supabaseClient";
import Spinner from "./Spinner";

export default function ChangeAddressModal() {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCustomerAddresses = async () => {
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from("address_details")
          .select("*");
        if (error) {
          console.error("Error fetching your address:", error.message);
        } else {
          console.log(data);
          console.log("Successfully fetch user addresses");
        }
      } catch (err) {
        console.error("Unexpected error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCustomerAddresses();
  }, []);
  return <div>{loading && <Spinner />}</div>;
}
