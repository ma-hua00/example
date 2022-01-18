<template>
  <div class="home">
    <img alt="Vue logo" src="@src/assets/logo.png" @click="handleClick">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import * as $http from '@src/api/index.js'

export default {
  name: 'home',
  components: {
    HelloWorld
  },
  methods: {
    handleClick() {
      $http.getList().then(res => {
        console.log(res)
      })
    }
  }
}
</script>
