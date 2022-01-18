import { Route, Routes } from "react-router-dom";
import SignUp from "./pages/SignUp";
import TemporaryTasks from "./pages/Temporary/TemporaryTasks";
import TemporaryUserTasks from "./pages/Temporary/TemporaryUserTasks";
//import UsersTasks from "./pages/Temporary/UsersTasks";
import UsersTasks from "./pages/Components/UsersTasks";
import NavBar from "./pages/Components/NavBar";
import About from "./pages/About";

import Home from "./pages/Home";

function App() {
	return (
		<div className="App">
			<NavBar />
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/signup" element={<SignUp />} />
				<Route path="/about" element={<About />} />

				{/* -----------Temporary Routes--------------- */}
				<Route path="/temporary/tasks" element={<TemporaryTasks />} />
				{/* <Route path="/temporary/tasks/:userName" element={<UsersTasks />} /> */}
				<Route path="/:username" element={<UsersTasks />} />
			</Routes>
		</div>
	);

}
export default App;
