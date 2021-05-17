import fix_emotes from './modules/fix_emotes';
import socket from './modules/socket';

const DogeFix = {
	fix_emotes,
socket,
}

Object.assign(window, {
	DogeFix,
});
