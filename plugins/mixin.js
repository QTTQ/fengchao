import Vue from 'vue'
import { mapState, mapMutations, mapActions, mapGetters } from "vuex";
Vue.mixin({
  computed: {
    ...mapState("comm", ["configData"])
  },
  data() {
    return {
    }
  },
  methods: {
    async initComponentsFn(tempItems) {
      tempItems.map(v => {
        try {
          console.log(v(), "......................")
          this.paramsCompArr.push(() => v());
        } catch (error) {
          this.paramsCompArr.push(() => import('@/components/templateComponents/default'));
        }
      })
    },
    async handleAppendFn(tempClasNames, compFile = "templateComponents") { //动态插入需要显示的组件
      let tempItems = []
      tempClasNames.map(v => {
        // try {
        //   tempItems.push(() => import(`@/components/${compFile}/${v}`))
        // } catch (error) {
          tempItems.push(() => import(`@/components/${compFile}/default`));
        // }
      })
      return tempItems
    }
  }
})
