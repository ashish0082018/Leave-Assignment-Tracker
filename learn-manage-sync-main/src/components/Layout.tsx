
import React, { ReactNode } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { CalendarIcon, BookIcon, FileTextIcon, HomeIcon, LogOutIcon, TicketIcon } from "lucide-react";

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const navItems = [
    { label: "Dashboard", path: "/dashboard", icon: <HomeIcon size={18} /> },
    { label: "Assignments", path: "/assignments", icon: <BookIcon size={18} /> },
    { label: "Schedules", path: "/schedules", icon: <CalendarIcon size={18} /> },
  ];

  if (user?.role === "TEACHER") {
    navItems.push({ 
      label: "Leave Requests", 
      path: "/leave-requests", 
      icon: <TicketIcon size={18} /> 
    });
  } else if (user?.role === "STUDENT") {
    navItems.push({ 
      label: "Leave Requests", 
      path: "/leave-requests", 
      icon: <FileTextIcon size={18} /> 
    });
  }

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-app-blue text-white py-4 px-6 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <Link to="/" className="text-xl font-bold">
            L&A Tracker
          </Link>
          {user && (
            <div className="flex items-center gap-4">
              <span className="text-sm hidden md:inline">
                {user.name} ({user.role})
              </span>
              <Button variant="outline" size="sm" onClick={handleLogout}>
                <LogOutIcon size={16} className="mr-2" />
                Logout
              </Button>
            </div>
          )}
        </div>
      </header>

      <div className="flex flex-grow">
        {user && (
          <nav className="w-64 bg-gray-100 p-4 hidden md:block">
            <ul className="space-y-2">
              {navItems.map((item) => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className={`flex items-center gap-2 p-2 rounded hover:bg-gray-200 ${
                      location.pathname === item.path ? "bg-gray-200 font-medium" : ""
                    }`}
                  >
                    {item.icon}
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        )}

        <main className="flex-grow p-6">
          <div className="container mx-auto">{children}</div>
        </main>
      </div>

      <footer className="bg-gray-100 py-4 px-6 text-center text-gray-600 text-sm">
        <div className="container mx-auto">
          &copy; {new Date().getFullYear()} Leave & Assignment Tracker
        </div>
      </footer>
    </div>
  );
};

export default Layout;
