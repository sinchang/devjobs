<template>
  <v-container fluid>
    <v-layout row wrap>
      <v-flex xs12 md4 offset-md4>
        <v-card>
          <v-toolbar dark class="primary">
            <v-toolbar-title class="white--text">登录</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <v-text-field label="输入用户名" v-model="username" required></v-text-field>
            <v-text-field label="输入密码" v-model="password" required type="password"></v-text-field>
            <v-btn primary @click="loginHandle">登录</v-btn>
            <p class="mt-3">
              <nuxt-link to="/register">注册账号</nuxt-link> |
              <nuxt-link to="/resetpassword">忘记密码</nuxt-link> |
              <a href="/github/login">使用 GitHub 登录</a>
            </p>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { login } from '../plugins/http'

export default {
  data () {
    return {
      username: '',
      password: ''
    }
  },
  // middleware: 'isLogin',
  methods: {
    async loginHandle () {
      await login({
        username: this.username,
        password: this.password
      })
      // this.$router.push({ path: '/' })
      location.href = '/'
    }
  },
  head () {
    return {
      title: '登录'
    }
  },
  created () {
    if (this.$store.state.token) {
      this.$router.push({ path: '/' })
    }
  }
}
</script>
