<template>
  <section class="button_box">
    <el-button v-if="tempTypeId==1">默认按钮</el-button>
    <el-button type="primary" v-else-if="tempTypeId==2">主要按钮</el-button>
    <el-button type="success" v-else-if="tempTypeId==3">成功按钮</el-button>
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
          marginTop: '0',
          marginLeft: "0",
          marginRight: "0",
          marginBottom: "0",
          color: "#ccc"
        }
      ),
      type: Object
    },
    tempComponents: {
      default: () => (
        [{
          name: "警告按钮",
          id: 1,
          imgUrl: ""
        },
        {
          name: "警告按钮",
          id: 2,
          imgUrl: ""
        },
        {
          name: "警告按钮",
          id: 3,
          imgUrl: ""
        }]
      ),
      type: Array
    },
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
.button_box {
  display: flex;
  flex-grow: 1;
  height: 40px;
}
</style>