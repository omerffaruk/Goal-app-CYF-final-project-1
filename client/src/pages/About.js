import React from "react";
import anzaPic from "../images/anza.png";
import dharmaPic from "../images/dharma.png";
import musaPic from "../images/musa.png";
import omerPic from "../images/omer.png";

const About = () => (
	<main role="main">
		<div>
			<h2>About</h2>
			<p>
				As part of the Scrum process in the Agile methodology, teams/trainees
				are encouraged to perform a Daily Standup meeting. The Daily Standup is
				a brief meeting where team members discuss what's going on in their
				current work sprint to see if any issues have come up. Keep track of
				your tasks with the Goal! app created by HTCT.
			</p>
			<h4>What is the Daily Stand-Up?</h4>
			<ul>
				<li>15 minutes, same time every day</li>
				<li>
					3 Questions:
					<ul>
						<li>What Did I accomplish yesterday?</li>
						<li>What do I plan to accomplish today?</li>
						<li>What are my blockers(issues)?</li>
					</ul>
				</li>
			</ul>
		</div>
		<div className="team-ctn">
			<h3>Meet the team HTCT</h3>
			<div className="team-pic-ctn">
				<img src={anzaPic} alt="Anza Azam" />
			</div>
			<div className="team-pic-ctn">
				<img src={dharmaPic} alt="Dharma Emmelene" />
				<p>Dharma is a NW4 trainee, former theatre kid turned coder.</p>
			</div>
			<div className="team-pic-ctn">
				<img src={musaPic} alt="Musa Yuksel" />
			</div>
			<div className="team-pic-ctn">
				<img src={omerPic} alt="Omer Faruk" />
			</div>
		</div>
	</main>
);

export default About;
