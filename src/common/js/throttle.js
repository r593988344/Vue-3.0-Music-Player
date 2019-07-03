/**
 *
 * @param fn  需要节流执行的方法
 * @param interval  触发频率
 * @returns {Function}
 */
const throttle = (fn, interval = 500) => {
  let preDate = Date.now()
  let timer = null
  timer && window.clearTimeout(timer) //先清除定时器
  return (params) => {
    let now = Date.now()
    interval = parseInt(interval)
    // 获取函数数组
    if (!Array.isArray(fn)) {
      fn = [fn]
    }
    if (now - preDate > interval) {
      for (let i in fn) {
        fn[i](params)
      }
      preDate = Date.now() //重新计算开始时间
    } else {
      // 保证最后一次输入的数据能触发方法
      timer = setTimeout(() => {
        for (let i in fn) {
          fn[i](params)
        }
      }, interval)
    }
  }
}

export default {
  name: 'Throttle',
  functional: true,
  render (creatElement, context) {
    const timeout = context.props.timeout
    const vNodeList = context.slots().default
    if (vNodeList === 'undefined') {
      console.warn('<throttle>组件必须要有子元素')
      return null
    }
    const vNode = vNodeList[0] || null
    if (vNode.tag === 'input') {
      const defaultFun = vNode.data.on.input
      const throttleFun = throttle(defaultFun, timeout)
      vNode.data.on.input = throttleFun
    } else if (vNode.tag === 'button') {
      const defaultFun = vNode.data.on.click
      const throttleFun = throttle(defaultFun, timeout)
      vNode.data.on.click = throttleFun
    } else {
      console.warn('<debounce> 组件内只能出现下面组件的任意一个且唯一 button、input')
      return vNode
    }
    return vNode
  }
}
