import supabase from "../../supabaseClient";

const Logout = async () => {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("Logout Error:", error.message);
    } else {
      // Redirect to login page or homepage after logout
      window.location.href = "/";
    }
  } catch (err) {
    console.error("Unexpected error during logout:", err);
  }
};
export default Logout;
