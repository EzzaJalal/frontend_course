import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import CarList from './components/CarList';
function App() {
  return (
    <Container maxWidth="lg">
      <CarList/>
      <CssBaseline/>
    </Container>
  )
}

export default App
