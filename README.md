# @mfelibs/base-tools-wifi

判断浏览器是否支持wifi


#### demo（demo仍然走unpkg服务）
<a href="http://unpkg.smfe.sina.cn/@mfelibs/base-tools-wifi/dist/demo.html" target="blank">http://unpkg.smfe.sina.cn/@mfelibs/base-tools-wifi/dist/demo.html</a>
 <a href="http://mjs.sinaimg.cn/umd/base-tools-wifi/0.0.5/demo.html"target="blank">http://mjs.sinaimg.cn/umd/base-tools-wifi/0.0.5/demo.html</a>
## cmd 调用方式：

### 安装

```bash
yarn add  @mfelibs/base-tools-wifi --save
```

通过 `imort` 导入
```javascript
import re from '@mfelibs/base-tools-wifi'
```

### 使用


```javascript
re.wifi(function(data){
        document.write(JSON.stringify(data));
    })
data.result == 'wifi'//{"result":wifi,"ori":wifi}{"result":null,"ori":null} 
//re.ori为该客户端本来输出的type类型状态
```

### 说明
该组件目前主要支持微信、微博、手机QQ、安卓UC浏览器的wifi判断，若此三种客户端下无法判断是否为wifi状态请联系shaopeng1
