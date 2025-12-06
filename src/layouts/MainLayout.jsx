import { Outlet } from "react-router";
import Navbar from "../components/Shared/Navbar/Navbar";
import Footer from "../components/Shared/Footer/Footer";
import useAuth from "../hooks/useAuth";
import LoadingSpinner from "../components/Shared/LoadingSpinner";
const MainLayout = () => {
  const { loading } = useAuth();

  if (loading) return <LoadingSpinner />;

  return (
    <div>
      <Navbar />
      <div className="min-h-[calc(100vh-68px)] md:max-w-7xl w-11/12 mx-auto">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default MainLayout;
