<template>
  <v-toolbar dark class="primary">
    <v-toolbar-title><a href="/" class="white--text">DeveloperJobs</a></v-toolbar-title>
    <v-spacer></v-spacer>
    </v-btn>
    <v-toolbar-items v-show="!username">
      <v-btn flat class="white--text" @click="goLogin">登录</v-btn></a>
      <v-btn flat class="white--text" @click="goRegister">注册</v-btn>
    </v-toolbar-items>
    <v-menu v-show="username">
      <v-btn flat slot="activator" class="white--text">{{username}}
        <v-icon class="white--text">arrow_drop_down</v-icon>
      </v-btn>
      <v-list>
        <v-list-tile @click="goUserCenter">
          <v-list-tile-title>个人中心</v-list-tile-title>
        </v-list-tile>
        <v-list-tile>
          <v-list-tile-title @click="logout">退出</v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-menu>
  </v-toolbar>
</template>

<script>
import Cookie from 'js-cookie'

export default {
  props: {
    username: {
      type: String,
      default: ''
    }
  },
  methods: {
    goLogin () {
      location.href = '/login'
    },
    goRegister () {
      location.href = '/register'
    },
    goUserCenter () {
      location.href = `/${this.username}`
    },
    logout () {
      Cookie.remove('devJobs')
      location.href = '/'
    }
  }
}
</script>

<style scoped>
  .toolbar__title a {
    text-decoration: none;
  }
</style>
