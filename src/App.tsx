import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Dashboard from "./pages/Dashboard";
import VideoFeed from "./pages/VideoFeed";
import CreateQuest from "./pages/CreateQuest";
import FocusMode from "./pages/FocusMode";
import AcceptQuest from "./pages/AcceptQuest";
import Leaderboard from "./pages/Leaderboard";
import Inventory from "./pages/Inventory";
import Profile from "./pages/Profile";
import RewardsStore from "./pages/RewardsStore";
import Analytics from "./pages/Analytics";
import Auth from "./pages/Auth";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/feed" element={<VideoFeed />} />
          <Route path="/create-quest" element={<CreateQuest />} />
          <Route path="/focus" element={<FocusMode />} />
          <Route path="/accept-quest" element={<AcceptQuest />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/inventory" element={<Inventory />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/shop" element={<RewardsStore />} />
          <Route path="/analytics" element={<Analytics />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
