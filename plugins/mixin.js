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
          this.paramsCompArr.push(() => v());
        } catch (error) {
          this.paramsCompArr.push(() => import('@/components/templateComponents/default'));
        }
      })
    },
    async handleAppendFn(tempClasNames, compFile = "templateComponents") { //动态插入需要显示的组件
      let tempItems = {}
      tempClasNames.map((v, i) => {
        let typeArr = v.type
        if (tempItems[i] == undefined) {
          tempItems[i] = []
        }
        if (Object.prototype.toString.call(typeArr) === '[object Array]') {
          typeArr.map((vv, ii) => {
            tempItems[i].push(() => import(`@/components/${compFile}/${vv.layerTemp}`))
          })
        }
      })
      return tempItems
    }
  }
})
