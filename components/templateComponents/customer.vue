<template>
  <section class="customer_box">
    <el-tag type="success" v-show="tempTypeId==1">按1111钮</el-tag>
    <el-tag type="success" v-show="tempTypeId==2">按2222钮</el-tag>
    <el-tag type="success" v-show="tempTypeId==3">按3333钮</el-tag>
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
    },
    outTempParams: {
      default: () => (
        [
          {},
          {},
          {},
          {},
          {}
        ]
      ),
      type: Array
    },
    tempComponents: {
      default: () => (
        [{
          name: "模板1",
          id: 1,
          imgUrl: ""
        },
        {
          name: "模板2",
          id: 2,
          imgUrl: ""
        },
        {
          name: "模板3",
          id: 3,
          imgUrl: ""
        }]
      ),
      type: Array
    },
    aaaa: {
      type: Number,
      default: 1
    }
  },
  computed: {
    tempTypeId() {
      let isUseStyle = this.tempComponents.find(v => v.isUseStyle == true)
      if (!!isUseStyle) {
        return isUseStyle.id
      } else {
        return 1
      }
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