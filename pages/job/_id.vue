<template>
  <v-container fluid>
    <v-layout row>
      <v-flex xs12 md8 offset-md2 xl6 offset-xl3>
        <article>
          <div class="entry-meta">
            <nuxt-link :to="`/user/${data.username}`">{{data.username}}</nuxt-link> |
            <a :href="data.companyWebsite">{{data.companyName}}</a> |
            {{timeago(data.createdAt)}} |
            <a href="javascript:;" v-if="!isActive">已关闭</a>
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
                <v-list-tile @click="share(0)" data-type="weibo">
                  <v-list-tile-title>分享至微博</v-list-tile-title>
                </v-list-tile>
                <v-list-tile @click="share(1)" data-type="twitter">
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
        <v-list>
          <v-subheader v-text="`共 ${data.comment && data.comment.length} 条评论`"></v-subheader>
          <template v-for="(item, index) in data.comment">
            <v-list-tile avatar v-bind:key="index">
              <v-list-tile-avatar>
                <img v-bind:src="item.avatar"/>
              </v-list-tile-avatar>
              <v-list-tile-content>
                <v-list-tile-title>{{item.author}}
                  <span class="comment-createAt">{{timeago(item.createdAt)}}</span>
                </v-list-tile-title>
                <v-list-tile-sub-title v-html="item.content"></v-list-tile-sub-title>
              </v-list-tile-content>
            </v-list-tile>
          </template>
        </v-list>
        <v-card class="elevation-0" v-show="isLogin">
          <v-card-text>
            <v-subheader>添加回复</v-subheader>
            <v-container fluid class="comment-container">
              <v-layout row>
                <v-flex xs12>
                  <v-text-field
                    class="comment-textarea"
                    v-model="content"
                    textarea
                  ></v-text-field>
                  <v-btn primary @click="submitCommentHandle">回复</v-btn>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { getOneJob, closeOneJob, submitComment } from '../../plugins/http'
import timeago from 'timeago.js'
import toast from '../../plugins/toast'
// import marked3 from 'marked3'

export default {
  data () {
    return {
      data: {},
      status: '关闭',
      // contentMd: '',
      content: '',
      isActive: true
    }
  },
  head () {
    return {
      title: this.data.title || '工作详情'
    }
  },
  // watch: {
  //   contentMd (v) {
  //     this.content = marked3(v)
  //   }
  // },
  computed: {
    isLogin () {
      return this.$store.state.token
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
      this.isActive = data.isActive
      if (!data.isActive) {
        this.status = '开启'
      }
      this.data = data
    },
    timeago (date) {
      const timeagoInstance = timeago()
      return timeagoInstance.format(date, 'zh_CN')
    },
    share (i) {
      if (i === 0) {
        const url = `http://service.weibo.com/share/share.php?url=${location.href}&type=button&language=zh_cn&appkey=3977462330&title=${this.data.title} -- via developerJobs.cn&searchPic=true&style=simple`
        window.open(url, 'newwindow', 'width=500,height=500')
      }
      if (i === 1) {
        const url = `https://twitter.com/intent/tweet?text=${this.data.title} -- via developerJobs.cn&url=${location.href}`
        window.open(url, 'newwindow', 'width=500,height=500')
      }
    },
    goEdit () {
      this.$router.push({ path: '/new', query: { id: this.$route.params.id, type: 'edit' } })
    },
    async close () {
      this.isActive = this.status === '开启'
      await closeOneJob({ id: this.$route.params.id, isActive: this.isActive })
      toast({
        message: this.isActive ? '开启成功' : '关闭成功',
        position: 'top',
        timeout: 2000,
        type: 'success'
      })
      this.status = this.isActive ? '关闭' : '开启'
    },
    async submitCommentHandle () {
      await submitComment({
        id: this.$route.params.id,
        content: this.content
        // contentMd: this.contentMd
      })
    }
  },
  created () {
    this.getOneJobHandle()
  }
}
</script>

<style>
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
.comment-textarea {
  padding-top: 0;
}
.comment-textarea .input-group__input {
  padding: 13px!important;
}
.comment-createAt {
  font-size: 12px;
  color: #ccc;
}
.comment-container {
  padding: 0;
}
</style>
