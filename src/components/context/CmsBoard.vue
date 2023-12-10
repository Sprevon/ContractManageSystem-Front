<script>
import {defineComponent} from 'vue'

export default defineComponent({
  name: "CmsBoard",
  methods:{
    goBack(){
      this.$router.push('/')
    }
  }
})
</script>

<template>
  <div>
    <el-page-header @back="goBack" title="返回">
      <el-image src="board/dataBoard.png"></el-image>
    </el-page-header>
  </div>
</template>

<style scoped>

</style>