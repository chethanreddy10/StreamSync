import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

const Layout = ({ children, showSidebar = false }) => {
  return (
    <div className="flex h-screen overflow-hidden">
      {showSidebar && <Sidebar />}

      <div className="flex flex-col flex-1 overflow-hidden">
        <Navbar />
        <main className="flex-1 overflow-y-auto bg-base-100">
          {children}
        </main>
      </div>
    </div>
  );
};
export default Layout;
