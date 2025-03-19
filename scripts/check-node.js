const { execSync } = require('child_process')

const requiredVersion = '18.20.4'
const currentVersion = process.version.replace('v', '')

if (currentVersion !== requiredVersion) {
  console.log(`当前 Node 版本为 ${currentVersion}，需要切换到 ${requiredVersion}...`)
  execSync(`nvm use ${requiredVersion}`, { stdio: 'inherit' })
} else {
  console.log(`当前 Node 版本符合要求 (${currentVersion})，继续执行 npm 任务...`)
}

execSync('npm run dev:mp-weixin', { stdio: 'inherit' })
