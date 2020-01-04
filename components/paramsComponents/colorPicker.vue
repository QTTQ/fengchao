<template>
  <div>
    {{paramsData.name}}
    <el-color-picker
      v-model="color"
      @change="listenEventsFn"
      show-alpha
      :predefine="predefineColors"
    ></el-color-picker>
  </div>
</template>
<script>
export default {
  name: "colorPicker",//颜色选择器
  props: {
    paramsData: {
      default: () => ({}),
      type: Object
    },
  },
  data() {
    return {
      color: 'rgba(255, 69, 0, 0.68)',
      predefineColors: [
        '#ff4500',
        '#ff8c00',
        '#ffd700',
        '#90ee90',
        '#00ced1',
        '#1e90ff',
        '#c71585',
        'rgba(255, 69, 0, 0.68)',
        'rgb(255, 120, 0)',
        'hsv(51, 100, 98)',
        'hsva(120, 40, 94, 0.5)',
        'hsl(181, 100%, 37%)',
        'hsla(209, 100%, 56%, 0.73)',
        '#c7158577'
      ]
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
