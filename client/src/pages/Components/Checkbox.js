import { useState } from "react";
export default function Checkbox({ task }) {
	const [checked, setChecked] = useState(task.iscomplete);
	return (
		<li>
			<input
				type="checkbox"
				defaultChecked={checked}
				onChange={() => setChecked(!checked)}
			/>
			<label>{task.task}</label>
		</li>
	);
}
