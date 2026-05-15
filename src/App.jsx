import { BrowserRouter, Routes, Route } from "react-router-dom";
import Splash from "./pages/Splash";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import AddTask from "./pages/AddTask";
import Tasks from "./pages/Tasks";
import AIplan from "./pages/AIplan";
import ProtectedRoute from "./ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Splash />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={
          <ProtectedRoute><Dashboard /></ProtectedRoute>
        } />
        <Route path="/add-task" element={
          <ProtectedRoute><AddTask /></ProtectedRoute>
        } />
        <Route path="/tasks" element={
          <ProtectedRoute><Tasks /></ProtectedRoute>
        } />
        <Route path="/ai-plan" element={
          <ProtectedRoute><AIplan /></ProtectedRoute>
        } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;