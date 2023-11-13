<script>
import {defineComponent} from 'vue'
import UserPart from '@/components/headBar/UserPart.vue'

export default defineComponent({
  name: "HeadBar",
  components: {
    UserPart
  },
  data() {
    return {
      heading: '供销存管理系统',
    }
  },

})
</script>

<template>
  <div>
    <el-image src="photo1.png" fit="cover" class="header-image"></el-image>
    <div class="empty-box"></div>
    <el-row :gutter="20">
      <el-col :span="4">
      </el-col>
      <el-col :span="10">
        <el-text tag="b" size="large" class="slogan">
          {{ heading }}
        </el-text>
      </el-col>
      <el-col :span="3"></el-col>
      <el-col :span="6">
        <a href="http://localhost:8080"><UserPart></UserPart></a>
      </el-col>
    </el-row>
  </div>
</template>

<style scoped>
.slogan {
  font-size: x-large;
}

.empty-box {
  height: 10px;
}
.header-image{
  height: 50px;
  width: 199px;
  position: absolute;
  top: 6px;
  left: 10px;
}
</style>