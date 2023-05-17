import { theme } from "../theme"
import { ThemeProvider } from "@mui/material/styles"
import CalculatorConstructor from "./components/CalculatorConstructor"

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CalculatorConstructor />
    </ThemeProvider>
  )
}

export default App
