/**
 *
 * @param fun   需要防抖执行的方法
 * @param timeout   延时
 * @param before   在执行绑定方法前需要做的事
 * @returns {Function}
 */
const debounce = (fun, timeout = 500, before) => {
  let timer = null
  return (params) => {
    timer && window.clearTimeout(timer) //先清除定时器
    before && before(params)
    timer = setTimeout(() => {
      if (!Array.isArray(fun)) {
        fun = [fun]
      }
      for (let i in fun) {
        fun[i](params)
      }
      timer = null
    }, parseInt(timeout))
  }
}

export default {
  name: 'Debounce',
  functional: true,
  render (createElement, context) {
    const before = context.props.before
    const timeout = context.props.timeout
    const vNodeLists = context.slots().default
    if (vNodeLists === 'undefined') {
      console.warn('<debounce> 组件必须要有子元素')
      return null
    }
    const vNode = vNodeLists[0] || null
    if (vNode.tag === 'input') {
      const defaultFun = vNode.data.on.input
      const debounceFun = debounce(defaultFun, timeout, before) // 调用防抖函数，将input上绑定的方法传入并返回防抖函数
      vNode.data.on.input = debounceFun
    } else if (vNode.tag === 'button') {
      const defaultFun = vNode.data.on.click
      const debounceFun = debounce(defaultFun, timeout, before) // 调用防抖函数，将button上绑定的方法传入并返回防抖函数
      vNode.data.on.click = debounceFun
    } else {
      console.warn('<debounce> 组件内只能出现下面组件的任意一个且唯一 button、input')
      return vNode
    }
    return vNode
  }
}
