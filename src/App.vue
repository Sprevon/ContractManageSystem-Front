<template>
  <div>
    <el-container>
      <el-header height="50px">
        <HeadBar></HeadBar>
      </el-header>
      <div class="divide-block"></div>
      <el-container>
        <el-aside width="200px">
          <SideBar></SideBar>
        </el-aside>
        <el-main>
          <context-body></context-body>
        </el-main>
      </el-container>
      <el-footer>
        <div></div>
      </el-footer>
    </el-container>
  </div>
</template>

<script>
import ContextBody from "@/components/ContextBody.vue";
import HeadBar from "@/components/HeadBar.vue"
import SideBar from "@/components/SideBar.vue"

export default {
  name: 'App',
  components: {
    ContextBody,
    HeadBar,
    SideBar
  }
}
</script>

<style>
.divide-block {
  background-color: #409EFF;
  height: 5px;
  width: 100%;
}

.footer-block {
  background-color: yellow;
  height: 20px;
}
</style>
