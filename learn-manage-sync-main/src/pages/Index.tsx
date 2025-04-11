
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useEffect } from "react";

const Index = () => {
  const navigate = useNavigate();
  const { user, isLoading } = useAuth();

  useEffect(() => {
    if (!isLoading && user) {
      navigate("/dashboard");
    }
  }, [user, isLoading, navigate]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <div className="max-w-3xl mx-auto text-center p-8">
        <h1 className="text-4xl font-bold text-app-blue mb-6">Leave & Assignment Tracker</h1>
        <p className="text-lg text-gray-600 mb-8">
          A platform for teachers and students to manage assignments, schedules, and leave requests efficiently.
        </p>
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold mb-4">Key Features</h2>
            <ul className="space-y-2 text-left list-disc list-inside">
              <li>Role-based authentication for teachers and students</li>
              <li>Assignment creation and submission</li>
              <li>Class scheduling system</li>
              <li>Leave request management</li>
              <li>Secure and responsive interface</li>
            </ul>
          </div>
          <Button size="lg" onClick={() => navigate("/login")}>
            Get Started
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Index;
