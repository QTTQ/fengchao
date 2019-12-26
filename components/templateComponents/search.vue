<template>
  <section class="search_box">
    <el-input v-model="input" placeholder="请输入内容" v-if="tempTypeId==1"></el-input>
    <el-input v-model="input" placeholder="请输入内容" v-else-if="tempTypeId==2"></el-input>
    <el-input
      class="aaaa"
      placeholder="请选择日期"
      suffix-icon="el-icon-date"
      v-else-if="tempTypeId==3"
      v-model="input"
    ></el-input>
    <el-input v-model="input" placeholder="请输入内容" v-else></el-input>
  </section>
</template>

<script>
export default {
  name: "search",
  props: {
    data: {
      default: {},
      type: Object
    },
    tempParams: {
      default: () => (
        {
          display: 'flex',
          flexGrow: 4,
          height: '40px',
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
      input: '',
      // tempParams: {
      //   display: 'flex',
      //   flexGrow: 4,
      //   height: '40px',
      // }
    }
  }
}
</script>
<style scoped>
.search_box {
  background: yellowgreen;
  display: flex;
  flex-grow: 4;
  height: 40px;
}
</style>