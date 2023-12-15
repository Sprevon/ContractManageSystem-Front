<script>
import {defineComponent} from 'vue'
import {ArrowLeft} from "@element-plus/icons-vue";
import ResourceSelect from "@/view/ResourceSelect.vue";
import OrgSelect from "@/view/OrgSelect.vue";
import OrgInfo from "@/view/OrgInfo.vue";
import {ElMessageBox} from "element-plus";

export default defineComponent({
  name: "CmsEdit",
  components: {OrgInfo, OrgSelect, ResourceSelect},
  computed: {
    ArrowLeft() {
      return ArrowLeft
    }
  },
  data() {
    return {
      contractId: Number,
      contract: {
        //订货单位信息（不可更改）
        orderOrg: Object,
        //供货单位信息（不可更改）
        supplyOrg: Object,
        //收货单位信息（可更改）
        receiveOrg: Object,
        //结算单位信息（可更改）
        settleOrg: Object,
        //资源信息（可更改）
        resource: Object,
      },
      orgList: [
        {id: 3, name: '收货单位'},
        {id: 4, name: '结算单位'},
      ],
      editData: {
        contractId: Number,
        receiveOrgId: Number,
        settleOrgId: Number,
        resourceId: Number,
        resourceQuality: Number,
        resourceDate: String,
        contractTerm: '',
      }
    }
  },
  methods: {
    goBack() {
      this.$router.push({
        path: '/cmsList'
      })
    },
    //修改单位信息
    change(object) {
      if (object.index === "3") {
        this.editData.receiveOrgId = object.value;
      } else {
        this.editData.settleOrgId = object.value;
      }
    },

    //修改资源信息
    changeResource(Object) {
      this.editData.resourceId = Object.resourceId;
    },
    changeResourceQuantity(Numb) {
      this.editData.resourceQuality = Numb;
    },
    changeResourceDate(date) {
      this.editData.resourceDate = date;
    },
    //保存
    save() {
      this.editData.contractId = this.contractId;
      const alertMessage = "保存单号为" + this.contractId + "订单的修改？";
      ElMessageBox.confirm(alertMessage, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
      }).then(() => {
        this.$http.post('/cms/editCms', this.editData).then(response => {
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
              return r
            }).catch(() => {
            })
          }
        })
      }).catch(() => {})
    },
    //获取数据
    getData() {
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
        this.contract.contractTerm = details.contractTerm;
      })
    }
  },
  created() {
    this.contractId = this.$route.params.contractId;
    this.getData()
  },
})
</script>

<template>
  <div>
    <el-page-header :icon="ArrowLeft" title="返回" @back="goBack">
      <template #content>
        <el-text
            size="large"
            tag="b">合同编辑——合同编号{{ this.contractId }}
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
        <OrgInfo :org-info="this.contract.orderOrg"  org-type="订货单位(不可更改）"></OrgInfo>
      </el-form-item>
      <el-form-item>
        <OrgSelect :have-exist="true" org-index="3"  :org-info="this.contract.receiveOrg" org-type="收货单位"
                   @change="change"></OrgSelect>
      </el-form-item>
      <el-form-item>
        <OrgSelect :have-exist="true" org-index="4" :org-info="this.contract.settleOrg" org-type="结算单位"
                   @change="change"></OrgSelect>
      </el-form-item>
      <el-form-item>
        <ResourceSelect :have-exist="true" :resource="this.contract.resource"
                        @changeResource="changeResource"
                        @changeResourceDate="changeResourceDate"
                        @changeResourceQuantity="changeResourceQuantity"></ResourceSelect>
      </el-form-item>
      <el-form-item>
        <el-text size="large" tag="b">旧——合同条款：</el-text>
        <el-text size="default">{{ this.contract.contractTerm }}</el-text>
        <div style="height: 20px"/>
      </el-form-item>

      <el-form-item>
        <el-text size="large" tag="b">新——合同条款：</el-text>
        <div style="height: 20px"/>
        <el-input type="textarea" v-model="this.editData.contractTerm"
                  placeholder="请输入合同有关条款" style="width:50%"></el-input>
        <div style="height: 20px"/>
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