<script>
import {defineComponent} from 'vue'

export default defineComponent({
  name: "ResourceInfo",
  data(){
    return {
      resourceDetail: {},
    }
  },
  props: {
    resource: Object,
  }
})
</script>

<template>
  <div>
    <el-text style="margin: 20px" tag="b">资源信息：</el-text>
    <div style="height: 8px"/>
    <el-descriptions border>
      <el-descriptions-item label="资源编号">{{ resource.resourceId }}</el-descriptions-item>
      <el-descriptions-item label="资源名称">{{ resource.resourceName }}</el-descriptions-item>
      <el-descriptions-item label="资源型号">{{ resource.resourceSpec }}</el-descriptions-item>
      <el-descriptions-item label="资源规格">{{ resource.resourceType }}</el-descriptions-item>
      <el-descriptions-item label="资源数量">{{ resource.resourceQuality }}</el-descriptions-item>
      <el-descriptions-item label="交货时间">{{ resource.resourceDate }}</el-descriptions-item>

    </el-descriptions>
    <div class="table-divider"/>
    <el-divider/>
  </div>
</template>

<style scoped>
.resource-select-card {
  margin: 10px;
}

.table-divider {
  width: 900px;
  height: 20px;
}
</style>