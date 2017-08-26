<template>
  <v-container fluid>
    <v-layout row>
      <v-flex xs12 sm6 offset-sm3>
        <article>
          <div class="entry-meta">
            <a :href="`/user/${data.username}`">{{data.username}}</a> |
            <a :href="data.companyWebsite">{{data.companyName}}</a> |
            {{timeago(data.createdAt)}}
            <v-menu v-if="data.isAuthor">
              <v-btn flat slot="activator">
                <v-icon class="icon-toc">toc</v-icon>
              </v-btn>
              <v-list>
                <v-list-tile @click="goEdit">
                  <v-list-tile-title>编辑</v-list-tile-title>
                </v-list-tile>
                <v-list-tile @click="cancel">
                  <v-list-tile-title>下线</v-list-tile-title>
                </v-list-tile>
                <v-list-tile @click="share">
                  <v-list-tile-title>分享</v-list-tile-title>
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
import { getOneJob } from '../../plugins/http'
import timeago from 'timeago.js'

export default {
  data () {
    return {
      data: {}
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
      data.username = data.author.username
      this.data = data
    },
    timeago (date) {
      const timeagoInstance = timeago()
      return timeagoInstance.format(date, 'zh_CN')
    },
    share () {

    },
    goEdit () {

    },
    cancel () {

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
