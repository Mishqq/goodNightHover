import styles from './styles/main.sass';
import SleepHover from './sleepHover';

const slConfig = {elements: '.get-sleep-1', animationTime: 150};
const slConfig2 = {elements: '.get-sleep-2', reverse: true, animationTime: 150};

document.addEventListener('DOMContentLoaded', event =>{
	let hoverList = new SleepHover( slConfig );
	let hoverList2 = new SleepHover( slConfig2 );
});
