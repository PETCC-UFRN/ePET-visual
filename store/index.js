const cookieparser = process.server ? require('cookieparser') : undefined

export const state = () => {
    return {
        auth: null,
        profile: null
    }
}
export const mutations = {
    setAuth(state, auth) {
        state.auth = auth
    },
    setProfile(state, profile){
      state.profile = profile;
    }
}

export const actions = {
    nuxtServerInit({ commit }, { req }) {
        let auth = null
        if (req.headers.cookie) {
            const parsed = cookieparser.parse(req.headers.cookie)
            try {
              auth = JSON.parse(parsed.auth)
            } catch (err) {
              console.log('Nenhum cookie encontrado')
            }
        }

        commit('setAuth', auth)
    },
}