<template>
  <section class="button_box" :style="!!tempParams.button_box?tempParams.button_box.className:{}">
    <el-button class="aaaa" v-if="tempTypeId==1">
      <input
        class="input"
        :style="!!tempParams.input?tempParams.input.className:{}"
        :value="!!tempParams.input&&!!tempParams.input.vlaueName?tempParams.input.vlaueName.input:0"
      />
      <!-- <input
        class="input"
        :style="!!tempParams&&!!tempParams.input?tempParams.input.className:{}"
        :value="!!tempParams&&!!tempParams.input&&!!tempParams.input.vlaueName?tempParams.input.vlaueName.input:0"
      />-->
      <!-- <input
        class="input"
        :style="changeParamsComputed.input.className"
        :value="changeParamsComputed.input.vlaueName.input"
      />-->
    </el-button>
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
          // input: {
          //   "className": {},
          //   "vlaueName": {}
          // },
          // input1: {
          //   "className": {},
          //   "vlaueName": {}
          // }
        }
      ),
      type: Object
    },
    inTempParams: {
      default: () => (
        {
          input: {
            className: {
              display: 'flex',
              flexGrow: 1,
              height: '40px',
              marginTop: '0',
              marginLeft: "0",
              marginRight: "0",
              marginBottom: "0",
              color: "#ccc"
            },
            valueName: {
              input: 0
            }
          },
        }
      ),
      type: Object
    },
    outTempParams: {
      default: () => (
        [
          {
            name: "模板1",
            id: 1,
            imgUrl: "",
            layerDomName: "input",
            type: [
              {
                name: "宽度",
                layerEle: "width",
                layerTemp: "slider",//滑轮
                layer: "className",//作用在class上判别
                value: "0",
                needPx: true,
                maxValue: 40,
                minValue: 10,
              },
              {
                name: "高度",
                layerEle: "height",
                layerTemp: "slider",//滑轮
                layer: "className",//作用在class上判别
                value: "0",
                needPx: true,
                maxValue: 10,
                minValue: 0,
              },
              {
                name: "input值",
                layerEle: "input",
                layerTemp: "slider",//滑轮
                layer: "valueName",//作用在value上判别
                value: "0"
              },
            ]
          },
          {
            name: "外边框",
            id: 1,
            imgUrl: "",
            layerDomName: "button_box",
            type: [
              {
                name: "背景颜色",
                layerEle: "background",
                layerTemp: "colorPicker",//滑轮
                layer: "className",//作用在class上
                value: "#ccc",
                needPx: false
              },]
          },
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
  },
  // watch: {
  //   tempParams: {
  //     handler(val, oldVal) {
  //       if (val.input != undefined) {
  //         this.styleObj = {...val.input}
  //       console.log(this.styleObj, val, oldVal, "ooowatchwatchwatchwatchwatchwatchoooo")
  //       }
  //     },
  //     deep: true
  //   }
  // },
  computed: {
    tempTypeId() {
      let isUseStyle = this.tempComponents.find(v => v.isUseStyle == true)
      if (!!isUseStyle) {
        return isUseStyle.id
      } else {
        return 1
      }
    },
    // changeParamsComputed() {
    //   if (Object.keys(this.tempParams).length > 0) {
    //     this.changeParams = { ...this.inTempParams, ...this.tempParams }
    //   } else {
    //     this.changeParams = { ...this.inTempParams }
    //   }
    //   console.log(this.changeParams, this.tempParams, "iiiiiiiiiiiiiii-----------this.changeParams")
    //   return this.changeParams
    // }
  },
  mounted() {
  },
  methods: {
  },
  data() {
    return {
      styleObj: {},
      changeParams: {}
    }
  }
}
</script>
<style lang="less" scoped>
.button_box {
  display: flex;
  flex-grow: 1;
  height: 40px;
  .aaaa {
    background: red;
  }
}
</style>