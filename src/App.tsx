import { BrowserRouter as Router } from 'react-router-dom'
import PageRoutes from './routing/pageRoutes'

const App = () => (
  <Router basename={import.meta.env.PUBLIC_URL as string}>
    <PageRoutes />
  </Router>
)

export default App
