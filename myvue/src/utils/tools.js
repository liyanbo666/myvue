// 处理列表页查询enter事件与底部分页enter事件
const tools = {
  keyDown: (that, routerName, formName) => {
    document.onkeydown = (e) => {
      if (!document.querySelector('body').getAttribute('style')) {
        var ev = e || window.event
        if (ev.target.parentNode.className === 'ivu-page-options-elevator') {
        } else {
          if (ev.keyCode === 13 && that.$router.history.current.name === routerName) {
            that.search(formName)
          }
        }
      }
    }
  },
  // 弹框中点击回车不触发查询事件
  modalNotEnter: () => {
    document.onkeydown = (e) => {
      var ev = e || window.event
      if (ev.keyCode === 13) {
        return false
      }
    }
  },
  // 处理tooltip样式问题
  handleTooltip: () => {
    setTimeout(() => {
      let tooltipDoms = document.querySelectorAll('.ivu-tooltip-inner')
      Array.prototype.some.call(tooltipDoms, (item) => {
        item.style.maxWidth = 'inherit'
        item.style.minHeight = 'inherit'
      })
    }, 0)
  },
  // 动态添加class
  addClass: (element, className) => {
    if (!new RegExp('(^|\\s)' + className + '(\\s|$)').test(element.className)) {
      element.className += ' ' + className
    }
  },
  // 动态移除class
  removeClass: (element, className) => {
    element.className = element.className.replace(new RegExp('(^|\\s)' + className + '(?=(\\s|$))', 'g'), '')
  },
  // 解析验证码图片
  base64decode: (str) => {
    let base64DecodeChars = [
      -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
      -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
      -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 62, -1, -1, -1, 63,
      52, 53, 54, 55, 56, 57, 58, 59, 60, 61, -1, -1, -1, -1, -1, -1,
      -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14,
      15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, -1, -1, -1, -1, -1,
      -1, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40,
      41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, -1, -1, -1, -1, -1]
    let c1 = ''
    let c2 = ''
    let c3 = ''
    let c4 = ''
    let i = 0
    let len = str.length
    let out = ''

    while (i < len) {
      /* c1 */
      do {
        c1 = base64DecodeChars[str.charCodeAt(i++) & 0xff]
      } while (i < len && c1 === -1)
      if (c1 === -1) { break }

      /* c2 */
      do {
        c2 = base64DecodeChars[str.charCodeAt(i++) & 0xff]
      } while (i < len && c2 === -1)
      if (c2 === -1) { break }

      out += String.fromCharCode((c1 << 2) | ((c2 & 0x30) >> 4))

      /* c3 */
      do {
        c3 = str.charCodeAt(i++) & 0xff
        if (c3 === 61) { return out }
        c3 = base64DecodeChars[c3]
      } while (i < len && c3 === -1)
      if (c3 === -1) { break }

      out += String.fromCharCode(((c2 & 0XF) << 4) | ((c3 & 0x3C) >> 2))

      /* c4 */
      do {
        c4 = str.charCodeAt(i++) & 0xff
        if (c4 === 61) { return out }
        c4 = base64DecodeChars[c4]
      } while (i < len && c4 === -1)
      if (c4 === -1) { break }
      out += String.fromCharCode(((c3 & 0x03) << 6) | c4)
    }
    return out
  },
  // 正则替换-正整数
  getNumber: (e, obj, key1, key2, index) => {
    e.target.value = e.target.value.replace(/[^\d]/g, '')
    if (index !== undefined) {
      obj[key1][index][key2] = e.target.value
    } else {
      if (key2) {
        obj[key1][key2] = e.target.value
      } else {
        obj[key1] = e.target.value
      }
    }
  },
  // 正则替换-两位小数 - onblur
  keepTwoDecimalDigits: (e, obj, key1, key2, index) => {
    if (isNaN(Number(e.target.value)) || !e.target.value) {
      e.target.value = ''
    } else {
      e.target.value = Number(e.target.value).toFixed(2)
    }
    if (index !== undefined) {
      obj[key1][index][key2] = e.target.value
    } else {
      if (key2) {
        obj[key1][key2] = e.target.value
      } else {
        obj[key1] = e.target.value
      }
    }
  },
  // 正则替换-两位小数 - keyup
  getOnlyNumber: (e, obj, key1, key2, index) => {
  // 得到第一个字符是否为负号
    var t = e.target.value.charAt(0)
  // 先把非数字的都替换掉，除了数字和.
    e.target.value = e.target.value.replace(/[^\d.]/g, '')
  // 必须保证第一个为数字而不是.
    e.target.value = e.target.value.replace(/^\./g, '')
  // 保证只有出现一个.而没有多个.
    e.target.value = e.target.value.replace(/\.{2,}/g, '.')
  // 保证.只出现一次，而不能出现两次以上
    e.target.value = e.target.value.replace('.', '$#$').replace(/\./g, '').replace('$#$', '.')
  // 如果第一位是负号，替换为空
    if (t === '-') {
      e.target.value = e.target.value
    }
    if (index !== undefined) {
      obj[key1][index][key2] = e.target.value
    } else {
      if (key2) {
        obj[key1][key2] = e.target.value
      } else {
        obj[key1] = e.target.value
      }
    }
  },
   // 判断数据类型（针对对象和数组）
  judgeDataType: (value) => {
    let typeValue = Object.prototype.toString.call(value)
    typeValue = typeValue.substring(8, typeValue.length - 1)
    return typeValue
  },
  // 贷后-根据权限判断是否有导出功能
  permission: (that, url, callBack) => {
    that._get(url).then(
      res => {
        if (res.result === 6) {
          callBack(false)
        } else {
          callBack(true)
        }
      },
      data => {
        that.$Message.error('请求失败')
      }
    )
  },
  // 风控-根据权限判断是否有新建或者修改功能
  riskPermission: (obj, params, callBack) => {
    obj.that[obj.type](obj.url, obj.type === '_get' ? {params} : params)
    .then(
      res => {
        if (res.result === 6) {
          callBack(false, res.description)
        } else {
          callBack(true)
        }
      },
      data => {
        obj.that.$Message.error('请求失败')
      }
    )
  }
}
export default tools
