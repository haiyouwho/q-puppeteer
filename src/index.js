/**
 * QPuppeteer功能：
 * 自动启停浏览器, 提供同一浏览器实例
 * 标签页最大并发限制，超出等待
 * 标签页复用
 */
const puppeteer = require('puppeteer')

const initController = {
  queue: [],
  wait () {
    return new Promise(res => {
      this.queue.push(res)
    })
  },
  done () {
    if (this.queue.length) {
      this.queue.forEach(res => res())
      this.queue = []
    }
  }
}

class QPuppeteer {
  constructor () {
    this.launched = false
    this.browser = null
    this.maxPage = 20
    this.activePage = 0
    this.waitQueue = []
    this.closeBrowserTimer = null
    this.launchConf = {
      args: ['--no-sandbox']
    }
  }

  setMaxPage (num) {
    this.maxPage = num
  }

  /**
   * 初始化时建立等待队列
   * 确保浏览器初始化一次
   * 
   * @param {*} config  启动参数
   */

  async launch (config) {

    if (initController.queue.length) {
      await initController.wait()
    }

    if (this.launched) {
      return this.browser
    } else {
      initController.wait()
      try {
        this.browser = await puppeteer.launch(config || this.launchConf)
        this.browser.getPage = this.getPage.bind(this)
        this.launched = true
        initController.done()
        return this.browser
      } catch (error) {
        throw error
      }
    }
  }

  /**
   * 获取标签页, 超过最大限制数量时进行等待
   */
  async getPage () {
    clearTimeout(this.closeBrowserTimer)
    if (this.activePage < this.maxPage) {
      this.activePage++
      return this.extendPage(await this.browser.newPage())
    } else {
      return await this.waitPage()
    }
  }

  waitPage () {
    return new Promise(res => {
      this.waitQueue.push(res)
    })
  }

  /**
   * 关闭标签页，默认会留给下个任务使用，除非强制关闭
   * 
   * @param {*} page  标签页实例
   * @param {*} force 强制关闭
   */
  closePage (page, force) {
    if (this.waitQueue.length) {
      const res = this.waitQueue.shift()
      if (force) {
        this.browser.newPage().then(newPage => {
          newPage = this.extendPage(newPage)
          res(newPage)
        })
        return true
      } else {
        this.clearPage(page)
        res(page)
        return false
      }
    }

    this.activePage--
    if (!this.activePage) {
      this.closeBrowser()
    }
    return true
  }

  /**
   * 拓展标签页
   * 
   * @param {*} page 
   */
  extendPage (page) {
    page.closePage = (force) => {
      return this.closePage(page, force) ? page.close() : Promise.resolve()
    }
    return page
  }

  /**
   * 清空标签页的监听事件
   * 
   * @param {*} page 
   */
  clearPage (page) {
    page.removeAllListeners('request')
    page.removeAllListeners('response')
  }

  /**
   * 关闭浏览器
   */
  closeBrowser () {
    clearTimeout(this.closeBrowserTimer)
    this.closeBrowserTimer = setTimeout(async () => {
      try {
        await this.browser.close()
        this.launched = false
      } catch (error) {
        throw error
      }
    }, 120 * 1000)
  }
}

module.exports = new QPuppeteer()