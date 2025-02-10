import { BrowserRouter } from 'react-router-dom'
import AppRoutes from './routes'
import "./global.scss"

function App() {
  return (
    <>
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
    </>
  )
}

export default App
