<template>
  <v-container fluid>
    <v-layout row>
      <v-flex xs12 md8 offset-md2 xl6 offset-xl3>
        <v-tabs dark fixed centered>
          <v-toolbar extended>
            <v-toolbar-title slot="extension" class="display-2">{{username}}</v-toolbar-title>
          </v-toolbar>
          <v-tabs-bar>
            <v-tabs-slider class="yellow"></v-tabs-slider>
            <v-tabs-item :href="'#tab-0'">基本信息</v-tabs-item>
            <v-tabs-item :href="'#tab-1'">我的发布</v-tabs-item>
          </v-tabs-bar>
          <v-tabs-items>
            <v-tabs-content :id="'tab-0'">
              <v-card flat>
                <v-card-text>
                  <v-text-field label="邮箱" v-model="email" class="input-group--focused" :readonly="!isAuthor"></v-text-field>
                  <v-text-field label="密码" v-model="password" type="password" class="input-group--focused" v-if="isAuthor"></v-text-field>
                  <v-text-field label="密码确认" v-model="repassword" type="password" class="input-group--focused" v-if="isAuthor"></v-text-field>
                  <v-btn primary @click="updateHandle" v-if="isAuthor">修改</v-btn>
                </v-card-text>
              </v-card>
            </v-tabs-content>
            <v-tabs-content :id="'tab-1'">
              <v-card flat>
                <joblist :data="data"></joblist>
              </v-card>
            </v-tabs-content>
          </v-tabs-items>
        </v-tabs>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
import { getUserInfo, updateUserInfo } from '../../plugins/http'
import Cookie from 'js-cookie'
import JobList from '../../components/JobList'
export default {
  data () {
    return {
      email: '',
      password: '',
      repassword: '',
      username: '',
      data: [],
      isAuthor: false
    }
  },
  head () {
    return {
      title: '用户中心'
    }
  },
  methods: {
    async updateHandle () {
      await updateUserInfo(this.$route.params.id, {
        password: this.password,
        email: this.email,
        repassword: this.repassword
      })
      if (this.password) {
        Cookie.remove('devJobs')
        location.href = '/login'
      }
    }
  },
  async created () {
    const data = await getUserInfo(this.$route.params.id)
    this.email = data.email
    this.username = data.username
    this.data = data.jobs
    this.isAuthor = data.isAuthor
  },
  components: {
    joblist: JobList
  }
}
</script>

<style scoped>
.toolbar {
  background-color: #607d8b;
  color: #fff;
}

.display-2 {
  line-height: 1.2!important;
}
</style>
