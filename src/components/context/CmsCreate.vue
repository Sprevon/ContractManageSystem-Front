<!--创建合同订单-->
<script>
import {defineComponent} from 'vue'
import CmsContract from "@/dataBean/CmsContract";
import OrgSelect from '@/view/OrgSelect.vue'
import ResourceSelect from '@/view/ResourceSelect.vue'
import {ElMessageBox} from 'element-plus'

export default defineComponent({
  name: "CmsCreate",
  props: ['pageNo'],
  components: {
    OrgSelect,
    ResourceSelect
  },
  data() {
    return {
      contract: {
        supplyOrgId: Number,
        orderOrgId: Number,
        receiveOrgId: Number,
        settleOrgId: Number,
        resourceId: Number,
        resourceQuality: Number,
        resourceDate : String,
        contractTerm: String,
      },
      orgList: [
        {id: 1, name: '供货单位'},
        {id: 2, name: '订货单位'},
        {id: 3, name: '收货单位'},
        {id: 4, name: '结算单位'},
      ]
    }
  },
  methods: {

    //监听子组件数值变化并修改单位信息
    change(object) {
      if (object.index === "1") {
        this.contract.supplyOrgId = object.value;
      } else if (object.index === "2") {
        this.contract.orderOrgId = object.value;
      } else if (object.index === "3") {
        this.contract.receiveOrgId = object.value;
      } else {
        this.contract.settleOrgId = object.value;
      }
    },
    //监听并修改资源信息
    changeResource(Object) {
      this.contract.resourceId = Object.resourceId;
    },
    changeResourceQuantity(Numb) {
      this.contract.resourceQuality = Numb;
    },
    changeResourceDate(date){
      // console.log("get Date!")
      this.contract.resourceDate = date;
    },
    //返回
    goBack() {
      this.$router.push('/')
    },
    //保存
    commit() {
      this.$http.post('/cms/createCms', this.contract).then(response => {
        const res = response.data;
        const code = res.code;
        if (code === 200) {
          ElMessageBox.alert('操作成功', '提示', {
            confirmButtonText: '确定'
          })
        }
        this.goBack();
      })
    }
  },

  created() {
    this.contract = new CmsContract({})
  }
})
</script>

<template>
  <div>
    <el-page-header @back="goBack" title="返回">
      <template #content>
        <el-text
            size="large"
            tag="b">新增合同
        </el-text>
      </template>
    </el-page-header>
    <el-form :model="contract" label-width="10%">
      <el-form-item>
      </el-form-item>
      <el-form-item>
        <OrgSelect org-type="供货单位" org-index="1" @change="change"></OrgSelect>
      </el-form-item>
      <el-form-item>
        <OrgSelect org-type="订货单位" org-index="2" @change="change"></OrgSelect>
      </el-form-item>
      <el-form-item>
        <OrgSelect org-type="收货单位" org-index="3" @change="change"></OrgSelect>
      </el-form-item>
      <el-form-item>
        <OrgSelect org-type="结算单位" org-index="4" @change="change"></OrgSelect>
      </el-form-item>
      <el-form-item>
        <ResourceSelect @changeResource="changeResource" @changeResourceQuantity="changeResourceQuantity"
                        @changeResourceDate="changeResourceDate"></ResourceSelect>
      </el-form-item>
      <el-form-item>
        <el-text tag="b" size="large">合同条款：</el-text>
        <div style="height: 20px"/>
        <el-input type="textarea" v-model="contract.contractTerm"
                  placeholder="请输入合同有关条款" style="width:70%"></el-input>
      </el-form-item>

      <el-form-item>
        <el-row style="width: 100%">
          <el-col :span="8"></el-col>
          <el-col :span="8">
            <el-button @click="commit" type="primary">保存</el-button>
            <el-button @click="goBack" type="info">取消</el-button>
          </el-col>
          <el-col :span="8"></el-col>
        </el-row>
      </el-form-item>
    </el-form>
  </div>
</template>

<style scoped>

</style>