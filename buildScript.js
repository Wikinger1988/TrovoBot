const fs = require('fs')

const fse = require('fs-extra')
const childProcess = require('child_process')

if (fs.existsSync('./build')) {
    fse.removeSync('./build')
}
// Run 'react-scripts build' script
childProcess.execSync(
    'node ./node_modules/react-scripts/bin/react-scripts.js build',
    { stdio: 'inherit' }
)
// Move app build to server/build directory
fse.moveSync('./build', './app/public', { overwrite: true })
