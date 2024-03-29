import { exec } from 'child_process';

/**
 * Executes shell command
 * 
 * @param {string} cmd shell command
 * @returns {Promise<boolean>} Were there no errors?
 */
export default async function run (...cmds: string[]): Promise<void> {
	for (const cmd of cmds) {
		await new Promise (resolve => {
			const child = exec(cmd, (error, _stdout, stderr) => resolve(!stderr && !error));
			if (process.stdout && child.stdout) child.stdout.on('data', (chunk: Buffer) => process.stdout.write(chunk));
			if (process.stderr && child.stderr) child.stderr.on('data', (chunk: Buffer) => process.stderr.write(chunk));
		});
	}
}

module.exports = run;

Object.assign(run, {
	default: run,
	run,
});
