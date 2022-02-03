import React from "react";





const Guide = () => {

	return (
		<div className="guide-ctn">
			<h3 className="guide-heading"> Getting started with GoalApp </h3>
			<h5> How to register a new account?</h5>
			<img src="register.jpg" alt="register"></img>
			<h5>How to create your first stand-up? </h5>
			<p>
				User can add a new task via their dashboard, they can enter new task in
				the area in daily tab, after entering new task, user needs to click
				submit button in order to save it.
			</p>
			<img src="standup" alt="standup"></img>
			<h5>How to add, edit and delete your task?</h5>
			<p>
				{" "}
				User can add with edit with and delete with these icons provided
				respectively.
			</p>
			<h5> Can I check my previous tasks? </h5>{" "}
			<p>
				Yes, previous day, week’s, month’s and quarter’s tasks can be viewed by
				clicking on daily, weekly monthly and quarterly tabs.
			</p>
			<h5>Are the tasks in this app sorted? </h5>
			<p>Yes the tasks are sorted and ordered by dates.</p>
			<h5>Would this app allow me to search my tasks? </h5>
			<p>Yes user can search their tasks using search bar in the dashboard.</p>
			<h5>Can I shift my incomplete tasks to the complete tasks if I have finished
			it?</h5> <p>Yes user can finish the task and then move the incomplete task to
			completed tasks using this icon in the incomplete tasks area</p>
		</div>
	);
};
export default Guide