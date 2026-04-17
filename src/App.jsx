import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './layout/Layout';
import Dashboard from './pages/Dashboard';
import ReferralHub from './pages/ReferralHub';
import Community from './pages/Community';
import SwpPurchase from './pages/SwpPurchase';
import PlaceholderPage from './pages/PlaceholderPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="referral-links" element={<ReferralHub />} />
          <Route path="register" element={<PlaceholderPage title="Register" />} />
          <Route path="community" element={<Community />} />
          <Route path="swp-purchase" element={<SwpPurchase />} />
          <Route path="trading-capital" element={<PlaceholderPage title="Trading Capital" />} />
          <Route path="rank-report" element={<PlaceholderPage title="Rank Report" />} />
          <Route path="payout" element={<PlaceholderPage title="Payout" />} />
          <Route path="services" element={<PlaceholderPage title="Services" />} />
          <Route path="reports" element={<PlaceholderPage title="Reports" />} />
          <Route path="support" element={<PlaceholderPage title="Support" />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
