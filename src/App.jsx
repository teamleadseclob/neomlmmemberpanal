import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './layout/Layout'

function Dashboard() {
  return <h2 style={{ color: '#e2e2f0' }}>Welcome back, Alex.</h2>
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
