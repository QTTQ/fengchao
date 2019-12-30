<template>
  <div>
    <component :is="item" v-for="(item,index) in paramsCompArr" :data="dataParams" :key="index"></component>
    <!-- <button v-on:click="handleAppendFn">append</button> -->
    <div>
      {{aaaa(1)}}
      11111
    </div>
  </div>
</template>
<script>
export default {
  name: 'test',
  data() {
    return {
      paramsCompArr: [],
      type: null,
      dataParams: {}
    }
  },
  async mounted() {
    console.log(this, "......................")
    let aaa = ["search", "button", "customer"]
    this.initComponentsFn(await this.handleAppendFn(aaa))
  },
  methods: {
    // async initComponentsFn(tempItems) {
    //   tempItems.map(v => {
    //     try {
    //       this.paramsCompArr.push(() => v());
    //     } catch (error) {
    //       this.paramsCompArr.push(() => import('../components/templateComponents/default'));
    //     }
    //   })
    // },
    // async handleAppendFn(tempClasNames) { //动态插入需要显示的组件
    //   let tempItems = []
    //   tempClasNames.map(v => {
    //     tempItems.push(() => import(`../components/templateComponents/${v}`))
    //   })
    //   return tempItems
    // }
  }
}
</script>