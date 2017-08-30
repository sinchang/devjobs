<template>
  <v-toolbar dark class="primary">
    <v-toolbar-title>
      <nuxt-link to="/" class="white--text">
        <img src="../assets/img/pure_logo.png" alt="logo" height="50" class="logo">
        <span class="title hidden-xs-only">DeveloperJobs</span>
      </nuxt-link>
    </v-toolbar-title>
    <v-spacer></v-spacer>
    </v-btn>
    <v-toolbar-items>
      <v-btn flat class="white--text" @click="goLogin" v-show="!username">登录</v-btn>
      <v-btn flat class="white--text" @click="goRegister" v-show="!username">注册</v-btn>
      <v-btn flat class="white--text" @click="goNewPost" v-show="username">
        <v-icon>add</v-icon>
      </v-btn>
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
      this.$router.push({ path: '/login' })
    },
    goRegister () {
      this.$router.push({ path: '/register' })
    },
    goUserCenter () {
      this.$router.push({ path: `/user/${this.$store.state.username}` })
    },
    logout () {
      Cookie.remove('devJobs')
      location.href = ''
      // this.$router.push({ path: '/' })
    },
    goNewPost () {
      this.$router.push({ path: '/new' })
    }
  }
}
</script>

<style scoped>
  .toolbar__title a {
    text-decoration: none;
  }
  .logo, .title {
    vertical-align: middle
  }
  .title {
    padding-left: 10px;
    font-size: 28px!important;
  }
</style>
