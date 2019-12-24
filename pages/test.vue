<template>
  <div>
    <!-- <component :is="item" v-for="(item,index) in items" :key="index"></component> -->
    <component :is="component" :data="dataParams" v-if="component" />
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
  mounted() {
    // this.init()
    let aaa={"aaa":111}
    console.log(Object.values(aaa)[0])
  },
  computed: {
    loader() {
      if (!this.type) {
        return null
      }
      return () => import(`../components/templateComponents//${this.type}`)
    },
  },
  methods: {
    init() {
      if (this.loader != null) {
        this.loader()
          .then(() => {
            this.component = () => this.loader()
          })
          .catch(() => {
            this.component = () => import('../components/templateComponents/default')
          })
      }
    },
    handleAppend() { //动态插入需要显示的组件
    //   var template = '<div><a href="https://codepen.io/bonashen/pen/WMbqrd?editors=1011">go edit =>{{id}}</a></div>';
    //   id++;
    //   this.items.push({ template: template, data: { id } });
    this.type="search"
    this.init()

    }
  }
}
</script>