import { Outlet } from 'react-router-dom'

export default function App() {
  return (
    <main style={{ minHeight: '100vh' }}>
      <Outlet />
    </main>
  )
}
