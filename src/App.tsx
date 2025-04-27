import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import MenuPage from './pages/MenuPage';
import TimeSlotsPage from './pages/TimeSlotsPage';
import OrderSummaryPage from './pages/OrderSummaryPage';
import ConfirmationPage from './pages/ConfirmationPage';

function App() {
  const location = useLocation();

  return (
    <Layout>
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<HomePage />} />
          <Route path="/menu" element={<MenuPage />} />
          <Route path="/time-slots" element={<TimeSlotsPage />} />
          <Route path="/order-summary" element={<OrderSummaryPage />} />
          <Route path="/confirmation" element={<ConfirmationPage />} />
        </Routes>
      </AnimatePresence>
    </Layout>
  );
}

export default App;