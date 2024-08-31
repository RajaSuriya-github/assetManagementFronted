import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { MantineProvider } from '@mantine/core';
import { LoginPage } from './pages/LoginPage';
import { DashboardPage } from './pages/DashboardPage';
import { ProfilePage } from './pages/ProfilePage';
import { useAuth } from './hooks/useAuth';
import '@mantine/core/styles.layer.css';
import 'mantine-datatable/styles.layer.css';
import Navbar from './pages/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
function App() {
  const { user } = useAuth();
const show=(JSON.parse(sessionStorage.getItem("data"))!=="");
  return (
    <MantineProvider theme={{ fontFamily: 'Greycliff CF, sans-serif' }}>
      {/* <MantineProvider withGlobalStyles withNormalizeCSS></MantineProvider> */}
       {show&&<Navbar/>}
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          {user ? (
            <>
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="*" element={<Navigate to="/dashboard" />} />
            </>
          ) : (
            <Route path="*" element={<Navigate to="/login" />} />
          )}
        </Routes>
    </MantineProvider>
  );
}

export default App;
