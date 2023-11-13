<script>
import {defineComponent} from 'vue'
import {Search} from "@element-plus/icons-vue";

export default defineComponent({
  name: "ResourceSelect",
  components: {Search},
  data() {
    return {
      //查询资源的数据
      queryData: {resourceName: ''},
      //返回资源数据
      resourceData: [],
      //资源详细数据
      resourceDetail: {},
    }
  },
  methods: {
    //查询资源列表
    queryResourceList() {
      this.$http.post("/cms/queryResource", this.queryData).then(response => {
        const res = response.data;
        this.resourceData.data = res.data;
        // this.resourceData.total = res.total;
      })
    },
    //查询资源详细
    queryResourceDetail(Object) {
      this.$http.post("/cms/queryResourceDetail", Object).then(response => {
        const res = response.data;
        this.resourceDetail.resourceId = res.data.resourceId;
        this.resourceDetail.resourceName = res.data.resourceName;
        this.resourceDetail.resourceSpec = res.data.resourceSpec;
        this.resourceDetail.resourceType = res.data.resourceType;
      })
    },
    //处理表选择
    handleChange(Object) {
      const chosenResourceId = {resourceId: Object.resourceId};
      this.queryResourceDetail(chosenResourceId);
      this.$emit("changeResource", {resourceId: chosenResourceId.resourceId})
    },
    //处理数量输入
    handleQuantity(Numb) {
      this.resourceDetail.resourceQuality = Numb;
      this.$emit("changeResourceQuantity", Numb);
    },
    handleDate(Date){
      // console.log("handle Date!");
      // console.log(Date.toString());
      this.$emit("changeResourceDate", Date.toString());
    }
  }
})
</script>

<template>
  <div>
    <span class="resource-select-card">
      <el-row width="100%">
        <el-col :span="8">
            <el-text size="large" tag="b">资源名称：</el-text>
            <el-input
                v-model="queryData.resourceName"
                class="input-text"
                placeholder="请输入资源名称"
                type="text"></el-input>
            <el-button type="primary" @click="queryResourceList">
              <el-icon size="vertical-align:middle">
                <search/>
              </el-icon>
            </el-button>
        </el-col>
            <el-col :span="7">
            <el-text size="large" tag="b">资源数量：</el-text>
            <el-input v-model="queryData.resourceQuality" class="input-text" placeholder="请输入资源订购数量"
                      style="width:180px" type="number" @input="handleQuantity" />
            </el-col>
        <el-col :span="9">
          <el-text size="large" tag="b">交货时间：</el-text>
          <el-date-picker
              v-model="resourceDetail.resourceDate"
              format="YYYY-MM-DD"
              placeholder="请选择交货时间"
              type="date"
              @change="handleDate"
              value-format="YYYY-MM-DD"/>
        </el-col>

      </el-row>
    </span>
    <div class="table-divider"></div>

    <el-table :data="resourceData.data" border fit
              highlight-current-row
              @current-change="handleChange">
      <el-table-column label="资源编号" prop="resourceId" width="240"/>
      <el-table-column label="资源名称" prop="resourceName" width="240"/>
      <el-table-column label="资源规格" prop="resourceSpec" width="240"/>
      <el-table-column label="资源型号" prop="resourceType" width="240"/>
    </el-table>

    <div style="height: 10px"/>
    <el-text style="margin: 20px" tag="b">已选择资源：</el-text>
    <div style="height: 8px"/>
    <el-descriptions border>
      <el-descriptions-item label="资源编号">{{ resourceDetail.resourceId }}</el-descriptions-item>
      <el-descriptions-item label="资源名称">{{ resourceDetail.resourceName }}</el-descriptions-item>
      <el-descriptions-item label="资源型号">{{ resourceDetail.resourceSpec }}</el-descriptions-item>
      <el-descriptions-item label="资源规格">{{ resourceDetail.resourceType }}</el-descriptions-item>
      <el-descriptions-item label="资源数量">{{ resourceDetail.resourceQuality }}</el-descriptions-item>
      <el-descriptions-item label="交货时间">{{ resourceDetail.resourceDate }}</el-descriptions-item>
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
  width: 100%;
  height: 20px;
}
</style>