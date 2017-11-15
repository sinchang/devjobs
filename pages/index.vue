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
          <joblist :data="data"></joblist>
        </v-card>
         <div class="text-xs-center">
            <v-btn light :loading="loading" @click="loadMore" v-if="hasNextPage">加载更多</v-btn>
          </div>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { getJobs } from '../plugins/http'
import JobList from '../components/JobList'
export default {
  data () {
    return {
      curPage: 1,
      limit: 20,
      data: [],
      loading: false,
      hasNextPage: true
    }
  },
  head () {
    return {
      title: '首页'
    }
  },
  methods: {
    async getJobsHandle () {
      this.loading = true
      const { data, hasNextPage } = await getJobs(this.curPage, this.limit)
      this.hasNextPage = hasNextPage
      this.loading = false
      this.data = this.data.concat(data)
    },
    loadMore () {
      this.curPage++
      this.getJobsHandle()
    }
  },
  created () {
    this.getJobsHandle()
  },
  components: {
    joblist: JobList
  }
}
</script>
