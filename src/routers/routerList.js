export const routerList = [
  {
    path:'/'
  }, 
  
  {
    path: '/Hello-world',
    name: 'HelloWorld',
    component: () => import( /* webpackChunkName: "midAutumun" */ '@/views/Hello-world'),
    meta: {
      title: '欢迎你'
    },
    children: []
  },
  {
    path:'/index',
    name:'index',
    component: () => import( /* webpackChunkName: "errorPages" */ '@/views/Index'),
    meta: {
      title: '页面出错'
    },
  },
  {
    path:'/netErrorPage',
    name:'netErrorPage',
    component: () => import( /* webpackChunkName: "errorPages" */ '@/views/netErrorPage'),
    meta: {
      title: '页面出错'
    },
  },{
    path:'*',
    name:'notFoundPage',
    component: () => import( /* webpackChunkName: "errorPages" */ '@/views/notFound'),
    meta: {
      title: '页面出错'
    },
  } 
]
