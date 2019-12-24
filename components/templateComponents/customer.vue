<template>
  <section class="customer_box">
    <el-tag type="success">客服</el-tag>
  </section>
</template>

<script>
export default {
  name: "customer",
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
.customer_box {
  display: flex;
  flex-grow: 1;
  height: 40px;
}
</style>