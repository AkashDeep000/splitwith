import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Dashboard from "@/pages/Dashboard";
import Home from "@/pages/Index";
import Login from "@/pages/Login";
import Signup from "@/pages/Signup";
import Invite from "@/pages/Invite";
import Overview from "@/pages/Dashboard/Overview";
import Groups from "@/pages/Dashboard/Groups";
import Group from "@/pages/Dashboard/Groups/Group";
import Transactions from "@/pages/Dashboard/Transactions";
import Settings from "@/pages/Dashboard/Settings";

function App() {
    const queryClient = new QueryClient();
    
  return (
          <QueryClientProvider client={queryClient}>
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/invite/:groupId" element={<Invite />} />

        <Route path="/dashboard" element={<Dashboard />}>
          <Route path="" element={<Overview />} />
          <Route path="groups" element={<Groups />}>
            <Route path=":groupId" element={<Group />} />
          </Route>
          <Route path="transactions" element={<Transactions />} />
          <Route path="settings" element={<Settings />} />
        </Route>
        <Route
          path="*"
          element={
            <main style={{ padding: "1rem" }}>
              <p>There's nothing here!</p>
            </main>
          }
        />
      </Routes>
    </Router>
          </QueryClientProvider>
  );
}

export default App;
