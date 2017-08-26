<template>
  <v-container fluid>
    <v-layout row>
      <v-flex xs12 md8 offset-md2 xl6 offset-xl3>
        <v-card>
          <v-toolbar class="blue-grey hidden-xs-only" dark>
            <v-toolbar-title>Jobs</v-toolbar-title>
            <v-spacer></v-spacer>
            <!-- <v-btn icon>
              <v-icon>search</v-icon>
            </v-btn> -->
          </v-toolbar>
          <v-list three-line subheader>
              <v-list-tile avatar v-for="item in data" v-bind:key="item.title" :href="`jobs/${item._id}`">
                <v-list-tile-avatar>
                  <img v-bind:src="`http://7xnrti.com1.z0.glb.clouddn.com/${item.companyLogo}?imageView2/5/w/200/h/200/format/jpg/q/75|imageslim`" />
                </v-list-tile-avatar>
                <v-list-tile-content>
                  <v-list-tile-title>{{ item.title }}</v-list-tile-title>
                  <v-list-tile-sub-title>
                    <v-list-tile-action-text>by <a :href="`/user/${item.author.username}`" target="_blank">{{item.author.username}}</a></v-list-tile-action-text>
                    <v-chip class="orange white--text hidden-xs-only" small>
                      <a :href="item.companyWebsite" target="_blank">{{item.companyName}}</a>
                    </v-chip>
                    <v-chip class="orange white--text hidden-xs-only">
                      {{item.location}}
                    </v-chip>
                    <v-chip class="orange white--text hidden-xs-only" small>
                      {{item.type}}
                    </v-chip>
                    <v-chip class="orange white--text hidden-xs-only" v-for="(v, i) in item.language" :key="i" small>
                      {{v}}
                    </v-chip>
                  </v-list-tile-sub-title>
                </v-list-tile-content>
                <v-list-tile-action>
                  <v-list-tile-action-text>
                    {{timeago(item.createdAt)}}
                  </v-list-tile-action-text>
                  <!-- <v-btn icon ripple>
                    <v-icon class="grey--text text--lighten-1">info</v-icon>
                  </v-btn> -->
                </v-list-tile-action>
              </v-list-tile>
          </v-list>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { getJobs } from '../plugins/http'
import timeago from 'timeago.js'

export default {
  data () {
    return {
      curPage: 1,
      data: []
    }
  },
  head () {
    return {
      title: '首页'
    }
  },
  methods: {
    async getJobsHandle () {
      const { data } = await getJobs({
        curPage: this.curPage,
        limit: 10
      })
      this.curPage++
      this.data = data
    },
    timeago (date) {
      const timeagoInstance = timeago()
      return timeagoInstance.format(date, 'zh_CN')
    }
  },
  created () {
    this.getJobsHandle()
  }
}
</script>

<style scoped>
.list__tile__sub-title .chip a {
  color: #fff;
}
.list__tile a {
  text-decoration: none;
}
.list {
  padding: 0;
}
</style>
