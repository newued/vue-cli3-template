# vue-cli3-template
本模板是为移动端单页面应用开发而准备的，你可以适当删减

##目录说明
-   api
***统一处理接口请求，尽量做到接口相关的请求都做在这里处理。请求拦截器也放在这里***
这个模块的处理分两种情况：
    +   简单情况 
  一个``const.js``控制接口环境,一个``ajax.js``处理接口拦截，``apilist.js``存放业务接口请求。    <br/>
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

#### Lints and fixes files
```
yarn run lint
```
