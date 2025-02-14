import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import supabase from "../../../supabaseClient";
import Sidebar from "../components/Sidebar";
import Spinner from "../../../components/Spinner";

function Overview() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const abortController = new AbortController();

    async function fetchUserProfile() {
      try {
        // Get the current session
        const { data, error } = await supabase.auth.getSession();

        if (error || !data.session) {
          console.error("Session error:", error);
          navigate("/admin/login");
          return;
        }

        const userId = data.session.user.id;

        // Fetch user role from profiles table
        const { data: userData, error: profileError } = await supabase
          .from("profiles")
          .select("role")
          .eq("id", userId)
          .single();

        if (profileError || !userData || userData.role !== "admin") {
          console.warn("Unauthorized access:", profileError);
          navigate("/admin/login");
          return;
        }

        setUser(data.session.user);
      } catch (error) {
        console.error("Unexpected error:", error);
        navigate("/admin/login");
      } finally {
        setLoading(false);
      }
    }

    fetchUserProfile();

    return () => {
      abortController.abort();
    };
  }, [navigate]);

  if (loading) {
    return <Spinner />;
  }

  return (
    <>
      {/* <div className="container-fluid"> */}
      <div className=" container-fluid">
        <div className="row">
          <div className="col-md-3" style={{ padding: "0px", margin: "0px" }}>
            <Sidebar />
          </div>
          <div className="col-md-9 mt-5">
            <p style={{ color: "black", fontSize: "26px" }}>Welcome, Admin</p>
            <div className="row mt-5">
              <div className="col-md-3">
                <div
                  style={{
                    backgroundColor: "orangered",
                    padding: "50px 20px",
                    paddingTop: "18px",
                    display: "flex",
                    gap: "50px",
                    width: "80%",
                  }}
                >
                  <p style={{ fontSize: "18px", fontWeight: "400" }}>Orders</p>
                  <p>10</p>
                </div>
              </div>
              <div className="col-md-3">
                <div
                  style={{
                    backgroundColor: "orangered",
                    padding: "50px 20px",
                    paddingTop: "18px",
                    display: "flex",
                    gap: "50px",
                    width: "80%",
                  }}
                >
                  <p style={{ fontSize: "18px", fontWeight: "400" }}>Items</p>
                  <p style={{ fontSize: "18px", fontWeight: "400" }}>10</p>
                </div>
              </div>
              <div className="col-md-3">
                <div
                  style={{
                    backgroundColor: "orangered",
                    padding: "50px 20px",
                    paddingTop: "18px",
                    display: "flex",
                    gap: "50px",
                    width: "80%",
                  }}
                >
                  <p style={{ fontSize: "18px", fontWeight: "400" }}>
                    Reservations
                  </p>
                  <p style={{ fontSize: "18px", fontWeight: "400" }}>10</p>
                </div>
              </div>
              <div className="col-md-3">
                <div
                  style={{
                    backgroundColor: "orangered",
                    padding: "50px 20px",
                    paddingTop: "18px",
                    display: "flex",
                    gap: "50px",
                    width: "80%",
                  }}
                >
                  <p style={{ fontSize: "18px", fontWeight: "400" }}>Users</p>
                  <p style={{ fontSize: "18px", fontWeight: "400" }}>10</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* </div> */}
    </>
  );
}

export default Overview;
