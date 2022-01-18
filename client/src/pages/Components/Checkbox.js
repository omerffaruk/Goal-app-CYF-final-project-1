export default function Checkbox({ setTasks, task }) {
	function handleChange() {
		setTasks((prev) =>
			prev.map((currentTask) => {
				if (currentTask.id === task.id) {
					currentTask.iscomplete = !currentTask.iscomplete;
				}
				return currentTask;
			})
		);
	}

	return (
		<li>
			<label style={{ color: `${task.iscomplete ? "green" : "red"}` }}>
				<input
					type="checkbox"
					defaultChecked={task.iscomplete}
					onChange={handleChange}
					name="yesterdays"
					value={task.id}
				/>
				{task.task}
			</label>
		</li>
	);
}
