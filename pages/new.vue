<template>
  <v-container fluid>
    <v-layout row wrap>
      <v-flex xs12 md8 offset-md2>
        <v-stepper v-model="e6" vertical>
          <v-stepper-step step="1" v-bind:complete="e6 > 1">
            公司基本信息
          </v-stepper-step>
          <v-stepper-content step="1">
            <v-text-field label="输入公司名字" v-model="companyName" required></v-text-field>
            <v-text-field label="输入公司网站" v-model="companyWebsite"  hint="url 必须包含http 或 https"></v-text-field>
            <upload-button title="上传公司 logo" :src="src" :selectedCallback="fileSelectedFunc"></upload-button>
            <v-btn primary @click.native="e6 = 2">下一步</v-btn>
          </v-stepper-content>
          <v-stepper-step step="2" v-bind:complete="e6 > 2">工作基本信息</v-stepper-step>
          <v-stepper-content step="2">
            <v-text-field label="输入标题" v-model="title" required></v-text-field>
            <v-text-field label="输入工作地点" v-model="location"></v-text-field>
            <v-select label="选择工作形式" v-bind:items="items" v-model="type" item-value="id"></v-select>
            <v-select label="选择工作语言" v-bind:items="states" v-model="language" multiple max-height="400"></v-select>
            <v-btn primary @click.native="e6 = 3">下一步</v-btn>
            <v-btn flat @click.native="e6 = 1">返回</v-btn>
          </v-stepper-content>
          <v-stepper-step step="3" v-bind:complete="e6 > 3">工作详情描述</v-stepper-step>
          <v-stepper-content step="3">
            <v-text-field v-model="desc" label="请使用 MD 语法，详细描述招聘需求。" textarea light></v-text-field>
            <v-btn primary @click.native="publishHandle">发布</v-btn>
            <v-btn flat @click.native="e6 = 2">返回</v-btn>
          </v-stepper-content>
        </v-stepper>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import UploadButton from '../components/UploadButton'
import { upload, publishJob } from '../plugins/http'

export default {
  data () {
    return {
      companyName: '',
      companyWebsite: '',
      title: '',
      src: '',
      companyLogo: '',
      e6: 1,
      type: '',
      desc: '',
      location: '',
      language: [],
      items: [
        { text: '全职', id: 0 },
        { text: '兼职', id: 1 },
        { text: '远程', id: 2 }
      ],
      states: [
        { text: 'HTML/CSS/JS', id: 0 },
        { text: 'Nodejs', id: 1 },
        { text: 'Python', id: 2 },
        { text: 'Ruby', id: 3 },
        { text: 'Java', id: 4 },
        { text: 'Objective-C/Swift', id: 5 },
        { text: 'PHP', id: 6 },
        { text: 'C, C++ and C#', id: 7 },
        { text: 'Go', id: 8 },
        { text: 'Lua', id: 9 },
        { text: 'SQL', id: 10 }
      ]
    }
  },
  methods: {
    async fileSelectedFunc (file) {
      if (!file) return
      const formData = new FormData()
      formData.append('image', file)
      const data = await upload(formData)
      this.companyLogo = data.data.key
      this.src = `http://${data.data.url}?imageView2/5/w/200/h/200/format/jpg/q/75|imageslim`
    },
    async publishHandle () {
      const l = this.language.map(item => {
        return item.id
      })
      const params = {
        companyName: this.companyName,
        companyLogo: this.companyLogo,
        companyWebsite: this.companyWebsite,
        type: this.type,
        language: l,
        location: this.location,
        desc: this.desc,
        title: this.title
      }
      await publishJob(params)
      location.href = '/'
    }
  },
  created () {

  },
  head () {
    return {
      title: '发布新工作'
    }
  },
  components: {
    UploadButton
  }
}
</script>
