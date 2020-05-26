const cookieparser = process.server ? require('cookieparser') : undefined;
import Cookies from "js-cookie";

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
    setProfile(state, profile) {
        state.profile = profile;
    }
}

export const actions = {
    nuxtServerInit({ commit }, { req }) {
        let auth = null;
        let profile = null;

        if (req.headers.cookie) {
            const parsed = cookieparser.parse(req.headers.cookie);
            try {
                auth = parsed.auth;
                profile = parsed.profile ? JSON.parse(parsed.profile) : JSON.parse(parsed.setProfile);
            } catch (err) {
                // pass
            }
        }

        if (auth === null || auth === "null") {
            auth = Cookies.get('auth');
        }

        if (!profile){
            profile = Cookies.get('profile');
        }

        commit('setProfile', profile);
        commit('setAuth', auth);
    },
}
