<template>
  <v-list three-line subheader>
    <v-list-tile avatar v-for="item in data" v-bind:key="item.title">
      <nuxt-link :to="`/job/${item._id}`" class="list__tile job-link">
        <v-list-tile-avatar>
          <img v-bind:src="`http://7xnrti.com1.z0.glb.clouddn.com/${item.companyLogo}?imageView2/5/w/200/h/200/format/jpg/q/75|imageslim`" />
        </v-list-tile-avatar>
        <v-list-tile-content>
          <v-list-tile-title :class="{close: !item.isActive }">{{ item.title }}</v-list-tile-title>
          <v-list-tile-sub-title>
            <v-list-tile-action-text>by
              <nuxt-link :to="`/user/${item.author.username}`">{{item.author.username}}</nuxt-link>
            </v-list-tile-action-text>
            <v-chip class="orange white--text hidden-xs-only" small>
              <a href="javascript:;" @click.stop.prevent="redirect(item.companyWebsite)">{{item.companyName}}</a>
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
        </v-list-tile-action>
      </nuxt-link>
    </v-list-tile>
  </v-list>
</template>

<script>
import timeago from 'timeago.js'
export default {
  name: 'joblist',
  props: {
    data: {
      type: Array,
      required: true
    }
  },
  methods: {
    timeago (date) {
      const timeagoInstance = timeago()
      return timeagoInstance.format(date, 'zh_CN')
    },
    redirect (url) {
      window.open(url)
    }
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
.job-link {
  width: 100%;
}
a.job-link:hover {
  background-color: transparent;
}
.list__tile__title.close {
  text-decoration: line-through;
}
</style>
