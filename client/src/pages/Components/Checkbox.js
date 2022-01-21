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
			<label>
				<input
					type="checkbox"
					defaultChecked={task.iscomplete}
					onChange={handleChange}
					name="yesterdays"
					value={task.id}
				/>
				<span></span>
				{task.task}
			</label>
		</li>
	);
}
