const activity ={
    state: {
        activityInfo: {}, // 活动详情
        recordId:'',
    },
    getters:{
        acitiveInfo: state => state.activityInfo, // 活动详情
        recordId:state =>state.recordId,//活动记录key
    },
    mutations: {
		// 初始化活动详情
		'INIT_ACTIVITY_INFO': (state, fields) => {
            if (!fields) return
            state.activityInfo = JSON.parse(JSON.stringify(fields))
        },
        'INIT_RECORD_ID':(state,fields)=>{
            if (!fields) return
            state.recordId = fields
        }
    },
    actions: {
		initActivityInfo({
			commit
		}, fields) {
			return commit('INIT_ACTIVITY_INFO', fields)
        },
        initRecordId({
			commit
		}, fields) {
			return commit('INIT_RECORD_ID', fields)
        }
    }
}

export default activity