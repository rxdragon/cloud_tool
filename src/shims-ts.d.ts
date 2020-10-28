
declare global { // 全局变量设置
  import * as lodash from 'lodash'
  const _: typeof lodash
  export default _
}
