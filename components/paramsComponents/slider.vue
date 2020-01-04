<template>
  <div>
    <span class="demonstration">{{paramsData.name}}</span>
    <el-slider v-model="value" @input="listenEventsFn" :max="paramsData.maxValue"></el-slider>
  </div>
</template>
<script>
export default {
  name: "width",//滑块
  props: {
    paramsData: {
      default: () => ({}),
      type: Object
    },
  },
  data() {
    return {
      value: 0
    }
  },
  methods: {
    listenEventsFn(e) {
      if (Object.prototype.toString.call(e) === '[object Object]') {
        this.paramsData.value = e.target.value
      } else {
        this.paramsData.value = e
      }
      this.$emit("changeTempParamsFn_", this.paramsData)
    }
  }
}
</script>

<style lang="less" scoped>
</style>
