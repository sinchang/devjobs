<template>
  <v-app>
    <main>
    <my-header :username="username" />
    <nuxt/>
    <my-footer/>
    </main>
  </v-app>

</template>

<script>
import MyFooter from '~/components/Footer.vue'
import MyHeader from '~/components/Header.vue'
import Cookie from 'js-cookie'

export default {
  components: {
    MyFooter,
    MyHeader
  },
  data () {
    return {
      username: ''
    }
  },
  created () {
    const cookie = Cookie.getJSON('devJobs')
    if (cookie) {
      this.username = cookie.username
      this.$store.commit('setToken', cookie.token)
      this.$store.commit('setUsername', cookie.username)
    }
    // console.log(this.$store)
  }
}
</script>
