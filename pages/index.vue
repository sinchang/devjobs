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
