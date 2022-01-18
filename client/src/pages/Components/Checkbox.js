export default function Checkbox({ setTasks, task }) {
	function handleChange() {
		setTasks((prev) =>
			prev.map((currentTask) => {
				if (currentTask.taskid === task.taskid) {
					currentTask.iscomplete = !currentTask.iscomplete;
				}
				return currentTask;
			})
		);
	}

	return (
		<li>
			<label>
				<input
					type="checkbox"
					defaultChecked={task.iscomplete}
					onChange={handleChange}
					name="yesterdays"
					value={task.taskid}
				/>
				{task.task}
			</label>
		</li>
	);
}
