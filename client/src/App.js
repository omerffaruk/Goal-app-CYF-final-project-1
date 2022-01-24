import { Route, Routes } from "react-router-dom";
import SignUp from "./pages/SignUp";
import TemporaryTasks from "./pages/Temporary/TemporaryTasks";
import TemporaryUserTasks from "./pages/Temporary/TemporaryUserTasks";
//import UsersTasks from "./pages/Temporary/UsersTasks";
import UsersTasks from "./pages/Components/UsersTasks";
import NavBar from "./pages/Components/NavBar";
import About from "./pages/About";

import ResetPassword from "./pages/Components/ResetPassword";

import Home from "./pages/Home";
import Password from "./pages/Components/Password";
import ForgotPassword from "./pages/ForgotPassword";
function App() {
	return (
		<div className="App">
			<NavBar />
		
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/signup" element={<SignUp />} />
				<Route path="/about" element={<About />} />
				<Route path="/forgot" element={<ForgotPassword />} />

				{/* -----------Temporary Routes--------------- */}
				<Route path="/temporary/tasks" element={<TemporaryTasks />} />
				<Route path="/:username" element={<UsersTasks period={"daily"} />} />
				<Route
					path="/:username/weekly"
					element={<UsersTasks period={"weekly"} />}
				/>
				<Route
					path="/:username/monthly"
					element={<UsersTasks period={"monthly"} />}
				/>
				<Route
					path="/:username/quarterly"
					element={<UsersTasks period={"quarterly"} />}
				/>

				{<Route path="/forgot_password" element={<Password />} />}
				{<Route exact path="/reset_password/:id" element={<ResetPassword />} />}
			</Routes>
		</div>
	);
}
export default App;
