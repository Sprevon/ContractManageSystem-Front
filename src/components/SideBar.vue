<script>
import {defineComponent} from 'vue'
import {DataLine, Discount, Histogram, MessageBox} from "@element-plus/icons-vue";

export default defineComponent({
  name: "SideBar",
  components: {DataLine, Discount, Histogram, MessageBox},
  data: function () {
    return {
      sideBar: [
        {id: 1, name: '采购管理'},
        {id: 2, name: '合同管理'},
        {id: 3, name: '库存管理'},
        {id: 4, name: '销售管理'}
      ]
    }
  }
})
</script>

<template>
  <div>
    <el-row>
      <el-col>
        <el-text></el-text>
        <el-menu default-active="2"
                 class="left-menu">
          <el-menu-item index="1"
                        disabled>
            <el-icon>
              <MessageBox/>
            </el-icon>
            <span>采购管理</span>
          </el-menu-item>
          <el-menu-item index="2">
            <el-icon>
              <Histogram/>
            </el-icon>
            <span>合同管理</span>
          </el-menu-item>
          <el-menu-item index="3"
                        disabled>
            <el-icon>
              <Discount/>
            </el-icon>
            <span>库存管理</span>
          </el-menu-item>
          <el-menu-item index="4"
                        disabled>
            <el-icon>
              <DataLine/>
            </el-icon>
            <span>销售管理</span>
          </el-menu-item>
        </el-menu>
      </el-col>
    </el-row>
  </div>
</template>

<style scoped>
.left-menu {
  height: 100vh;
}

span {
  font-weight: bold;
  font-size: medium;
}
el-menu-item{
  border: solid #dcdfe6;
}
</style>