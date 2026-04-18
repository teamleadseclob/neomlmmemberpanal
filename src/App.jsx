import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/auth/ProtectedRoute';
import Layout from './layout/Layout';
import Dashboard from './pages/Dashboard';
import ReferralHub from './pages/ReferralHub';
import Community from './pages/Community';
import SwpPurchase from './pages/SwpPurchase';
import PlaceholderPage from './pages/PlaceholderPage';
import Login from './pages/Login';
import Register from './pages/Register';
import NotFound from './pages/NotFound';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* ── Public (non-protected) routes ───────────────────── */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* ── Protected routes (require auth) ─────────────────── */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Layout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Dashboard />} />
            <Route path="referral-links" element={<ReferralHub />} />
            <Route path="community" element={<Community />} />
            <Route path="swp-purchase" element={<SwpPurchase />} />
            <Route path="trading-capital" element={<PlaceholderPage title="Trading Capital" />} />
            <Route path="rank-report" element={<PlaceholderPage title="Rank Report" />} />
            <Route path="payout" element={<PlaceholderPage title="Payout" />} />
            <Route path="services" element={<PlaceholderPage title="Services" />} />
            <Route path="reports" element={<PlaceholderPage title="Reports" />} />
            <Route path="support" element={<PlaceholderPage title="Support" />} />
          </Route>

          {/* ── 404 catch-all ───────────────────────────────────── */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
