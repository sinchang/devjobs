<template>
  <v-container fluid>
    <v-layout row>
      <v-flex xs12 md8 offset-md2 xl6 offset-xl3>
        <article>
          <div class="entry-meta">
            <nuxt-link to="`/user/${data.username}`">{{data.username}}</nuxt-link> |
            <a :href="data.companyWebsite">{{data.companyName}}</a> |
            {{timeago(data.createdAt)}}
            <v-menu>
              <v-btn flat slot="activator">
                <v-icon class="icon-toc">toc</v-icon>
              </v-btn>
              <v-list>
                <v-list-tile @click="goEdit" v-if="data.isAuthor">
                  <v-list-tile-title>编辑</v-list-tile-title>
                </v-list-tile>
                <v-list-tile @click="close" v-if="data.isAuthor">
                  <v-list-tile-title>{{status}}</v-list-tile-title>
                </v-list-tile>
                <v-list-tile @click="share" data-type="weixin">
                  <v-list-tile-title>分享至微信</v-list-tile-title>
                </v-list-tile>
                <v-list-tile @click="share" data-type="weibo">
                  <v-list-tile-title>分享至微博</v-list-tile-title>
                </v-list-tile>
                <v-list-tile @click="share" data-type="twitter">
                  <v-list-tile-title>分享至 Twitter</v-list-tile-title>
                </v-list-tile>
              </v-list>
            </v-menu>
          </div>
          <h4 class="entry-title">{{data.title}}</h4>
          <div class="entry-tag">
            <v-chip>{{data.location}}</v-chip>
            <v-chip v-for="(v, i) in data.language" :key="i">{{v}}</v-chip>
          </div>
          <div class="yue" v-html="data.desc">
          </div>
        </article>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { getOneJob, closeOneJob } from '../../plugins/http'
import timeago from 'timeago.js'
import toast from '../../plugins/toast'

export default {
  data () {
    return {
      data: {},
      status: '关闭'
    }
  },
  head () {
    return {
      title: '首页'
    }
  },
  methods: {
    async getOneJobHandle () {
      const { data } = await getOneJob(this.$route.params.id)
      if (!data.author) {
        this.$router.push({ path: '/404' })
        return
      }
      data.username = data.author.username
      if (!data.isActive) {
        this.status = '开启'
      }
      this.data = data
    },
    timeago (date) {
      const timeagoInstance = timeago()
      return timeagoInstance.format(date, 'zh_CN')
    },
    share () {

    },
    goEdit () {
      this.$router.push({ path: '/new', query: { id: this.$route.params.id, type: 'edit' } })
    },
    async close () {
      const isActive = this.status === '开启'
      await closeOneJob({ id: this.$route.params.id, isActive: isActive })
      toast({
        message: isActive ? '开启成功' : '关闭成功',
        position: 'top',
        timeout: 2000,
        type: 'success'
      })
      this.status = isActive ? '关闭' : '开启'
    }
  },
  created () {
    this.getOneJobHandle()
  }
}
</script>

<style scoped>
.entry-meta {
  color: #607d8b;
}
.application--light .btn .icon-toc {
  color: #607d8b;
}

.entry-meta a {
  text-decoration: none;
}
.entry-title {
  font-weight: bold;
  margin-top: 10px;
  padding-bottom: 10px;
  border-bottom: 1px solid #ededee;
}
</style>
