#! /usr/bin/env node
// 使用node来执行此文件

// console.log('hello world');

const program = require('commander');
const path = require('path');
const { version } = require('../src/constants');

// 自定义命令事件
const mapActions = {
    create: {
        alias: 'c',
        description: 'create a project',
        examples: [
            'd-cli create <project-name>',
        ],
    },
    '*': { // 没有找到对应的命令时可用*代替
        alias: '',
        description: 'no found',
        examples: [],
    },
};
// 遍历声明的事件
Reflect.ownKeys(mapActions).forEach((action) => {
    program
        .command(action) // 配置命令的名字
        .alias(mapActions[action].alias) // 命令的别名
        .description(mapActions[action].description) // 命令对应的描述
        .action(() => { // 执行的方法
            if (action === '*') {
                console.log(mapActions[action].description);
            } else {
                // console.log(`欧耶 ${action}`);
                // 当有很多命令时，可以把每个命令需要执行的逻辑写到单独的文件里
                // 然后 require 文件即可 __dirname: 当前目录
                // ...process.argv.slice(3) 截取输入命令的第三个值
                require(path.resolve('./src', action))(...process.argv.slice(3));
            }
        });
});

// 监听--help事件
program.on('--help', () => {
    console.log('\nExamplese:');
    Reflect.ownKeys(mapActions).forEach((action) => {
        mapActions[action].examples.forEach((example) => {
            console.log(`  ${example}`);
        });
    });
});

// 解析用户传递过来的参数
program.version(version).parse(process.argv);
