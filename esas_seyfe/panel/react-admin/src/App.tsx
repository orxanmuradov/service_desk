import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import { DataProvider } from './context/DataContext';
import ExcelUpload from './pages/ExcelUpload';
import UserManagement from './pages/UserManagement';

function App() {
  return (
    <Router>
      <DataProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="excel-upload" element={<ExcelUpload />} />
            <Route path="users" element={<UserManagement />} />
          </Route>
        </Routes>
      </DataProvider>
    </Router>
  );
}

export default App;
