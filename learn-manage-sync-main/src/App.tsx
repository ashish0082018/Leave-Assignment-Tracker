
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import ProtectedRoute from "@/components/ProtectedRoute";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Assignments from "./pages/Assignments";
import AssignmentDetail from "./pages/AssignmentDetail";
import CreateAssignment from "./pages/CreateAssignment";
import Schedules from "./pages/Schedules";
import CreateSchedule from "./pages/CreateSchedule";
import LeaveRequests from "./pages/LeaveRequests";
import CreateLeaveRequest from "./pages/CreateLeaveRequest";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } />
            <Route path="/assignments" element={
              <ProtectedRoute>
                <Assignments />
              </ProtectedRoute>
            } />
            <Route path="/assignments/:id" element={
              <ProtectedRoute>
                <AssignmentDetail />
              </ProtectedRoute>
            } />
            <Route path="/assignments/create" element={
              <ProtectedRoute roles={["TEACHER"]}>
                <CreateAssignment />
              </ProtectedRoute>
            } />
            <Route path="/schedules" element={
              <ProtectedRoute>
                <Schedules />
              </ProtectedRoute>
            } />
            <Route path="/schedules/create" element={
              <ProtectedRoute roles={["TEACHER"]}>
                <CreateSchedule />
              </ProtectedRoute>
            } />
            <Route path="/leave-requests" element={
              <ProtectedRoute>
                <LeaveRequests />
              </ProtectedRoute>
            } />
            <Route path="/leave-requests/create" element={
              <ProtectedRoute roles={["STUDENT"]}>
                <CreateLeaveRequest />
              </ProtectedRoute>
            } />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
