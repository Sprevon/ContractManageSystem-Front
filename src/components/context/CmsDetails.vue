<script>
import {defineComponent} from 'vue'
import {CMS_LIST_NO} from "@/constants/CmsConstants";
import {ArrowLeft} from "@element-plus/icons-vue";
import OrgInfo from "@/view/OrgInfo.vue";
import ResourceInfo from "@/view/ResourceInfo.vue";
import {ElMessageBox} from "element-plus";

export default defineComponent({
  name: "CmsDetails",
  computed: {
    ArrowLeft() {
      return ArrowLeft
    }
  },
  components: {ResourceInfo, OrgInfo},
  props: ['pageNo'],
  methods: {
    backToList() {
      this.$emit('update:pageNo', CMS_LIST_NO)
    },
    goBack() {
      this.$router.push({
        path: '/cmsList'
      })
    },
    getContractDetails() {
      this.$http.post("/cms/queryCmsDetails",
          {contractId: this.contractId}).then(response => {
        const res = response.data;
        const details = res.data;
        this.contract.orderOrg = details.orderOrg;
        this.contract.supplyOrg = details.supplyOrg;
        this.contract.receiveOrg = details.receiveOrg;
        this.contract.settleOrg = details.settleOrg;
        this.contract.resource = details.resource;
        this.contract.resource.resourceDate = details.resourceDate;
        this.contract.resource.resourceQuality = details.resourceQuality;
        this.contract.Invoice.invoiceId = details.invoiceId;
        this.contract.Invoice.invoiceUnitPrice = details.invoiceUnitPrice;
        this.contract.Invoice.invoicePrice = details.invoicePrice;
        this.contract.Invoice.invoiceTax = details.invoiceTax;
        this.contract.Invoice.invoiceTaxPercent = details.invoiceTaxPercent;
        this.contract.Invoice.invoiceTotal = details.invoiceTotal;
        this.contract.contractTerm = details.contractTerm;
      })
    },

    pass() {
      const alertMessage = "通过单号为" + this.contractId + "的订单？"
      ElMessageBox.confirm(alertMessage, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
      }).then(() => {
        this.$http.post("/cms/passCms", {contractId: this.contractId}).then(response => {
          const code = response.data.code;
          if (code === 200) {
            ElMessageBox.alert("操作成功", "提示", {
              confirmButtonText: "确定"
            }).then(r => {
              this.goBack()
              return r
            }).catch(() => {
            })
          } else {
            ElMessageBox.alert("操作失败", "提示", {
              confirmButtonText: "确定"
            }).then(r => {
              this.goBack()
              return r
            }).catch(() => {
            })
          }
        })
      }).catch(() => {
      })
    },

    reject() {
      const alertMessage = "打回单号为" + this.contractId + "的订单？"
      ElMessageBox.confirm(alertMessage, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
      }).then(() => {
        this.$http.post("/cms/rejectCms", {contractId: this.contractId}).then(response => {
          const code = response.data.code;
          if (code === 200) {
            ElMessageBox.alert("操作成功", "提示", {
              confirmButtonText: "确定"
            }).then(r => {
              this.goBack()
              return r
            }).catch(() => {
            })
          } else {
            ElMessageBox.alert("操作失败", "提示", {
              confirmButtonText: "确定"
            }).then(r => {
              this.goBack()
              return r
            }).catch(() => {
            })
          }
        })
      }).catch(() => {
      })

    },

  },
  data() {
    return {
      contractId: Number,
      contract: {
        orderOrg: Object,
        supplyOrg: Object,
        receiveOrg: Object,
        settleOrg: Object,
        resource: Object,
        Invoice: {
          invoiceId: Number,
          invoiceUnitPrice: Number,
          invoicePrice: Number,
          invoiceTax: Number,
          invoiceTaxPercent: Number,
          invoiceTotal: Number,
        },
      },
      orgList: [
        {id: 1, name: '供货单位'},
        {id: 2, name: '订货单位'},
        {id: 3, name: '收货单位'},
        {id: 4, name: '结算单位'},
      ],
    }
  },

  created() {
    this.contractId = this.$route.params.contractId;
    console.log(this.contractId)
    this.getContractDetails();
    console.log(this.contract);
  }
})
</script>


<template>
  <div>
    <el-page-header :icon="ArrowLeft" title="返回" @back="goBack">
      <template #content>
        <el-text
            size="large"
            tag="b">查看合同——合同编号{{ this.contractId }}
        </el-text>
      </template>
    </el-page-header>

    <el-form :model="contract" label-width="10%">
      <el-form-item>
      </el-form-item>
      <el-form-item>
        <OrgInfo :org-info="this.contract.supplyOrg" org-type="供货单位"></OrgInfo>
      </el-form-item>
      <el-form-item>
        <OrgInfo :org-info="this.contract.orderOrg" org-type="订货单位"></OrgInfo>
      </el-form-item>
      <el-form-item>
        <OrgInfo :org-info="this.contract.receiveOrg" org-type="收货单位"></OrgInfo>
      </el-form-item>
      <el-form-item>
        <OrgInfo :org-info="this.contract.settleOrg" org-type="结算单位"></OrgInfo>
      </el-form-item>
      <el-form-item>
        <ResourceInfo :resource="this.contract.resource"></ResourceInfo>
      </el-form-item>
      <el-form-item>
        <el-text size="large" tag="b">合同条款：</el-text>
        <el-text size="default">{{ this.contract.contractTerm }}</el-text>
        <div style="height: 20px"/>
      </el-form-item>

      <el-form-item>
        <el-row style="width: 100%">
          <el-col :span="8">
          </el-col>
          <el-col :span="8">
            <el-button type="primary" @click="pass">通过</el-button>
            <el-button type="danger" @click="reject">打回</el-button>
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