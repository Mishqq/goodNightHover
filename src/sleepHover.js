const defCfg = {
	_el: 'slh-elem',
	_elOverlay: 'slh-overlay',
	animationTime: 300
};

const sectorsMap = {
	top_left: 0,
	top_center: 1,
	top_right: 2,
	center_left: 3,
	center_center: 4,
	center_right: 5,
	bottom_left: 6,
	bottom_center: 7,
	bottom_right: 8,
};

class SleepHover {
	constructor( config ){
		if(!config) console.warn(new Error('Неопределён конфиг'));

		this.config = config;


		// Получаем DOM-элементы
		this.items = document.querySelectorAll( this.config.elements );

		// Моделька для всего нашего действа
		this.model = [];
		this.items.forEach( item => this.model.push({
			node: item,
			active: false,
			removing: false,
			overlay: undefined,
			timeoutId: undefined,
			data: item.getAttribute('overlay-data') || '',
			w: 0,
			h: 0
		}));

		this.init();
	}


	/**
	 * Изменение положение оверлея в зависимости от сектора курсора
	 * @param sector
	 * @param overlay
	 * @param w
	 * @param h
	 * @param reverse
	 */
	static setStyleBySector(sector, overlay, w, h, reverse){
		switch (sector) {
			case(0):
				overlay.style.left = (reverse ? w : -w) + 'px';
				overlay.style.top = (reverse ? h : -h) + 'px';
				break;
			case(1):
				overlay.style.left = 0 + 'px';
				overlay.style.top = (reverse ? h : -h) + 'px';
				break;
			case(2):
				overlay.style.left = (reverse ? -w : w) + 'px';
				overlay.style.top = (reverse ? h : -h) + 'px';
				break;
			case(3):
				overlay.style.left = (reverse ? w : -w) + 'px';
				overlay.style.top = 0 + 'px';
				break;
			case(4):
				overlay.style.left = 0 + 'px';
				overlay.style.top = 0 + 'px';
				break;
			case(5):
				overlay.style.left = (reverse ? -w : w) + 'px';
				overlay.style.top = 0 + 'px';
				break;
			case(6):
				overlay.style.left = (reverse ? w : -w) + 'px';
				overlay.style.top = (reverse ? -h : h) + 'px';
				break;
			case(7):
				overlay.style.left = 0 + 'px';
				overlay.style.top = (reverse ? -h : h) + 'px';
				break;
			case(8):
				overlay.style.left = (reverse ? -w : w) + 'px';
				overlay.style.top = (reverse ? -h : h) + 'px';
				break;
		}
	}


	/**
	 * Метод получения направления входа/выхода курсора с элемента
	 * @param event
	 * @param enter
	 * @returns {*}
	 */
	static getDirection( event, enter ){
		let w = event.srcElement.scrollWidth,
			h = event.srcElement.scrollHeight,
			actualX = enter ? event.offsetX - event.movementX : event.offsetX,
			actualY = enter ? event.offsetY - event.movementY : event.offsetY;


		let xDir = (actualX <= w && actualX >= 0) ? 'center' :
			actualX < 0 ? 'left' : actualX > w ?
				'right' : false;

		let yDir = (actualY <= h && actualY >= 0) ? 'center' :
			actualY < 0 ? 'top' : actualY > h ?
				'bottom' : false;

		return sectorsMap[yDir + '_' + xDir];
	}


	/**
	 * Получение объекта из массива по названию поля и его значению
	 * @param array
	 * @param field
	 * @param value
	 * @returns {*}
	 */
	static getObject( array, field, value ){
		return array.filter( item => item[field] === value )[0];
	}


	/**
	 * Инициализация
	 */
	init(){
		this.items.forEach( item => {
			item.classList.add(defCfg._el);

			item.addEventListener('mouseenter', event =>
				this.enterEvent( event.srcElement, SleepHover.getDirection(event, true) ));

			item.addEventListener('mouseleave', event =>
				this.leaveEvent( event.srcElement, SleepHover.getDirection(event) ));
		});
	}


	/**
	 *
	 * @param item
	 * @param sector
	 * Событие наведения курсора на элемент
	 */
	enterEvent(item, sector){
		let currObj = SleepHover.getObject( this.model, 'node', item );
		currObj.active = true;

		if(currObj.removing) {
			clearTimeout( currObj.timeoutId );
			currObj.removing = false;
		} else {
			currObj.w = item.offsetWidth;
			currObj.h = item.offsetHeight;

			currObj.overlay = document.createElement('div');
			currObj.overlay.classList.add(defCfg._elOverlay);
			currObj.overlay.innerHTML = currObj.data;
			SleepHover.setStyleBySector(sector, currObj.overlay, currObj.w, currObj.h, this.config.reverse);
			item.appendChild( currObj.overlay );
		}

		setTimeout(()=>{
			currObj.overlay.style.top = 0 + 'px';
			currObj.overlay.style.left = 0 + 'px'
		}, 0);

	}


	/**
	 *
	 * @param item
	 * @param sector
	 * Событие ухода курсора с элемента
	 */
	leaveEvent(item, sector){
		let currObj = SleepHover.getObject( this.model, 'node', item );
		currObj.active = false;
		currObj.removing = true;

		SleepHover.setStyleBySector(sector, currObj.overlay, currObj.w, currObj.w, this.config.reverse);

		currObj.timeoutId = setTimeout(()=>{
			currObj.removing = false;
			currObj.overlay.remove();
			currObj.overlay = undefined;
			currObj.timeoutId = undefined;
		}, this.config.animationTime);
	}
}

export default SleepHover;
