import { Mcu } from "react-mcu";
import Home from "./Home";

function App() {
  return (
    <Mcu source="#0e1216" scheme="vibrant" contrast={0.5} customColors={[]}>
      <Home />
    </Mcu>
  );
}

export default App;
