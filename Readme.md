##goodNightHover =)

Библиотечка представляет собой простенький аналог SleepHover.

Конфиг: <br>
**elements** - класс элементов, для которых вызываем goodNightHover; <br>
**animationTime** - время анимации оверлея; <br>
**reverse** - оверлей будет появляться с противоположной наведению стороны (_true/false_); <br>

Пример:<br>
[demo](https://umgreen.github.io/goodNightHover/dist/)
```
<ul class='list'>
    <li class='list__item get-sleep-1' overlay-data='<p>Mr.Robot<p><p>Season 1<p>'>Content</li>
    <li class='list__item get-sleep-1' overlay-data='<p>Mr.Robot<p><p>Season 1<p>'>Content</li>
</ul>

<ul class='list'>
    <li class='list__item get-sleep-2' overlay-data='<p>Mr.Robot<p><p>Season 2<p>'>Content</li>
    <li class='list__item get-sleep-2' overlay-data='<p>Mr.Robot<p><p>Season 2<p>'>Content</li>
</ul>

const config_1 = {
    elements: '.get-sleep-1', 
    animationTime: 150
};

const config_2 = {
    elements: '.get-sleep-2', 
    reverse: true, 
    animationTime: 150
};

document.addEventListener('DOMContentLoaded', event =>{
    let hoverList = new SleepHover( config_1 );
    let hoverList2 = new SleepHover( config_2 );
});
```
