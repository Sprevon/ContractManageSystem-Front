<script>
import {defineComponent} from 'vue'
import {CMS_LIST_NO} from "@/constants/CmsConstants";

export default defineComponent({
  name: "CmsEdit",
  props:['pageNo'],
  methods:{
    backToList(){
      this.$emit('update:pageNo', CMS_LIST_NO)
    }
  }
})
</script>

<template>
  <div>

  </div>
</template>

<style scoped>

</style>