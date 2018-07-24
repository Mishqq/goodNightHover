import styles from './styles/main.sass';
import goodNightHover from './goodNightHover';

const slConfig = {elements: '.get-sleep-1', animationTime: 250};
const slConfig2 = {elements: '.get-sleep-2', reverse: true, animationTime: 150};

document.addEventListener('DOMContentLoaded', event =>{
	let hoverList = new goodNightHover( slConfig );
	let hoverList2 = new goodNightHover( slConfig2 );
});
