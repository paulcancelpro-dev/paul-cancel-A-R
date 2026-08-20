import { Navigate, Route, Routes } from 'react-router-dom'
import Header from './components/Header.jsx'
import RouteScrollManager from './components/RouteScrollManager.jsx'
import ContactPage from './pages/ContactPage.jsx'
import HomePage from './pages/HomePage.jsx'
import './App.css'

function App() {
  return (
    <div className="site-shell">
      <RouteScrollManager />
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  )
}

export default App
