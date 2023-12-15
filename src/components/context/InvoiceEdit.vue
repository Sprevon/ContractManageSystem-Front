<script>
import {defineComponent} from 'vue'
import {ArrowLeft} from "@element-plus/icons-vue";


export default defineComponent({
  name: "InvoiceEdit",
  computed: {
    ArrowLeft() {
      return ArrowLeft
    }
  },
  data(){
    return{
      contractId: Number,
    }
  },
  methods:{
    goBack() {
      this.$router.push({
        path: '/cmsList'
      })
    },
    save(){

    },
    getData(){

    }
  },
  created(){
    this.contractId = this.$route.params.contractId;
  },
})
</script>

<template>
  <div>
    <el-page-header :icon="ArrowLeft" title="返回" @back="goBack">
      <template #content>
        <el-text
            size="large"
            tag="b">编辑发票——合同编号{{ this.contractId }}
        </el-text>
      </template>
    </el-page-header>

    <el-form :model="contract" label-width="10%">
      <el-form-item>
      </el-form-item>
      <el-form-item>
        <OrgInfo :org-info="this.contract.supplyOrg" org-type="供货单位(不可更改）"></OrgInfo>
      </el-form-item>

      <el-form-item>
        <el-row style="width: 100%">
          <el-col :span="8">
          </el-col>
          <el-col :span="8">
            <el-button type="primary" @click="save">保存</el-button>
            <el-button type="default" @click="goBack">返回</el-button>
          </el-col>
          <el-col :span="8"></el-col>
        </el-row>
      </el-form-item>
    </el-form>
  </div>
</template>

<style scoped>

</style>