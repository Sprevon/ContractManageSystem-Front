<script>
import {defineComponent} from 'vue'

export default defineComponent({
  name: "UserPart",
  components: {},
  data() {
    return {
      userData: {
        username: '',
        userId: ''
      }
    }
  },
  methods() {
    this.$http.post('').then(response => {
      this.userData.username = response.data.username;
      this.userData.userId = response.data.userId;
    })
  },
  created() {

  }
})
</script>

<template>
  <div>
    <div class="empty-div-user"></div>
    <el-row :gutter="0">
      <el-col :span="4" class="greeting-icon">
        <font-awesome-icon size="xl" icon="fa-solid fa-circle-user" />
      </el-col>
      <el-col :span="20" class="greeting-text">
        <el-text tag="b" size="large" >欢迎{{ userData.username === ''? '您，请登录' : ',' + userData.username}}</el-text>
      </el-col>
    </el-row>
  </div>
</template>

<style scoped>
.empty-div-user{
}
.greeting-icon{
  margin-top: 5px;
}
.greeting-text{
  margin-top: 6px;
}
</style>