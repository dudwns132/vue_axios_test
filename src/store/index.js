import Vue from "vue";
import Vuex from "vuex";
import router from "../router/index.js";
import axios from "axios"

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    userInfo: null,
    allUsers: [
      { id: 1, name: "jun", email: "jun@gmail.com", password: "1234" },
      { id: 2, name: "hun", email: "hun@gmail.com", password: "1234" },
    ],
    isLogin: false,
    isLoginError: false,
  },

  // state값을 변화시키는 로직
  mutations: {
    // 로그인이 성공했을 때.
    loginSuccess(state, payload) {
      state.isLogin = true;
      state.isLoginError = false;
      state.userInfo = payload;
    },
    // 로그인이 실패했을 때.
    loginError(state) {
      state.isLogin = false;
      state.isLoginError = true;
    },
    logout(state) {
      state.isLogin = false;
      state.isLoginError = false;
      state.userInfo = null;
    },
  },

  // 비즈니스 로직
  actions: {
    // 로그인 시도
    login({ commit }, loginObj) { // eslint-disable-line no-unused-vars
      axios
        .post("https://reqres.in/api/login", loginObj)   // 파라미터(body)
        .then(res => {
          // 성공 시 token: ~~(실제로는 user_id 값을 받아옴)
          // 토큰을 헤더에 포함시켜서 유저 정보를 요청
          let token = res.data.token
          let config = {  // eslint-disable-line no-unused-vars
            headers: {
              "access-token": token
            }
          }
          axios
          .get("https://reqres.in/api/users/2", config)    // 보안과 관련된 헤더나 설정 옵션이 옴
          .then(response => {
            let userInfo = {
              id: response.data.data.id,
              first_name: response.data.data.first_name,
              last_name: response.data.data.last_name,
              email: response.data.data.email,
              avatar: response.data.data.avatar
            }
            commit("loginSuccess", userInfo)
          })
          .catch(() => {
            alert("이메일과 비밀번호를 확인하세요.")
          })
      })
      .catch(() => {
        alert("이메일과 비밀번호를 확인하세요.")
      });
      // eslint-disable-line no-unused-vars
      // 전체 유저에서 해당 이메일로 유저를 찾는다.
      // let selectedUser = null;
      // state.allUsers.forEach((user) => {
      //   if (user.email === loginObj.email) selectedUser = user;
      // });
      // if (selectedUser === null || selectedUser.password !== loginObj.password)
      //   commit("loginError");
      // else {
      //   commit("loginSuccess", selectedUser);
      //   router.push({ name: "mypage" });
      // }
      // 그 유저의 비밀번호와 입력된 비밀번호를 비교한다.
    },
    logout({ commit }) {
      commit("logout");
      router.push({ name: "Home" });
    },
  },
  modules: {},
});
