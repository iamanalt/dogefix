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
	'minify lib/bun.js >lib/min.js',
).then(async () => {
	write('./manifest.json', {
		name: 'DogeSuite',
		version: '1.1',
		manifest_version: 2,
		web_accessible_resources: [
			'*',
		],
		content_scripts: [{
			run_at: "document_start",
			matches: [
				"https://dogehouse.tv/*"
			],
			js: [
				"dogefix.js"
			],
		}],
	});
}).then(async () => {
	fs.writeFileSync('dogefix.js', `
;(function() {

	function inject() {
		const script = document.createElement('script')
		script.text = \`${fs.readFileSync('./lib/min.js', 'utf8').replace(/[\`]+/gi, '\\`')}\`
		document.documentElement.appendChild(script)
	}

	inject();
})()
	`)
})
