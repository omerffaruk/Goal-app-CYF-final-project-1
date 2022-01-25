import React from "react";
import anzaPic from "../images/anza.png";
import dharmaPic from "../images/dharma.png";
import musaPic from "../images/musa.png";
import omerPic from "../images/omer.png";

import { BsLinkedin, BsTwitter, BsGithub } from "react-icons/bs";

const About = () => (
	<main role="main" className="bg-green-600 px-9 rounded about-ctn ">
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
			<div className="team-title-ctn">
				<h2>Meet the team HTCT</h2>
			</div>
			<div className="team-pics-ctn">
				<div className="person-ctn">
					<div className="person-pic-ctn">
						<img src={anzaPic} alt="Anza Azam" />
					</div>
					<div className="person-info-ctn">
						<h4>Anza Azam</h4>
						<div className="person-border-bottom"></div>
						<p>
							Anza is a NW4 trainee, CYF was her game changer and gave her
							meaningful purpose, now she enjoys challenging herself via coding
							and problem solving.
						</p>
						<div className="person-links-ctn">
							<div className="linkedin-logo">
								<a
									href="https://www.linkedin.com/in/anza-azam-a4564b214/"
									target="_blank"
									rel="noreferrer"
								>
									<BsLinkedin />
								</a>
							</div>
							<div className="twitter-logo">
								<a href="https://twitter.com/" target="_blank" rel="noreferrer">
									<BsTwitter />
								</a>
							</div>
							<div className="github-logo">
								<a
									href="https://github.com/Anza-Azam"
									target="_blank"
									rel="noreferrer"
								>
									<BsGithub />
								</a>
							</div>
						</div>
					</div>
				</div>
				<div className="person-ctn">
					<div className="person-pic-ctn">
						<img src={musaPic} alt="Musa Yuksel" />
					</div>
					<div className="person-info-ctn">
						<h4>Musa Yuksel</h4>
						<div className="person-border-bottom"></div>
						<p>Dharma is a NW4 trainee, former theatre kid turned coder.</p>
						<div className="person-links-ctn">
							<div className="linkedin-logo">
								<a
									href="https://www.linkedin.com/in/musa-yuksel-625838205/"
									target="_blank"
									rel="noreferrer"
								>
									<BsLinkedin />
								</a>
							</div>
							<div className="twitter-logo">
								<a href="https://twitter.com/" target="_blank" rel="noreferrer">
									<BsTwitter />
								</a>
							</div>
							<div className="github-logo">
								<a
									href="https://github.com/musayuksel"
									target="_blank"
									rel="noreferrer"
								>
									<BsGithub />
								</a>
							</div>
						</div>
					</div>
				</div>
				<div className="person-ctn">
					<div className="person-pic-ctn">
						<img src={dharmaPic} alt="Dharma Emmelene" />
					</div>
					<div className="person-info-ctn">
						<h4>Dharma Emmelene</h4>
						<div className="person-border-bottom"></div>
						<p>
							Dharma is a NW4 trainee, former theatre kid turned coder.
							Programming still allows her to explore her creativity being able
							to build something from nothing.
						</p>
						<div className="person-links-ctn">
							<div className="linkedin-logo">
								<a
									href="https://www.linkedin.com/in/dharma-emmelene-259b191b5/"
									target="_blank"
									rel="noreferrer"
								>
									<BsLinkedin href="https://www.linkedin.com/" />
								</a>
							</div>
							<div className="twitter-logo">
								<a
									href="https://twitter.com/@Dharma_Emmelene"
									target="_blank"
									rel="noreferrer"
								>
									<BsTwitter />
								</a>
							</div>
							<div className="github-logo">
								<a
									href="https://github.com/dharmaguadeloupe"
									target="_blank"
									rel="noreferrer"
								>
									<BsGithub />
								</a>
							</div>
						</div>
					</div>
				</div>
				<div className="person-ctn">
					<div className="person-pic-ctn">
						<img src={omerPic} alt="Omer Faruk" />
					</div>
					<div className="person-info-ctn">
						<h4>Omer Yamak</h4>
						<div className="person-border-bottom"></div>
						<p>
							Omer is a NW4 trainee. His coding journey started with CYF. Since
							then, he has been enjoying coding. In his free time, he trains
							Kickboxing.
						</p>
						<div className="person-links-ctn">
							<div className="linkedin-logo">
								<a
									href="https://www.linkedin.com/in/omer-yamak-539a84214/"
									target="_blank"
									rel="noreferrer"
								>
									<BsLinkedin />
								</a>
							</div>
							<div className="twitter-logo">
								<a
									href="https://twitter.com/merFarukYamak1"
									target="_blank"
									rel="noreferrer"
								>
									<BsTwitter />
								</a>
							</div>
							<div className="github-logo">
								<a
									href="https://github.com/omerffaruk"
									target="_blank"
									rel="noreferrer"
								>
									<BsGithub />
								</a>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</main>
);

export default About;
