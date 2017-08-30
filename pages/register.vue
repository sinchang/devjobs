<template>
  <v-container fluid>
    <v-layout row wrap>
      <v-flex xs12 md4 offset-md4>
        <v-card>
          <v-toolbar dark class="primary">
            <v-toolbar-title class="white--text">注册</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <v-text-field label="输入用户名" v-model="username" required></v-text-field>
            <v-text-field label="输入密码" v-model="password" required type="password" hint="密码长度需大于6"></v-text-field>
            <v-text-field label="再次输入密码" v-model="repassword" required type="password"></v-text-field>
            <v-text-field label="邮箱" v-model="email" required type="email"></v-text-field>
            <v-btn primary @click="register">注册</v-btn>
            <p class="mt-3">已经有账号？请前往<nuxt-link to="/login">登录</nuxt-link></p>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { register } from '../plugins/http'

export default {
  data () {
    return {
      username: '',
      password: '',
      repassword: '',
      email: ''
    }
  },
  // middleware: 'isLogin',
  methods: {
    async register () {
      await register({
        username: this.username,
        password: this.password,
        repassword: this.repassword,
        email: this.email
      })
      this.$router.push({ path: 'login' })
    }
  },
  head () {
    return {
      title: '注册'
    }
  }
}
</script>
