import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/auth/ProtectedRoute';
import SwpGuard from './components/auth/SwpGuard';
import Layout from './layout/Layout';
import Dashboard from './pages/Dashboard';
import ReferralHub from './pages/ReferralHub';
import Community from './pages/Community';
import SwpPurchase from './pages/SwpPurchase';
import TradingCapital from './pages/TradingCapital';
import RewardHistory from './pages/RewardHistory';
import TradingHistory from './pages/TradingHistory';
import RankReport from './pages/RankReport';
import Support from './pages/Support';
import Services from './pages/Services';
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
            {/* SwpGuard wraps all routes except swp-purchase */}
            <Route element={<SwpGuard />}>
              <Route index element={<Dashboard />} />
              <Route path="referral-links" element={<ReferralHub />} />
              <Route path="community" element={<Community />} />
              <Route path="trading-capital" element={<TradingCapital />} />
              <Route path="trading-capital/reward-history" element={<RewardHistory />} />
              <Route path="trading-capital/trading-history" element={<TradingHistory />} />
              <Route path="rank-report" element={<RankReport />} />
              <Route path="payout" element={<PlaceholderPage title="Payout" />} />
              <Route path="services" element={<Services />} />
              <Route path="reports" element={<PlaceholderPage title="Reports" />} />
              <Route path="support" element={<Support />} />
            </Route>
            <Route path="swp-purchase" element={<SwpPurchase />} />
          </Route>

          {/* ── 404 catch-all ───────────────────────────────────── */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
