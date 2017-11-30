import { routerRedux } from 'dva/router'
import flowersList from '../../mock/flowers'

export default {
    namespace: 'crud',

    state: {
        flowers:[]
    },

    subscriptions: {
        setup({ dispatch, history }) {
            history.listen((Location)=>{
                console.log(Location.pathname)
            })
        },
    },

    effects: {
        *test({ payload: value }, { call, put }) {
            // yield put({ type: 'save'});
            // yield put({ type: 'test', payload: value  });
            console.log(value)
        },
    },

    reducers: {
        save(state, action) {
            return { ...state, ...action.payload };
        },
        test(state, action) {
            console.log("this is inner");
            return { ...state, ...action.payload };
        }
    },

};