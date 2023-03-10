import inquirer from 'inquirer'
/**
 * 从命令行读取输入
 * readline <简单,淘汰>
 * Inquirer.js <功能完整>
 */
const question = [
    {
        type: 'input',
        name: 'name',
        message: '你的姓名是：'
    },
    {
        type: "input",
        message: "你的年龄是：",
        name: "age",
    },
    {
        type: 'list',
        message: '你喜欢什么水果：',
        name: 'fruit',
        choices: [
            "Apple",
            "Pear",
            "Banana"
        ],
        filter: function (val: string) {
            // 使用filter将回答变为小写
            return val.toLowerCase();
        }
    },
    {
        type: "confirm",
        message: "吃苹果是否削皮：",
        name: "peel",
        when: function (answers: any) {
            // fruit 项选择 apple 时才会触发
            return answers.fruit === 'apple'
        }
    },
    {
        type: 'rawlist',
        message: '你喜欢喝什么饮料:',
        name: 'drink',
        choices: [
            "Juice",
            "Cola",
            "Sprite"
        ]
    },
    {
        type: "expand",
        message: "请选择一种早餐：",
        name: "breakfast",
        choices: [
            {
                key: "b",
                name: "包子",
                value: "包子"
            },
            {
                key: "y",
                name: "油条",
                value: "油条"
            },
            {
                key: "m",
                name: "面包",
                value: "面包"
            }
        ]
    },
    {
        type: "checkbox",
        message: "选择颜色:",
        name: "color",
        choices: [
            {
                name: "red"
            },
            {
                name: "blur",
                checked: true // 默认选中
            },
            {
                name: "green"
            },
            new inquirer.Separator("--- 分隔符 ---"), // 自定义分隔符
            {
                name: "yellow"
            }
        ],
        pageSize: 8 // 设置行数
    },
    {
        type: "password", // 密码为密文输入
        message: "请输入密码：",
        name: "pwd"
    },
    {
        type: "editor",
        message: "请输入备注：",
        name: "editor"
    }
]

inquirer.prompt(question).then((answers)=>{
    console.log('信息统计:');
    for (const data in answers) {
        console.log(data + ':' + answers[data]);
    }
    console.log('请确认以上信息！');
})
