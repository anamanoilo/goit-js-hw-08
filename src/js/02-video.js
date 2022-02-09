import Player from '@vimeo/player';
import throttle from 'lodash.throttle';
import * as storage from '../services/localStorage';

const iframe = document.querySelector('iframe');
const player = new Player(iframe);
const CURRENT_TIME = 'videoplayer-current-time';

const timeupdateHandler = function (data) {
  storage.save(CURRENT_TIME, data.seconds);
};

player.on('timeupdate', throttle(timeupdateHandler, 1000));
player.setCurrentTime(storage.get(CURRENT_TIME) || 0);

//alternative

// const timeupdateHandler = function (data) {
//   localStorage.setItem(CURRENT_TIME, JSON.stringify(data.seconds));
// };

// player.on('timeupdate', throttle(timeupdateHandler, 1000));
// player.setCurrentTime(JSON.parse(localStorage.getItem(CURRENT_TIME)));
