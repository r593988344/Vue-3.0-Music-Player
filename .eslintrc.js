// https://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parserOptions: {
    parser: 'babel-eslint'
  },
  env: {
    browser: true,
  },
  extends: [
    // https://github.com/vuejs/eslint-plugin-vue#priority-a-essential-error-prevention
    // consider switching to `plugin:vue/strongly-recommended` or `plugin:vue/recommended` for stricter rules.
    'plugin:vue/essential',
    // https://github.com/standard/standard/blob/master/docs/RULES-en.md
    'standard'
  ],
  // required to lint *.vue files
  plugins: [
    'vue'
  ],
  // add your custom rules here
  rules: {
    // allow async-await
    'generator-star-spacing': 'off',
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    "spaced-comment": 0,//注释风格要不要有空格什么的
    "space-unary-ops": [0, { "words": true, "nonwords": false }],//一元运算符的前/后要不要加空格
    "space-before-function-paren": [2, "always"],//函数定义时括号前面要不要有空格
    "space-before-blocks": [2, "always"],//不以新行开始的块{前面要不要有空格
    // "space-after-keywords": [2, "always"],//关键字后面是否要空一格
    "semi": [2, "never"],//语句强制分号结尾
    "quotes": [2, "single"],//引号类型 `` "" ''
    "object-curly-spacing": [2, "always"],//大括号内是否允许不必要的空格
    "key-spacing": [0, { "beforeColon": false, "afterColon": true }],//对象字面量中冒号的前后空格
    "indent": [2, 2],//缩进风格
    "eqeqeq": 2,//必须使用全等
    "comma-spacing": 2,//逗号前后的空格
    "array-bracket-spacing": [2, "never"],//是否允许非空数组里面有多余的空格
    "no-var": 2,//禁用var，用let和const代替
    "no-trailing-spaces": 2,//一行结束后面不要有空格
    "no-multiple-empty-lines": [1, {"max": 2}],//空行最多不能超过2行
    "no-extra-semi": 2,//禁止多余的冒号
  }
}
