import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ProfileProvider } from './context/ProfileContext';
import { useAuth } from './context/useAuth';
import ProtectedRoute from './components/auth/ProtectedRoute';
import SwpGuard from './components/auth/SwpGuard';
import Layout from './layout/Layout';
import LandingPage from './pages/landing/LandingPage';
import Login from './pages/Login';

const Dashboard      = lazy(() => import('./pages/Dashboard'))
const ReferralHub    = lazy(() => import('./pages/ReferralHub'))
const Community      = lazy(() => import('./pages/Community'))
const SwpPurchase    = lazy(() => import('./pages/SwpPurchase'))
const TradingCapital = lazy(() => import('./pages/TradingCapital'))
const RewardHistory  = lazy(() => import('./pages/RewardHistory'))
const TradingHistory    = lazy(() => import('./pages/TradingHistory'))
const MultilevelHistory         = lazy(() => import('./pages/MultilevelHistory'))
const RankReport     = lazy(() => import('./pages/RankReport'))
const Payout         = lazy(() => import('./pages/Payout'))
const Support        = lazy(() => import('./pages/Support'))
const Services       = lazy(() => import('./pages/Services'))
const PlaceholderPage = lazy(() => import('./pages/PlaceholderPage'))

const Register            = lazy(() => import('./pages/Register'))
const OtpVerify           = lazy(() => import('./pages/OtpVerify'))
const NotFound            = lazy(() => import('./pages/NotFound'))
const TermsAndConditions  = lazy(() => import('./pages/TermsAndConditions'))
const Profile             = lazy(() => import('./pages/Profile'))
const Markets             = lazy(() => import('./pages/Markets'))

const PrivacyPolicy       = lazy(() => import('./pages/landing/PrivacyPolicy'))
const TermsConditionsLanding = lazy(() => import('./pages/landing/TermsConditionsLanding'))

function PageLoader() {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <span className="w-8 h-8 border-2 border-purple-500/30 border-t-purple-500 rounded-full animate-spin" />
    </div>
  )
}

function HomeRoute() {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) return <LandingPage />;
  return <Navigate to="/dashboard" replace />;
}

function App() {
  return (
    <AuthProvider>
      <ProfileProvider>
      <BrowserRouter>
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<HomeRoute />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms-conditions" element={<TermsConditionsLanding />} />
            <Route path="/login"    element={<Login />} />
            <Route path="/register"    element={<Register />} />
            <Route path="/verify-otp"  element={<OtpVerify />} />
            <Route path="/terms"       element={<TermsAndConditions />} />

            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Layout />
                </ProtectedRoute>
              }
            >
              <Route element={<SwpGuard />}>
                <Route index                              element={<Dashboard />} />
                <Route path="referral-links"              element={<ReferralHub />} />
                <Route path="community"                   element={<Community />} />
                <Route path="trading-capital"             element={<TradingCapital />} />
                <Route path="trading-capital/reward-history"  element={<RewardHistory />} />
                <Route path="trading-capital/trading-history"    element={<TradingHistory />} />
                <Route path="trading-capital/multilevel-history"       element={<MultilevelHistory />} />
                <Route path="rank-report"                 element={<RankReport />} />
                <Route path="payout"                      element={<Payout />} />
                <Route path="services"                    element={<Services />} />
                {/* <Route path="reports"                     element={<PlaceholderPage title="Reports" />} /> */}
                <Route path="support"                     element={<Support />} />
                <Route path="profile"                     element={<Profile />} />
                <Route path="markets"                     element={<Markets />} />
              </Route>
              <Route path="swp-purchase" element={<SwpPurchase />} />
            </Route>

            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
      </ProfileProvider>
    </AuthProvider>
  );
}

export default App;
