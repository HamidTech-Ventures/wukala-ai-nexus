import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import ChatPage from "./pages/ChatPage";
import DocumentsPage from "./pages/DocumentsPage";
import LawyersPage from "./pages/LawyersPage";
import LawyerProfilePage from "./pages/LawyerProfilePage";
import NewsPage from "./pages/NewsPage";
import DictionaryPage from "./pages/DictionaryPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<ChatPage />} />
            <Route path="/documents" element={<DocumentsPage />} />
            <Route path="/lawyers" element={<LawyersPage />} />
            <Route path="/lawyer/:id" element={<LawyerProfilePage />} />
            <Route path="/news" element={<NewsPage />} />
            <Route path="/dictionary" element={<DictionaryPage />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
