import { lazy, Suspense } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import FakeAuthProvider from './context/FakeAuthContext';
import CitiesProvider from './context/CitiesContext';
import ProtectedRoutes from './pages/protected-routes/ProtectedRoutes';

import Form from './components/form/Form';
import CityList from './components/city-list/CityList';
import City from './components/city/City';
import CountryList from './components/country-list/CountryList';
import SpinnerFullPage from './components/spinner-full-page/SpinnerFullPage';

const HomePage = lazy(() => import('./pages/homepage/Homepage'));
const Product = lazy(() => import('./pages/product/Product'));
const Pricing = lazy(() => import('./pages/pricing/Pricing'));
const AppLayout = lazy(() => import('./pages/layout/AppLayout'));
const Login = lazy(() => import('./pages/login/Login'));
const PageNotFound = lazy(() => import('./pages/page-not-found/PageNotFound'));

function App() {
  return (
    <FakeAuthProvider>
      <CitiesProvider>
        <BrowserRouter>
          <Suspense fallback={<SpinnerFullPage />}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="product" element={<Product />} />
              <Route path="pricing" element={<Pricing />} />
              <Route path="login" element={<Login />} />
              <Route
                path="app"
                element={
                  <ProtectedRoutes>
                    <AppLayout />
                  </ProtectedRoutes>
                }
              >
                <Route index element={<Navigate to="cities" replace />} />
                <Route path="cities" element={<CityList />} />
                <Route path="cities/:id" element={<City />} />
                <Route path="countries" element={<CountryList />} />
                <Route path="form" element={<Form />} />
              </Route>
              <Route path="*" element={<PageNotFound />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </CitiesProvider>
    </FakeAuthProvider>
  );
}

export default App;
