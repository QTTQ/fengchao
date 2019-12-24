<template>
  <section class="button_box">
    <el-button v-if="data.tempTypeId==1">默认按钮</el-button>
    <el-button type="primary" v-else-if="data.tempTypeId==2">主要按钮</el-button>
    <el-button type="success" v-else-if="data.tempTypeId==3">成功按钮</el-button>
    <el-button type="info" v-else>信息按钮</el-button>
  </section>
</template>

<script>
export default {
  name: "button",
  props: {
    data: {
      default: {},
      type: Object
    },
    tempParams: {
      default: () => (
        {
          display: 'flex',
          flexGrow: 1,
          height: '40px',
        }
      ),
      type: Object
    }
  },
  data() {
    return {
    }
  }
}
</script>
<style scoped>
.button_box {
  display: flex;
  flex-grow: 1;
  height: 40px;
}
</style>