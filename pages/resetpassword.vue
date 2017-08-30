<template>
  <v-container fluid>
    <v-layout row wrap>
      <v-flex xs12 md4 offset-md4>
        <v-card>
          <v-toolbar dark class="primary">
            <v-toolbar-title class="white--text">找回密码</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <v-text-field label="输入邮箱" v-model="email" required type="email"></v-text-field>
            <v-btn primary @click="sendMailHandle">发送邮件</v-btn>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { sendMail } from '../plugins/http'

export default {
  data () {
    return {
      email: ''
    }
  },
  // middleware: 'isLogin',
  methods: {
    async sendMailHandle () {
      const data = await sendMail({
        email: this.email
      })
      console.log(data)
    }
  },
  head () {
    return {
      title: '找回密码'
    }
  }
}
</script>
