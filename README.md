# vue-cli3-template
本模板是为移动端单页面应用开发而准备的，你可以适当删减。
集成了vuex/vue-router/axios/mockjs、/utli处理等vue开发中常用功能。特别是mockjs及目录的处理值得借鉴。

##目录说明
- mock mock功能
 ```
 src
  |__ mock
  	|__ index.js // 入口文件，注册 mock 规则的文件全部 import 到这里，根据环境在vue.config.js中是否被引用
  	|__ utils
  	|     |__ mock.js // 改写后的 mockjs，注册 mock 规则应使用该对象
  	|     |__ formatOptions.js // 格式化注册 mock 时的回调函数的参数的函数，在 mock.js 中使用
  	|__ user.js // 按业务划分的 mock 规则注册文件
         |__ business.js // 按业务划分的 mock 规则注册文件
 ```

  这个mock功能增强了原生mock能力： 
   * 需要进行 mock 的接口路径，也支持传入正则（但要自己考虑匹配带查询字符串的情况）
   * mock 数据不能侵入业务代码
   * mock 数据和工具不能打包到生产环境的代码中
   * mock 数据要实现热加载，方便调试
   * mock 工具不能对联调造成影响
   * mock 工具和数据对项目造成的侵彻要尽可能的小，要实现模块化可插拔（vue.config.js中处理）
   *  请求的类型: get , post , put , delete ，忽略大小写

      mock使用示例： 
      ```
       /**mock使用说明
      1前端联调环境：不携带 mock 工具及数据
      2前端 mock 环境：携带 mock 工具及数据，对于注册了 mock 规则的接口返回设定好的 mock 数据，对未设定 mock 规则的接口请求正常发出
      3可通过 node 命令行参数或者webpack.json中scripts属性，动态地给 webpack 添加入口来实现是否打包 mock 工具及数据
      */
      Mock.mock('/user/logout', 'get',resFunc)
     

      ```   
  
-   api
***统一处理接口请求，尽量做到接口相关的请求都做在这里处理。请求拦截器也放在这里***
这个模块的处理分两种情况：
    +   简单情况 
  一个``const.js``控制接口环境,一个``ajax.js``处理接口拦截，``User.js``存放业务接口请求。    <br/>
    +   复杂情况
根据rest风格api接口拆分成不同的文件夹或者文件，管理接口。（视复杂度决定）
-   assets
  静态资源文件目录 如 css/images/fontIcons等。
-   components
  项目公共组件，视情况决定是否拆分文件夹。
-   routers
路由表文件目录，可在router.js中做路由拦截器，title设置等操作。
-   vuex    
***vuex文件目录。***
无耦合的部分数据存储及处理根据功能或者页面拆分到/modules中，便于后期管理，
有耦合的部分放在getters中进行中转处理，如果耦合部分比较多，可以对``getters.js``再做拆分处理。
-   common
  工具类，外部js等

#### 安装依赖
```
yarn install或者 yarn
```

#### 编译开发
```
yarn run serve
```

#### 编译压缩发布
```
yarn run build
```

#### 测试
```
yarn run test
```

#### 规范校验
```
yarn run lint
```
