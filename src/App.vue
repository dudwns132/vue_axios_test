<template>
  <div id="app">
    <v-app id="inspire">
      <v-app-bar color="indigo" dark fixed app>
        <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
        <v-toolbar-title>Application</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-menu offset-y v-if="isLogin">
          <template v-slot:activator="{ on, attrs }">
            <v-btn icon flat dark v-bind="attrs" v-on="on">
              <v-icon>mdi-dots-vertical</v-icon>
            </v-btn>
          </template>
          <v-list>
            <v-list-item router :to="{ name: 'mypage' }">
              <v-list-item-title>마이페이지</v-list-item-title>
            </v-list-item>
            <!-- dispatch를 사용하여 actions 함수 접근 -->
            <v-list-item @click="$store.dispatch('logout')">
              <v-list-item-title>로그아웃</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
        <v-btn flat v-else router :to="{ name: 'login' }">Log In</v-btn>
      </v-app-bar>

      <v-navigation-drawer v-model="drawer" wrap app>
        <v-list nav dense>
          <v-list-item @click="drawer = false" router :to="{ name: 'Home' }">
            <v-list-item-action>
              <v-icon>mdi-home</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>Home</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item
            v-if="isLogin === false"
            @click="drawer = false"
            router
            :to="{ name: 'login' }"
          >
            <v-list-item-action>
              <v-icon>mdi-email</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>로그인</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item
            v-if="isLogin === true"
            @click="drawer = false"
            router
            :to="{ name: 'mypage' }"
          >
            <v-list-item-action>
              <v-icon>mdi-email</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>마이페이지</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>

      <v-content>
        <router-view></router-view>
      </v-content>

      <v-footer color="indigo" wrap app>
        <span class="white--text">&copy; {{ new Date().getFullYear() }}</span>
      </v-footer>
    </v-app>
  </div>
</template>

<script>
import { mapState } from "vuex";
// import { defineComponent } from '@vue/composition-api'

export default {
  data: () => ({
    drawer: false,
  }),
  computed: {
    ...mapState(["isLogin"]),
  },
  props: {
    source: String,
  },
};
</script>
