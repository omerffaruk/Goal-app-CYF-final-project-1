import { Route, Routes } from "react-router-dom";
import TemporaryTasks from "./pages/Temporary/TemporaryTasks";
import TemporaryUserTasks from "./pages/Temporary/TemporaryUserTasks";


import Home from "./pages/Home";

function App() {
  return (
    <div className="App">
      {/* <NavBar /> */}
      <Routes>
        <Route path="/" element={<Home />} />

        {/* -----------Temporary Routes--------------- */}
        <Route path="/temporary/tasks" element={<TemporaryTasks />} />
        <Route path="/temporary/tasks/:username" element={<TemporaryUserTasks />} />

      </Routes>
    </div>
  );
}
export default App;
