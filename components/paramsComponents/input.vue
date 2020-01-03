<template>
  <div @click="aaaaa()">aaaaaaa</div>
</template>
<script>
export default {
  name: "input",
  props: {
    // paramsData: {
    //   default: {},
    //   type: Object
    // }
  },
  methods: {
    aaaaa() {
      this.$emit("changeTempParamsFn_", {})
    }
  }
}
</script>

<style lang="less" scoped>
</style>
