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
            <v-text-field label="输入公司网站" v-model="companyWebsite" hint="url 必须包含http 或 https"></v-text-field>
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
            <v-tabs id="mobile-tabs-5" fixed>
              <v-tabs-bar slot="activators">
                <v-tabs-slider class="yellow"></v-tabs-slider>
                <v-tabs-item :href="'#tab-0'" class="white--text">编辑</v-tabs-item>
                <v-tabs-item :href="'#tab-1'" class="white--text">预览</v-tabs-item>
              </v-tabs-bar>
              <v-tabs-content :id="'tab-0'">
                <v-text-field v-model="md" label="请使用 MD 语法，详细描述招聘需求。" textarea></v-text-field>
              </v-tabs-content>
              <v-tabs-content :id="'tab-1'">
                <p v-html="desc" class="yue"></p>
              </v-tabs-content>
            </v-tabs>
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
import marked3 from 'marked3'
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
      md: '',
      isPreview: false,
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
  watch: {
    md (v) {
      this.desc = marked3(v)
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

<style>
.application--light .tabs .tabs__item,
.application--light .tabs .tabs__item.tabs__item--active {
  color: #fff;
}

.tabs__items {
  border-color: #fff;
}

.tabs:not(.tabs--centered):not(.tabs--grow):not(.tabs--mobile) .tabs__wrapper--scrollable {
  margin: 0;
}
</style>
