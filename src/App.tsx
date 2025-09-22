import Register from "./pages/Authentication/Register/Register";
import { Toaster } from "react-hot-toast";
function App() {
  return (
    <>
      <Toaster position="top-right" />

      <Register />
    </>
  );
}

export default App;
