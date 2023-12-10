<script>
import {defineComponent} from 'vue'
import {CreditCard, DeleteFilled, Edit, InfoFilled} from "@element-plus/icons-vue";
import {ElMessageBox} from "element-plus";

export default defineComponent({
  name: "CmsList",
  components: {DeleteFilled, InfoFilled, Edit, CreditCard},
  data() {
    return {
      cmsList: {
        message: String,
        code: Number,
        total: Number,
        responseData: [],
      },
      cmsQueryData: {
        contractId: '', orgName: '', resourceName: '', resourceSpec: '', editTypes: [],
        resourceDateStart: '', resourceDateEnd: '', pageNo: 1, pageSize: 20
      },
      editOption: [
        {id: 1, value: "发票待完善"},
        {id: 2, value: "待审批"},
        {id: 3, value: "未通过"},
        {id: 4, value: "通过"}
      ],
      paginationBean: {
        currentPage: 4,
        pageSize: 100,
      }
    }
  },
  methods: {
    getList() {
      this.$http.post("/cms/queryCms", this.cmsQueryData).then(response => {
        const res = response.data;
        this.cmsList.responseData = res.data;
        this.cmsList.code = res.code;
        this.cmsList.total = res.total;
        this.cmsList.message = res.message;
      })
    },
    getType(editType) {
      if (editType === 0) {
        return 'default';
      }
      if (editType === 1) {
        return 'warning';
      }
      if (editType === 2) {
        return 'danger';
      }
      if (editType === 3) {
        return 'success';
      }
    },
    changeNo(pageNo) {
      this.cmsQueryData.pageNo = pageNo;
      this.getList();
    },
    //删除订单
    deleteCms(contractId) {
      this.$http.post("/cms/deleteCms", {contractId: contractId}).then(response => {
        const code = response.data.code;
        if (code === 200) {
          ElMessageBox.alert("操作成功", "提示", {
            confirmButtonText: "确定"
          }).then(r => {
            return r;
          })
        } else {
          ElMessageBox.alert("操作失败", "提示", {
            confirmButtonText: "确定"
          })
        }
      })
      location.reload()
    }
  },
  created() {
    this.getList();
  }
})
</script>

<template>
  <div>
    <el-container>
      <el-header height="auto">
        <el-form :label-position="'right'" :model="cmsQueryData">
          <el-space :size="'small'" wrap>
            <el-form-item class="form-label" label="合同单号:">
              <el-input v-model="cmsQueryData.contractId" placeholder="请输入合同单号"></el-input>
            </el-form-item>
            <el-form-item class="form-label" label="单位名称:">
              <el-input v-model="cmsQueryData.orgName" placeholder="请输入单位名称"></el-input>
            </el-form-item>
            <el-form-item class="form-label" label="物料名称:">
              <el-input v-model="cmsQueryData.resourceName" placeholder="请输入物料名称"></el-input>
            </el-form-item>
            <el-form-item class="form-label" label="规格:">
              <el-input v-model="cmsQueryData.resourceSpec" placeholder="请输入规格"></el-input>
            </el-form-item>
            <el-form-item class="form-label" label="填写状态:">
              <el-select v-model="cmsQueryData.editTypes" multiple
                         placeholder="选择填写状态">
                <el-option
                    v-for="option in this.editOption"
                    :key="option.id"
                    :label="option.value"
                    :value="option.id"
                ></el-option>
              </el-select>
            </el-form-item>
            <!--            交货日期-开始-->
            <el-form-item class="form-label" label="交货日期 开始:">
              <el-date-picker
                  v-model="cmsQueryData.resourceDateStart"
                  format="YYYY-MM-DD"
                  placeholder="选择开始日期"
                  type="date"
                  value-format="YYYY-MM-DD"></el-date-picker>
            </el-form-item>
            <!--            交货日期-结束-->
            <el-form-item class="form-label" label="交货日期 结束:">
              <el-date-picker
                  v-model="cmsQueryData.resourceDateEnd"
                  format="YYYY-MM-DD"
                  placeholder="选择结束日期"
                  type="date"
                  value-format="YYYY-MM-DD"></el-date-picker>
            </el-form-item>
          </el-space>
          <!--          操作按钮-->
          <div style="height: 3px;"></div>
          <el-row>
            <el-col :span="2">
              <router-link to="/cmsCreate">
                <el-button plain type="primary">新增合同</el-button>
              </router-link>
            </el-col>
            <el-col :span="2">
              <el-button plain type="primary">新增单位</el-button>
            </el-col>
            <el-col :span="2">
              <el-button plain type="primary">新增资源</el-button>
            </el-col>
            <el-col :span="2">
              <router-link to="/cmsBoard">
                <el-button plain type="primary">数据看板</el-button>
              </router-link>
            </el-col>
            <el-col :span="12"></el-col>
            <el-col :span="4">
              <el-button type="primary" @click="getList">合同查询</el-button>
            </el-col>
          </el-row>
        </el-form>
      </el-header>
      <el-divider></el-divider>


      <el-main height="auto">
        <el-table :cell-type="{'textAlign':'center'}" :data="cmsList.responseData" border fit stripe
                  style="width:100%">
          <el-table-column label="合同单号" prop="contractId" width="100"/>
          <el-table-column label="供货单位" prop="orgName" width="180"/>
          <el-table-column label="物料名称" prop="resourceName" width="100"/>
          <el-table-column label="规格型号" prop="resourceSpec" width="100"/>
          <el-table-column label="数量/吨" prop="resourceQuality" width="80"/>
          <el-table-column label="价税合计" prop="invoiceTotal" width="100"/>
          <el-table-column label="交货日期" prop="resourceDate" width="200"/>
          <el-table-column label="填写状态" prop="editType" width="140">
            <template #default="scope">
              <el-tag :type="getType(scope.row.editType - 1)">{{
                  this.editOption[scope.row.editType - 1].value
                }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="auto">
            <template #default="scope">
              <el-row :gutter="5">
                <el-col span="4">
                  <el-tooltip
                      class="box-item"
                      content="合同发票"
                      effect="dark"
                      placement="bottom-start"
                  >
                    <el-icon :size="25">
                      <CreditCard/>
                    </el-icon>
                  </el-tooltip>
                </el-col>

                <el-col span="4">
                  <el-tooltip
                      class="box-item"
                      content="合同编辑"
                      effect="dark"
                      placement="bottom-start"
                  >
                    <el-icon :size="25">
                      <Edit/>
                    </el-icon>
                  </el-tooltip>
                </el-col>

                <el-col span="4">
                  <el-tooltip
                      class="box-item"
                      content="合同详细"
                      effect="dark"
                      placement="bottom-start"
                  >
                    <el-icon :size="25">
                      <InfoFilled/>
                    </el-icon>
                  </el-tooltip>
                </el-col>

                <el-col span="4">
                  <el-tooltip
                      class="box-item"
                      content="删除合同"
                      effect="dark"
                      placement="bottom-start"
                  >
                    <el-icon :size="25" @click="deleteCms(scope.row.contractId)">
                      <DeleteFilled/>
                    </el-icon>
                  </el-tooltip>
                </el-col>
              </el-row>
            </template>
          </el-table-column>
        </el-table>
      </el-main>


      <el-footer height="auto">
        <el-pagination
            v-model:current-page="this.paginationBean.currentPage"
            v-model:page-size="this.paginationBean.pageSize"
            :hide-on-single-page="false"
            :page-size="[100, 200, 300, 400]"
            :total="this.cmsList.total"
            background
            class="pagination-in-list"
            layout="total, prev, pager, next, jumper"
            @size-change="changeNo"/>
      </el-footer>
    </el-container>
  </div>
</template>

<style scoped>
.pagination-in-list {
  text-align: center;
  justify-content: center;
  margin: 20px;
}

.form-label {
  font-weight: bold;
}
</style>