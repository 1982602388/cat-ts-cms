<!-- author: LJ -->
<!-- date: 2022-06-13 00:41:23 -->
<!-- description:  -->
<template>
  <div class="table">
    <el-table :data="listData" border style="width: 100%">
      <template v-for="propItem in propList" :key="propItem.prop">
        <el-table-column v-bind="propItem" align="center">
          <template #default="scope">
            <!-- scope.row相当于当前行的数据对象 -->
            <!-- :name="propItem.slotName"动态绑定插槽名 -->
            <slot :name="propItem.slotName" :dataRow="scope.row">
              {{ scope.row[propItem.prop] }}
            </slot>
          </template>
          <!-- 38集最后 -->
        </el-table-column>
      </template>
    </el-table>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'cc-table',
  props: {
    listData: {
      type: Array,
      default: () => [],
      required: true
    },
    propList: {
      type: Array,
      default: () => [],
      required: true
    }
  },
  setup() {
    return {}
  }
})
</script>

<style scoped lang="less"></style>
