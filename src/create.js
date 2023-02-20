const ora = require('ora'); // 用于在控制台显示加载中的效果，类似于前端页面的loading效果。
const Inquirer = require('inquirer');

module.exports = async (projectName) => {
    // console.log(`执行create ${projectName || ''}`);

    const repos = ['中奖100万', '年轻10岁', '健康平安'];
    const { repo } = await Inquirer.prompt({
        name: 'repo',
        type: 'list',
        message: '假如你有一个机会，你会选择',
        choices: repos,
    });

    const spinner = ora('请等待...\n').start();

    setTimeout(() => {
        spinner.text = '完成';
        spinner.succeed();
        console.log(`\n🎉 恭喜你，明天醒来你将会${repo}！`);
    }, 2000);
};
