<template>
</template>

<script>
export default {
  data () {
    return {
      items: [
        {
          title: 'Click Me'
        },
        {
          title: 'Click Me'
        },
        {
          title: 'Click Me'
        },
        {
          title: 'Click Me 2'
        }
      ]
    }
  },
  head () {
    return {
      title: '首页'
    }
  }
}
</script>

<style scoped>
.title {
  margin: 30px 0;
}

.users {
  list-style: none;
  margin: 0;
  padding: 0;
}

.user {
  margin: 10px 0;
}
</style>
