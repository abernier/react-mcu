import { RouterProvider } from "react-router-dom";
import router from "./router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Mcu } from "react-mcu";

const queryClient = new QueryClient();

function App() {
  return (
    <Mcu source="#0e1216" scheme="vibrant" contrast={0.5} customColors={[]}>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </Mcu>
  );
}

export default App;
