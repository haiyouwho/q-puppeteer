const qPuppeteer = require('../src')


function getCookies (cookies) {
  const c =  cookies.split(';').map(item => {
    const [name, value] = item.split('=')
    if (name && value) {
      return {
        name: name.trim(),
        value: value.trim(),
        domain: '.simuwang.com',
        url: 'https://master-test.simuwang.com',
        path: '/',
        expires: -1,
        httpOnly: false,
        secure: true,
      }
    }
    return {}
  }) 
  return c.filter(item => item.name)
}

function generateFofPassPort (userId, phone) {
  return {
    name: 'fof_passport',
    value: `${userId}%09${phone}`,
    domain: '.simuwang.com',
    url: 'https://master-test.simuwang.com',
    path: '/',
    expires: -1,
    httpOnly: false,
    secure: true,
  }
}



const url = 'https://master-test.simuwang.com/fundMaster/PrivateEvaluate/productDetail?fundId=HF0000119J&companyId=CO000000FD&fm=1'
// const url = 'http://localhost:8888/details.html#/Fund/HF00000DGX?fm=1'
const host = 'master-test.simuwang.com'
const cookie = 'smppw_cookies_login_status_key=rllFnkIAztsIRwD4zcELSw%3D%3D; master_common_token=i31I2j6wInj3TDwyKMpDv86gSJKFdXmAREsAEcEmMIp0YO2tiknt4W3%2B1Ho8TPLaU%2BwDalTEMJwrrGImMXyrwu52LwQF2cVljoDZGnqJueuL49T7qoAGkS%2F14bE3PqC3ZZMokgY%2FCeNJO0KHcmW19N0%2F%2BDj3zXfw3F51SC2XgpklFSjUZWXDgoe1AoxU1m8mHb3k9CjKwW4u%2BxK%2BwTV8M3rcq8xIuVOCW5USd0ruMVM%3D; PHPSESSID=66ekpeul4s9fqa3h8olgu4bnt2; passport=519664%09u9354829091636%09AQEEVFVQVwADAVMFV19UVwRSBgAGB1dWBwACAgAOBQQ%3Db1fd579f47; http_tK_cache=dcac8bf9dc125572406331291234f29fbb4e35f3; fm_common_token=DdhVVheMjyZ16QcV5W9tNeetSa69WslrJX%2BAZpZ%2Bt3bvIlve3aIF7umOGH79VVxxNrlAmPVpxH0BNUCVwL54%2BPxfVunP3OO8l12uj4G7GpyyVkrBBfCTA%2BujJz9Qyu6ei5B94swDVRx89aPUWuyWF2vO0buhJ%2FLbVRWnyTboZelTYGZ%2FU3gMUk9DEdPYYLR82A42vYw83WW3w6HhgFTDfSX1gs3QOfOfoi0vB2fysFd%2FUjxlngZT%2B%2B8Ieak%2BXFzNNES7egqfKMhCTIx3vgVvt2leoqaiNZsu6lBlKfRRJZjAa%2BZ5QAlKX5gcwxi9bkMMr12cZyt%2Bqf2rkojkY%2BOu7A%3D%3D; sm_cookies_key=Myxl1DHEC7eN1wsjSf9uK9yyVm78UBktZW9PghgZqqKaCr%2B2dKWTlsgaeGLX0%2BWdEyRkHyNjxqvxasbLecHqtBVAETKJvNuG0TQW6DDiQtYC59h2YfK6XFnQIKRC8sh5x9auf0P5VB2B%2BDD3jb4uZ0IKbjLXjDxXK%2Ff9TBoVdf2vvJ%2Bo04LjOwGZmwEBc0nz7XBIxQhH%2B0bqHv9LAjro8bYucklknzTMW0nanhEDVR1cFPVYmcTXEkKVDnKVhIyId2nh5Lac54WEDAgjj%2FVDvi%2FSAeInrwNsdiU4gm%2BYbcQsB0qmCBliz0dsR1vBXI0q8tv5nVOp%2FGuUro12qTse70kiYCbq%2Bu8TFW9jO9Uy%2FGdICaS1QeS45%2FR0bTljWc946ypdpQCYVqOQ%2F8Q1JtOuJLXQsEDHMKTFIvmnjIPN2JMRyMFPGOx2Qd%2BuFawwK8XfesDEM2NJX1QG2Qw0cCBGArJfIvb9%2F2LLWOQnzd4ZEYPVdEK2f4S2jO8v35aNG%2Bcf%2BVZmJ8jxYJRZsgxt1xsxjx0jaG6DinCSLL6h4XtmcE%2BRyVqsP%2B8L4bPueRcXmKgO3trXpXVyDUZJ1ojqdkxhZISHFVK6%2B%2B%2BNr%2Bx3YpStpwc%3D; sensorsdata2015jssdkcross=%7B%22distinct_id%22%3A%22519664%22%2C%22%24device_id%22%3A%22169d7eb7b1884-0b6f997813a86e-43450521-1440000-169d7eb7b194fc%22%2C%22props%22%3A%7B%22%24latest_traffic_source_type%22%3A%22%E7%9B%B4%E6%8E%A5%E6%B5%81%E9%87%8F%22%2C%22%24latest_referrer%22%3A%22%22%2C%22%24latest_referrer_host%22%3A%22%22%2C%22%24latest_search_keyword%22%3A%22%E6%9C%AA%E5%8F%96%E5%88%B0%E5%80%BC_%E7%9B%B4%E6%8E%A5%E6%89%93%E5%BC%80%22%7D%2C%22first_id%22%3A%22169d7eb7b1884-0b6f997813a86e-43450521-1440000-169d7eb7b194fc%22%7D; stat_passport=519664%0915675349060%09u9354829091636; fund_master_common_token=ruo59R0woNFxfDvX0qw1i52bn5j7j0ARhot9POc%2FVxhJe0BwamePQnmG57dTnBJBLoPbppvWXxOpLho0JT8UaV4GLjq%2B3wfi3GRwM%2By13hwrWCMbmK6kHe3Kd3YHqVgxmHChphEXJ9%2FYJavDhrIxifGJu2WwZrsFTDv5Yz9MMh6Sr31es67bmnS0GHZxYE1KedvlF%2FEoOucy2RExiDtydxkRLaJikZR%2BBZyt8BZRTZqevYrQ1yATYZXLDipNwuq%2F03PV5F68IX5N4gERY74mQg%3D%3D'
// localhost:8025/expapi/fm/fundDetial/489672/18810698227/CO000000FD/HF0000119J/pdf
// https://fm-test.simuwang.com/expapi/fm/fundDetial/489672/18810698227/CO000000FD/HF0000119J/pdf
const result = () => {
  (async () => {
    console.log('start ....')
    const browser = await qPuppeteer.launch({
      // headless: false,
      args: ['--no-sandbox']
    })
    // const browser = await qPuppeteer.launch()

    const page = await browser.getPage()

    await page.setViewport({
      width: 1600,
      height: 140,
    })

    await page.setRequestInterception(true)
    page.on('request', (req) => {
      let url = req.url()
      // 这些东西不需要
      if (url.endsWith('.css') || url.endsWith('.png') || url.endsWith('.jpg')) {
        req.abort()
      } else {
        req.continue()
      }
    })
    
    page.on('response', res => {
      const url = res.url()
      if (url.indexOf('expapi/pdf-img/prepare') > -1) {
        res.json().then(data => {
          console.log('json -----', data)
          page.closePage()
        })
      }
    })

    await page.setCookie(generateFofPassPort(489672, 18810698227), ...getCookies(cookie))
    await page.goto(url, { waitUntil: 'networkidle0', timeout: 300 * 1000 })
    await page.emulateMedia('screen')
    await sleep(1000 * 1)

    await page.evaluate(format => {
      window.puppeteer[format]()
      return true
    }, 'pdf')
    
    console.log('pdf clicked !!')
  })()
}


result()


function sleep (t = 0) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve()
    }, t)
  })
}

