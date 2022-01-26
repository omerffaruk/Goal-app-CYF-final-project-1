import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { MdOutlineFilterList } from "react-icons/md";
import OldTasks from "./OldTasks";
import CurrentDayTasks from "./CurrentDayTasks";
export default function Dashboard({ period }) {
	const [toggleMenuClass, setToggleMenuClass] = useState(false);
	const { username } = useParams();
	return (
		<section>
			<section className="task-filter-container">
				<MdOutlineFilterList
					className={"task-filter-icon"}
					onClick={() => setToggleMenuClass((prev) => !prev)}
				/>
				<div
					className={`filter-btn-container ${toggleMenuClass ? "open" : ""}`}
				>
					<Link
						className={`${period === "daily" ? "active" : ""}`}
						onClick={() => {
							setToggleMenuClass(false);
						}}
						to={`/${username}`}
					>
						Daily
					</Link>
					<Link
						className={`${period === "weekly" ? "active" : ""}`}
						onClick={() => {
							setToggleMenuClass(false);
						}}
						to={`/${username}/weekly`}
					>
						Weekly
					</Link>
					<Link
						className={`${period === "monthly" ? "active" : ""}`}
						onClick={() => {
							setToggleMenuClass(false);
						}}
						to={`/${username}/monthly`}
					>
						Monthly
					</Link>
					<Link
						className={`${period === "quarterly" ? "active" : ""}`}
						onClick={() => {
							setToggleMenuClass(false);
						}}
						to={`/${username}/quarterly`}
					>
						Quarterly
					</Link>
				</div>
				<input className="task-search" type="text" placeholder="Search..." />
			</section>
			{period === "daily" ? (
				<CurrentDayTasks period={period} />
			) : (
				<OldTasks period={period} />
			)}
		</section>
	);
}
