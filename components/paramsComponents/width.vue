<template>
  <!-- <div @click="aaaaa()">aaaaaaa</div> -->
  <div>
    {{paramsData.name}}
    <input @input="aaaaa" />
  </div>
</template>
<script>
export default {
  name: "width",
  props: {
    paramsData: {
      default: {},
      type: Object
    }
  },
  methods: {
    aaaaa(e) {
      this.paramsData.value = e.target.value
      this.$emit("changeTempParamsFn_", this.paramsData)
    }
  }
}
</script>

<style lang="less" scoped>
</style>
