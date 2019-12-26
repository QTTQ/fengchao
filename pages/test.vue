<template>
  <div>
    <component :is="item" v-for="(item,index) in items" :data="dataParams" :key="index"></component>
    <!-- <component :is="component" :data="dataParams" v-if="component" /> -->
    <button v-on:click="handleAppend">append</button>
  </div>
</template>
<script>
export default {
  name: 'test',
  data() {
    return {
      items: [],
      type: null,
      component: null,
      dataParams: {}
    }
  },
  async mounted() {
    let aaa = ["search", "button", "customer"]
    this.init(await this.handleAppend(aaa))
  },
  methods: {
    async init(tempItems) {
      tempItems.map(v => {
        try {
          this.items.push(() => v());
        } catch (error) {
          this.items.push(() => import('../components/templateComponents/default'));
        }
      })

    },
    async handleAppend(tempClasNames) { //动态插入需要显示的组件
      let tempItems = []
      tempClasNames.map(v => {
        tempItems.push(() => import(`../components/templateComponents/${v}`))
      })
      return tempItems
    }
  }
}
</script>