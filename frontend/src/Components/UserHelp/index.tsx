import { useState } from 'react';
import style from './style.module.scss';


const Content = () => {
	return (
		<>
			<h2>How to use the app:</h2>
			<div className={style.split}>
			<div className={style.splitChild}>
					<h4>Authentication profile creation</h4>
					<ul className={style.list}>
						<li>Log/Sign in</li>
						<li>While on user page click Create keystrokes profile</li>
						<li>Enter the displayed string of letters about 20 times (the exact amount may vary)</li>
						<li>Once finished, you may start authenticating</li>
					</ul>
				</div>
				<div className={style.splitChild}>
					<h4>Authentication</h4>
					<ul className={style.list}>
						<li>Log/Sign in</li>
						<li>Enter home page and click Start</li>
						<li>Choose the user you want to authenticate as</li>
						<li>Enter the displayed string of numbers</li>
					</ul>
				</div>
			</div>

		</>
	)
}

export default function UserHelp() {
	const [isHidden, setIsHidden] = useState(false);
	if(isHidden) {
		return <></>
	}
	return (
		<>
		<div className={style.modalContainer}>
			<div className={style.modal}>
				<div className={style.modalContent}>
					<Content />
					<div className={style.centered}>
						<button className={style.button} onClick={() => setIsHidden(true)}>Ok</button>
					</div>
				</div>
			</div>
			<div className={style.backdrop} />
		</div>
		</>
	)
}