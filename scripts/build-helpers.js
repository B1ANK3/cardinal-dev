const exec = require('child_process').exec
const path = require('path')

const helper_dirs = ['settings-manager']

/**
 * Build script to build all helper packages for typescript. 
 * Add the packages root path to the 'helper_dirs' array. 
 * This script will then execute 'yarn run build' in the packages directory before
 * the main package is built
 */
async function buildAll() {

	let p = []

	for (const dir in helper_dirs) {
		const cwd = path.resolve(__dirname, '../', helper_dirs[dir])
		console.log('Moving working directory to: ', cwd)
		p.push(new Promise((resolve, reject) => {
			exec('yarn run build',{
				cwd
			}, (error, stdout, stderr) => {
				if (error) reject(error) 
				else resolve()
				console.log('StdOut: ', stdout)
				console.log('StdErr: ', stderr)
			})
		}))

	}

	return Promise.all(p)
}

(async () => {
	await buildAll()
})()