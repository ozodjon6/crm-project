import firebase from "firebase/compat";

export default {
    state: {
        info: {}
    },
    mutations: {
        setInfo(state, info) {
            state.info = info
        },
        clearInfo(state) {
            state.info = {}
        }
    },
    actions: {
        async updateInfo({commit, getters, dispatch}, toUpdate) {
            try {
                const uid = await dispatch('getUid')
                const updateDate = {...getters.info, ...toUpdate}
                await firebase.database().ref(`/users/${uid}/info`).update(toUpdate)
                commit('setInfo', updateDate)
            } catch (e) {
                commit('setError')
                throw e
            }
        },

       async fetchInfo({dispatch, commit}) {
          try {
              const uid = await dispatch('getUid')
              const info = (await firebase.database().ref(`/users/${uid}/info`).once('value')).val()
              commit('setInfo', info)
          } catch (e) {}
        }
    },
    getters: {
        info: s => s.info
    }
}