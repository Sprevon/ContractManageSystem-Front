<script>
import {defineComponent} from 'vue'
import {Search} from "@element-plus/icons-vue";
import OrgSelectDataBean from "@/dataBean/OrgSelectDataBean";

export default defineComponent({
  name: "OrgSelect",
  components: {Search},
  props: {
    orgType: String,
    orgIndex: Number,
  },
  data() {
    return {
      queryData:{
        orgName:''
      },
      orgData: {
        message:'',
        code:Number,
        total:Number,
        data:[],
      },
      chosenOrgData: OrgSelectDataBean,
    }
  },
  methods: {
    //查询单位列表
    queryOrgList() {
      this.$http.post('/cms/queryOrg', this.queryData).then(response => {
        this.orgData = response.data;
      })
    },
    //查询单位i详细
    queryOrgDetail(chosenOrgId){
      this.$http.post('/cms/queryOrgDetail', chosenOrgId).then(response =>{
        const responseData = response.data;
        this.chosenOrgData = responseData.data;
      })
    },
    //处理选择信息
    handleChange(Object) {
      const chosenOrgId = {orgId:Object.orgId};
      this.queryOrgDetail(chosenOrgId);
      this.$emit("change", {index:this.orgIndex, value:chosenOrgId.orgId})
    },

  },
  created() {
    this.chosenOrgData = new OrgSelectDataBean({
    })
  }
})
</script>



<template>
  <div>
    <span class="org-select-card">
      <el-text tag="b" size="large" class="table-text">{{ orgType }}名称：</el-text>
      <el-input
          type="text"
          v-model="queryData.orgName"
          placeholder="请输入单位名称"
          class="input-text"></el-input>
      <el-button type="primary" @click="queryOrgList">
        <el-icon size="vertical-align: middle"> <Search/> </el-icon>
      </el-button>
    </span>
    <div class="table-divider"></div>
    <el-table :data="orgData.data" border fit
              :cell-type="{'textAlign':'center'}"
              highlight-current-row
              @current-change="handleChange">
      <el-table-column prop="orgId" label="单位编号" width="120"></el-table-column>
      <el-table-column prop="orgName" label="单位名称" width="180"></el-table-column>
      <el-table-column prop="orgAddress" label="单位地址" width="300"></el-table-column>
      <el-table-column prop="orgPhone" label="单位电话" width="180"></el-table-column>
      <el-table-column prop="orgRepresentName" label="单位法定代表人" width="200"></el-table-column>
    </el-table>

    <div style="height: 10px;"></div>
    <el-text tag="b" style="margin: 20px">已选择{{orgType}}：</el-text>
    <div style="height: 8px;"></div>
    <el-descriptions  border>
      <el-descriptions-item label="单位编号">{{chosenOrgData.orgId}}</el-descriptions-item>
      <el-descriptions-item label="单位名称">{{chosenOrgData.orgName}}</el-descriptions-item>
      <el-descriptions-item label="单位地址">{{chosenOrgData.orgAddress}}</el-descriptions-item>
      <el-descriptions-item label="单位传真">{{chosenOrgData.orgFax}}</el-descriptions-item>
      <el-descriptions-item label="单位法定代表人">{{chosenOrgData.orgRepresentName}}</el-descriptions-item>
      <el-descriptions-item label="单位邮政编号">{{chosenOrgData.orgMail}}</el-descriptions-item>
      <el-descriptions-item label="单位银行账户开户地址">{{chosenOrgData.orgBank}}</el-descriptions-item>
      <el-descriptions-item label="单位银行账号">{{chosenOrgData.orgBankAccount}}</el-descriptions-item>
    </el-descriptions>
    <div class="table-divider"></div>
    <el-divider></el-divider>
  </div>
</template>

<style scoped>
.org-select-card {
  margin: 10px;
}

.table-divider {
  width: 100%;
  height: 20px;
}
</style>