import React from "react";

const ForgotPassword = () => {
	return (
		<div className="forgot-psw-ctn">
			<div>
				<h3>Forgot your password?</h3>
				<p>
					Please enter the email address registered for your account. A
					verification code will be sent. You will be able to choose a new
					password for your account.
				</p>
			</div>
			<div>
				<form>
					<div className="form-field">
						<div className="label-ctn">
							<label htmlFor="email">Email</label>
						</div>
						<input
							type="email"
							id="email"
							placeholder="mail@abc.com"
							required
						></input>
					</div>
				</form>
			</div>
			<div>
				<button type="button" className="login-btn">Reset</button>
			</div>
		</div>
	);
};

export default ForgotPassword;

/*buttons are just decorative for now*/
