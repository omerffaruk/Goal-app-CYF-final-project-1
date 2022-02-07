import React, { useState } from "react";
import anzaPic from "../images/anza.png";
import dharmaPic from "../images/dharma.png";
import musaPic from "../images/musa.png";
import omerPic from "../images/omer.png";
import {
	MdModeEdit,
	MdDone,
	MdDeleteOutline,
	MdOutlineIndeterminateCheckBox,
} from "react-icons/md";
import standup from "../images/standup1.png";
import {
	AiOutlineMinus,
	AiOutlinePlus,
	AiOutlineCaretDown,
	AiOutlineCaretUp,
} from "react-icons/ai";
import { BsLinkedin, BsTwitter, BsGithub } from "react-icons/bs";
import { Link } from "react-router-dom";

const About = () => {
	const [questionOneClicked, setQuestionOneClicked] = useState(false);
	const [questionTwoClicked, setQuestionTwoClicked] = useState(false);
	const [questionThreeClicked, setQuestionThreeClicked] = useState(false);
	const [questionFourClicked, setQuestionFourClicked] = useState(false);
	const [questionFiveClicked, setQuestionFiveClicked] = useState(false);
	const [questionSixClicked, setQuestionSixClicked] = useState(false);
	const [questionSevenClicked, setQuestionSevenClicked] = useState(false);
	const handleQuestionClick = (state, setState) => {
		return setState(!state);
	};
	return (
		<main role="main" className="bg-green-600 px-9 rounded about-ctn ">
			<div>
				<h2>About Goal</h2>
				<p>
					Keep track of your daily tasks with the Goal! app created by HTCT
					(Hyper Talent Coding Team). Using either Slack or the webapp
					interface, this app allows you to record your daily goals. These are
					uploaded to the database for future retrieval, especially useful for
					you to monitor your progress, throughout the course and beyond. Spend
					10 mins each day asking yourself these questions:
					<br />
					What did I accomplish yesterday?
					<br />
					What do I plan to accomplish today?
					<br />
					What are my issues(blockers)?
				</p>
				<section className="guide-ctn">
					<h3 className="guide-heading"> Frequently Asked Questions </h3>
					<article className="question">
						<header>
							<h5>Register a new account?</h5>
							<button
								aria-label={questionOneClicked ? "hide answer" : "show answer"}
								onClick={() =>
									handleQuestionClick(questionOneClicked, setQuestionOneClicked)
								}
							>
								{questionOneClicked ? (
									<AiOutlineCaretUp />
								) : (
									<AiOutlineCaretDown />
								)}
							</button>
						</header>
						{questionOneClicked && (
							<p>
								New users can signup for an account{" "}
								<Link to={"/signup"}>here</Link>
							</p>
						)}
					</article>
					<article className="question">
						<header>
							<h5>Where to find Slack id?</h5>
							<button
								aria-label={questionTwoClicked ? "hide answer" : "show answer"}
								onClick={() =>
									handleQuestionClick(questionTwoClicked, setQuestionTwoClicked)
								}
							>
								{questionTwoClicked ? <AiOutlineMinus /> : <AiOutlinePlus />}
							</button>
						</header>
						{questionTwoClicked && (
							<p>
								You can find your Slack id in your Slack profile in
								CodeYourFuture workspace. To watch the video where to find Slack
								id please click{" "}
								<a
									href="https://youtu.be/6qcA4z3srCA"
									target="_blank"
									rel="noreferrer"
								>
									here
								</a>
							</p>
						)}
					</article>
					{/*
				<div id="video-ctn">
				<iframe
					id="video"
					width="560"
					height="315"
					src={"https://youtube.com/embed/6qcA4z3srCA"}
					title="howToVideo"
					frameBorder="0"
					allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
					allowFullScreen
				></iframe>
			</div> */}
					<article className="question">
						<header>
							<h5>How to create your first stand-up?</h5>
							<button
								aria-label={
									questionThreeClicked ? "hide answer" : "show answer"
								}
								onClick={() =>
									handleQuestionClick(
										questionThreeClicked,
										setQuestionThreeClicked
									)
								}
							>
								{questionThreeClicked ? <AiOutlineMinus /> : <AiOutlinePlus />}
							</button>
						</header>
						{questionThreeClicked && (
							<div>
								<p>
									Enter the task in the field shown and click to save. Button
									will become active after text input
								</p>
								<div className="image-ctn">
									<img className="faq-img" src={standup} alt="standup"></img>
								</div>
							</div>
						)}
					</article>

					<article className="question">
						<header>
							<h5>What do the icons mean?</h5>
							<button
								aria-label={questionFourClicked ? "hide answer" : "show answer"}
								onClick={() =>
									handleQuestionClick(
										questionFourClicked,
										setQuestionFourClicked
									)
								}
							>
								{questionFourClicked ? <AiOutlineMinus /> : <AiOutlinePlus />}
							</button>
						</header>
						{questionFourClicked && (
							<div className="edit">
								<p>
									<MdModeEdit />
									Edit your task
								</p>
								<p>
									<MdDone />
									Save after editing
								</p>
								<p>
									<MdDeleteOutline />
									Delete task
								</p>
							</div>
						)}
					</article>
					<article className="question">
						<header>
							<h5>How to review previous tasks? </h5>
							<button
								aria-label={questionFiveClicked ? "hide answer" : "show answer"}
								onClick={() =>
									handleQuestionClick(
										questionFiveClicked,
										setQuestionFiveClicked
									)
								}
							>
								{questionFiveClicked ? <AiOutlineMinus /> : <AiOutlinePlus />}
							</button>
						</header>
						{questionFiveClicked && (
							<p>
								Previous day/week/month/quarterly tasks can be viewed via their
								tabs.
							</p>
						)}
					</article>
					<article className="question">
						<header>
							<h5>How do I mark a task as completed?</h5>
							<button
								aria-label={questionSixClicked ? "hide answer" : "show answer"}
								onClick={() =>
									handleQuestionClick(questionSixClicked, setQuestionSixClicked)
								}
							>
								{questionSixClicked ? <AiOutlineMinus /> : <AiOutlinePlus />}
							</button>
						</header>
						{questionSixClicked && (
							<p>
								Clicking this icon
								<MdOutlineIndeterminateCheckBox />
							</p>
						)}
					</article>
					<article className="question">
						<header>
							<h5>Can I reset my password if I lose it?</h5>
							<button
								aria-label={questionSevenClicked ? "hide answer" : "show answer"}
								onClick={() =>
									handleQuestionClick(
										questionSevenClicked,
										setQuestionSevenClicked
									)
								}
							>
								{questionSevenClicked ? <AiOutlineMinus /> : <AiOutlinePlus />}
							</button>
						</header>
						{questionSevenClicked && (
							<p>
								Yes you can. You can reset password{" "}
								<Link to={"/forgot_password"}>here</Link>
							</p>
						)}
					</article>
				</section>
			</div>
			<div className="team-ctn">
				<div className="team-title-ctn">
					<h3>Meet the team HTCT</h3>
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
								meaningful purpose, now she enjoys challenging herself via
								coding and problem solving.
							</p>
							<div className="person-links-ctn">
								<div className="linkedin-logo">
									<a
										href="https://www.linkedin.com/in/anza-azam-a4564b214/"
										target="_blank"
										rel="noreferrer"
										aria-label="link to LinkedIn profile"
									>
										<BsLinkedin />
									</a>
								</div>
								<div className="twitter-logo">
									<a
										href="https://twitter.com/"
										target="_blank"
										rel="noreferrer"
										aria-label="link to twitter profile"
									>
										<BsTwitter />
									</a>
								</div>
								<div className="github-logo">
									<a
										href="https://github.com/Anza-Azam"
										target="_blank"
										rel="noreferrer"
										aria-label="link to github profile"
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
							<p>
								Musa is a former instructor pilot turned NW4 trainee with
								CodeYourFuture. When he's not found sat in front of a computer
								working on his numerous projects, he enjoys spending time in
								nature where you're apt to find him cycling. A passion of his.
							</p>
							<div className="person-links-ctn">
								<div className="linkedin-logo">
									<a
										href="https://www.linkedin.com/in/musa-yuksel-625838205/"
										target="_blank"
										rel="noreferrer"
										aria-label="link to LinkedIn profile"
									>
										<BsLinkedin />
									</a>
								</div>
								<div className="twitter-logo">
									<a
										href="https://twitter.com/"
										target="_blank"
										rel="noreferrer"
										aria-label="link to twitter"
									>
										<BsTwitter />
									</a>
								</div>
								<div className="github-logo">
									<a
										href="https://github.com/musayuksel"
										target="_blank"
										rel="noreferrer"
										aria-label="link to github profile"
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
								Programming still allows her to explore her creativity being
								able to build something from nothing.
							</p>
							<div className="person-links-ctn">
								<div className="linkedin-logo">
									<a
										href="https://www.linkedin.com/in/dharma-emmelene-259b191b5/"
										target="_blank"
										rel="noreferrer"
										aria-label="link to LinkedIn profile"
									>
										<BsLinkedin href="https://www.linkedin.com/" />
									</a>
								</div>
								<div className="twitter-logo">
									<a
										href="https://twitter.com/@Dharma_Emmelene"
										target="_blank"
										rel="noreferrer"
										aria-label="link to twitter profile"
									>
										<BsTwitter />
									</a>
								</div>
								<div className="github-logo">
									<a
										href="https://github.com/dharmaguadeloupe"
										target="_blank"
										rel="noreferrer"
										aria-label="link to github profile"
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
								Omer is a NW4 trainee. His coding journey started with CYF.
								Since then, he has been enjoying coding. In his free time, he
								trains Kickboxing.
							</p>
							<div className="person-links-ctn">
								<div className="linkedin-logo">
									<a
										href="https://www.linkedin.com/in/omer-yamak-539a84214/"
										target="_blank"
										rel="noreferrer"
										aria-label="link to LinkedIn profile"
									>
										<BsLinkedin />
									</a>
								</div>
								<div className="twitter-logo">
									<a
										href="https://twitter.com/merFarukYamak1"
										target="_blank"
										rel="noreferrer"
										aria-label="link to twitter profile"
									>
										<BsTwitter />
									</a>
								</div>
								<div className="github-logo">
									<a
										href="https://github.com/omerffaruk"
										target="_blank"
										rel="noreferrer"
										aria-label="link to github profile"
									>
										<BsGithub />
									</a>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			<footer>
				<a
					href="https://github.com/musayuksel/Goal-app-CYF-final-project"
					target="_blank"
					rel="noreferrer"
					aria-label="link to codebase"
				>
					<BsGithub />
					Check out the codebase
				</a>
			</footer>
		</main>
	);
};

export default About;
