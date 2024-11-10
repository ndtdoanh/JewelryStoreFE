import { router } from "./routes/routes";
import { RouterProvider } from "react-router-dom";
import "@fontsource/jost"; // Defaults to weight 400

import "./App.css";

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
