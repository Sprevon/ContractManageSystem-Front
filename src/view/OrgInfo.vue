<script>
import {defineComponent} from 'vue'
// import OrgSelectDataBean from "@/dataBean/OrgSelectDataBean";

export default defineComponent({
  name: "OrgInfo",
  props: {
    orgInfo: Object,
    orgType: String
  },
  data() {
    return {
      // chosenOrgData: OrgSelectDataBean,
    }
  },
  created() {
    // this.chosenOrgData = new OrgSelectDataBean({
    // });
    // this.chosenOrgData.orgId = this.orgInfo.orgId;
    // this.chosenOrgData.orgName = this.orgInfo.orgName;
    // this.chosenOrgData.orgAddress = this.orgInfo.orgAddress;
    // this.chosenOrgData.orgFax = this.orgInfo.orgFax;
    // this.chosenOrgData.orgRepresentName = this.orgInfo.orgRepresentName;
    // this.chosenOrgData.orgMail = this.orgInfo.orgMail;
    // this.chosenOrgData.orgBank = this.orgInfo.orgBank;
    // this.chosenOrgData.orgBankAccount = this.orgInfo.orgBankAccount;
  }
})
</script>

<template>
  <div>
    <el-text tag="b" style="margin: 20px">{{orgType}}：</el-text>
    <div style="height: 8px"></div>
    <el-descriptions  border>
      <el-descriptions-item label="单位编号">{{orgInfo.orgId}}</el-descriptions-item>
      <el-descriptions-item label="单位名称">{{orgInfo.orgName}}</el-descriptions-item>
      <el-descriptions-item label="单位地址">{{orgInfo.orgAddress}}</el-descriptions-item>
      <el-descriptions-item label="单位传真">{{orgInfo.orgFax}}</el-descriptions-item>
      <el-descriptions-item label="单位法定代表人">{{orgInfo.orgRepresentName}}</el-descriptions-item>
      <el-descriptions-item label="单位邮政编号">{{orgInfo.orgMail}}</el-descriptions-item>
      <el-descriptions-item label="单位银行账户开户地址">{{orgInfo.orgBank}}</el-descriptions-item>
      <el-descriptions-item label="单位银行账号">{{orgInfo.orgBankAccount}}</el-descriptions-item>
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
  width: 900px;
  height: 20px;
}
</style>