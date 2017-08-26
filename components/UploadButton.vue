<template>
  <div>
    <v-card-media :src="src" alt="" class="upload-image" v-show="src" height="200px">
    </v-card-media>
    <v-btn primary class="jbtn-file">
      {{ title }}<input id="selectFile" type="file" v-on:change="fileSelected">
    </v-btn>
  </div>
</template>

<script>
export default {
  name: 'upload-button',
  props: {
    selectedCallback: Function,
    title: String,
    src: String
  },
  methods: {
    fileSelected (e) {
      if (this.selectedCallback) {
        if (e.target.files[0]) {
          this.selectedCallback(e.target.files[0])
        } else {
          this.selectedCallback(null)
        }
      }
    }
  }
}
</script>

<style scoped>
.jbtn-file {
  cursor: pointer;
  position: relative;
  margin-bottom: 36px;
  overflow: hidden;
}

.jbtn-file input[type=file] {
  position: absolute;
  top: 0;
  right: 0;
  min-width: 100%;
  min-height: 100%;
  font-size: 100px;
  text-align: right;
  filter: alpha(opacity=0);
  opacity: 0;
  outline: none;
  cursor: inherit;
  display: block;
}

.upload-image {
  display: block;
  width: 200px;
  height: 200px;
  border-radius: 2px;
  box-shadow: 0 1px 5px rgba(0, 0, 0, .2), 0 2px 2px rgba(0, 0, 0, .14), 0 3px 1px -2px rgba(0, 0, 0, .12);
}
</style>
