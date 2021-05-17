import { fs, write } from 'doge-json';
import run from './run';

const modules = fs.readdirSync('src/modules').map(m => m.split(/[\.]+/g).shift());

fs.writeFileSync('src/index.ts',
`${modules.map(module => `import ${module} from './modules/${module}';`).join('\n')}

const DogeFix = {
	${modules.map(module => `${module},`).join('\n')}
}

Object.assign(window, {
	DogeFix,
});
`);

run(
	'nslibmgr make clean',
	'browserify -o lib/bun.js lib/index.js',
	'minify lib/bun.js >dogefix.js',
).then(async () => {
	write('./manifest.json', {
		name: 'DogeFix',
		version: '1.0',
		manifest_version: 2,
		content_scripts: [{
			run_at: 'document_start',
			matches: [
				'https://dogehouse.tv/*',
			],
			js: [
				'dogefix.js',
			],
		}],
	});
});
