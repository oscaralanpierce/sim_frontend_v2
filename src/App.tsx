import { BrowserRouter as Router } from 'react-router-dom'

const App = () => (
  <Router basename={import.meta.env.PUBLIC_URL as string}>
  </Router>
)

export default App