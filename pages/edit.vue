<template>
  <section>
    <!-- @mouseout="isShowDeleteFn(null,null)" -->
    <div class="drag_box">
      <div class="select_temp_box">
        <div class="select_temp_box1">
          <div
            class="select_temp search"
            v-for="(item,index) in selectTempNum"
            :key="index"
            @mousedown.stop="move($event,'select_temp search','search_box')"
          >搜索框</div>
        </div>
        <div class="select_temp_box1">
          <div
            class="select_temp customer"
            v-for="(item,index) in selectTempNum"
            :key="index"
            @mousedown.stop="move($event,'select_temp customer','customer_box')"
          >按钮</div>
        </div>

        <div class="select_temp_box1">
          <div
            class="select_temp button"
            v-for="(item,index) in selectTempNum"
            :key="index"
            @mousedown.stop="move($event,'select_temp button','button_box')"
          >客服</div>
        </div>
      </div>
      <div class="show_container" @mouseout="cleanSelectContainerNumFn">
        <div class="dom_container_box">
          <div
            class="dom_container"
            @mousemove="selectContainerFn(index)"
            v-for="(item0,index) in domContainerId"
            :key="index"
            :style="{height:tempContainerHObj[index+1]+'px'}"
          >
            <div
              v-for="(item,index1) in tempItemsObj[index+1]"
              :key="index1"
              v-show="Object.values(item)[0]"
              class="domc_com_box"
              @click.stop="selectTempStyleFn(index+1,index1,0)"
              @mouseenter="isShowDeleteFn(index+1,index1)"
            >
              <!-- :style="tempParamsObj[index+1]?tempParamsObj[index+1][index1]:{}" -->
              <component
                class="domc_com"
                :is="Object.values(item)[0]"
                :data="dataParams"
                :tempComponents="!!tempComponents[index+1]?tempComponents[index+1][index1]:undefined"
                :ref="Object.keys(item)[0]"
                :tempParams="!!tempParamsObj[index+1]?tempParamsObj[index+1][index1]:undefined"
                @click="componentFocusFn1"
              />
              <transition name="fade_delete">
                <div
                  class="domc_delete"
                  @click="deleteTempFn(index+1,index1)"
                  v-show="isShowDelete==(index+1+index1)"
                >删除</div>
              </transition>
            </div>
            <div
              class="domc_temp"
              v-if="!tempItemsObj[index+1]||tempItemsObj[index+1].length==0"
            >请放置组件</div>
          </div>
        </div>
        <div class="select_container_box">
          <div class="add_container" @click="createContainerFn">添加容器</div>
          <div class="confirm_container" @click="confirmFn">确认</div>
        </div>
      </div>
      <div class="params_container">
        <component :is="item" v-for="(item,index) in paramsCompArr" :data="dataParams" :key="index"></component>
        <div
          v-if="!!tempComponents&&!!tempComponents[tempContainerId]&&!!tempComponents[tempContainerId][selectTempIndex]"
        >
          <div
            v-for="(item,index) in tempComponents[tempContainerId][selectTempIndex]"
            :key="index"
            @click="selectTempStyleFn(tempContainerId,selectTempIndex,index)"
          >模板名：{{item.name}}</div>
        </div>
        <div
          v-if="!!outTempParamsObj&&!!outTempParamsObj[tempContainerId]&&!!outTempParamsObj[tempContainerId][selectTempIndex]"
        >
          <div
            v-for="(item,index) in outTempParamsObj[tempContainerId][selectTempIndex]"
            :key="index"
          >
            <!-- @click="changeTempParamsFn(tempContainerId,selectTempIndex,index)" -->
            <div>模板：{{item.name}}</div>
            <div v-for="(item1,index1) in item.type" :key="index1">
              <div>{{item1.name}}</div>
              <input
                v-model="item1.value"
                @input="changeTempParamsFn(tempContainerId,selectTempIndex,item.layerDomName,index,item1)"
              />
              <!-- <input :value="item1.value" @change="changeTempParamsFn($event)" /> -->
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- <div class="container">
      <transition>
        <div
          class="block animated"
          :style="{top:this.positionY,left:this.positionX,gridArea:'main2'}"
          @mousedown="move"
          ref="block"
        >
          {{positionX}}
          {{positionY}}
        </div>
      </transition>
    </div>-->
  </section>
</template>

<script>
import axios from "axios"
export default {
  name: "edit",
  data() {
    return {
      positionX: 0,
      positionY: 0,
      isHide: "",
      selectTempNum: 2,
      domContainerId: 0,
      tempFoucsContainerId: null,//左侧组件移动时选的的容器id
      domContainerOldId: 0,
      // selectContainerNum: null,
      isDraging: false,
      component: "",
      tempItemsObj: {},
      dataParams: { tempTypeId: 3 },
      tempComponent: null,
      tempComponentObj: {},// {"1":["search","customer"]} 结构
      tempContainerHObj: {},
      tempParamsObj: {},
      outTempParamsObj: {},
      tempComponents: {},//模板容器
      tempContainerId: null,
      selectTempIndex: 0,
      isShowDelete: null,
      timer: null,
      paramsCompArr: []
    }
  },
  computed: {
    loader() {
      if (!this.tempComponent) {
        return null
      }
      return () => import(`../components/templateComponents/${this.tempComponent}`)
    },
  },
  methods: {
    deleteTempFn(containerId, tempIndex) {
      //tempItemsObj 组件函数
      this.tempItemsObj[containerId].splice(tempIndex, 1)
      //tempComponentObj 结构
      this.tempComponentObj[containerId].splice(tempIndex, 1)
      delete this.tempComponents[containerId][tempIndex]
      //tempParamsObj 参数结构
      delete this.tempParamsObj[containerId][tempIndex]
      //outTempParamsObj 组件参数结构
      delete this.outTempParamsObj[containerId][tempIndex]

      if (this.tempItemsObj[containerId].length == 0) {
        delete this.tempContainerHObj[this.domContainerId]
        delete this.tempComponents[containerId]
        delete this.tempItemsObj[containerId]
        delete this.tempComponentObj[containerId]
        delete this.tempParamsObj[containerId]
        delete this.outTempParamsObj[containerId]
        this.domContainerId = this.domContainerId - 1
      }
      console.log(this.tempComponents, "kkkkkkkkkkkkkkkkkkkkkkk")
      this.tempItemsObj = { ...this.tempItemsObj }
      this.tempParamsObj = { ...this.tempParamsObj }
      this.tempComponents = { ...this.tempComponents }
      this.outTempParamsObj = { ...this.outTempParamsObj }
      this.tempComponentObj = { ...this.tempComponentObj }
      // })
    },
    isShowDeleteFn(containerId, tempIndex) {
      if (this.timer != null) {
        clearTimeout(this.timer)
        this.timer = null
      }
      this.timer = setTimeout(() => {
        console.log(containerId, tempIndex, 'isShowDeleteFn--->>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>')
        if (containerId == null) {
          this.isShowDelete = null
          return
        }
        this.isShowDelete = containerId + tempIndex
      }, 500)
    },
    move(e, allClass, cla) {
      this.isDraging = true
      let oDiv = e.target;      //获取点击的目标元素
      let gDiv = e.path[1];     //获取点击元素的父级元素
      let disX = e.clientX - 0;
      let disY = e.clientY - 0;
      document.onmousemove = (e) => {
        let left = e.clientX - disX;
        let top = e.clientY - disY;
        oDiv.$clientY = e.clientY
        switch (oDiv.style.gridArea) {
          case "head1 / head1 / head1 / head1": this.rangeOfHead1(left, top, oDiv); break;
          case "head2 / head2 / head2 / head2": this.rangeOfHead2(left, top, oDiv); break;
          case "head3 / head3 / head3 / head3": this.rangeOfHead3(left, top, oDiv); break;
          case "main1 / main1 / main1 / main1": this.rangeOfMain1(left, top, oDiv); break;
          case "main2 / main2 / main2 / main2": this.rangeOfMain2(left, top, oDiv); break;
          case "main3 / main3 / main3 / main3": this.rangeOfMain3(left, top, oDiv); break;
          case "footer1 / footer1 / footer1 / footer1": this.rangeOfFooter1(left, top, oDiv); break;
          case "footer2 / footer2 / footer2 / footer2": this.rangeOfFooter2(left, top, oDiv); break;
          case "footer3 / footer3 / footer3 / footer3": this.rangeOfFooter3(left, top, oDiv); break;
        }
        this.rangeOfHead0(left, top, oDiv)
      };
      document.onmouseup = (e) => {
        // if (e.clientY - gDiv.offsetTop < 100 && e.clientX - gDiv.offsetLeft < 100) {
        //   this.changeBlock("head1", oDiv);
        // } else if (e.clientY - gDiv.offsetTop > 100 && e.clientX - gDiv.offsetLeft < 100 && e.clientY - gDiv.offsetTop < 200) {
        //   this.changeBlock("main1", oDiv);
        // } else if (e.clientY - gDiv.offsetTop > 200 && e.clientX - gDiv.offsetLeft < 100) {
        //   this.changeBlock("footer1", oDiv);
        // } else if (e.clientY - gDiv.offsetTop < 100 && e.clientX - gDiv.offsetLeft > 100 && e.clientX - gDiv.offsetLeft < 200) {
        //   this.changeBlock("head2", oDiv);
        // } else if (e.clientY - gDiv.offsetTop < 100 && e.clientX - gDiv.offsetLeft > 200) {
        //   this.changeBlock("head3", oDiv);
        // } else if (e.clientY - gDiv.offsetTop > 100 && e.clientX - gDiv.offsetLeft > 200 && e.clientY - gDiv.offsetTop < 200) {
        //   this.changeBlock("main3", oDiv);
        // } else if (e.clientY - gDiv.offsetTop > 200 && e.clientX - gDiv.offsetLeft > 200) {
        //   this.changeBlock("footer3", oDiv);
        // } else if (e.clientY - gDiv.offsetTop > 200 && e.clientX - gDiv.offsetLeft > 100 && e.clientX - gDiv.offsetLeft < 200) {
        //   this.changeBlock("footer2", oDiv);
        // } else {
        //   this.changeBlock("main2", oDiv);
        // }
        document.onmousemove = null;
        document.onmousedown = null;
        document.onmouseup = null;
        oDiv.className = "block animated wobble";
        if (!!cla) {
          if (this.hadRepeateFn(cla.split("_")[0])) {
            setTimeout(() => {
              this.createTempFn(cla.split("_")[0])
            }, 100)
          } else {
            if (this.isDraging && this.domContainerId != 0) {
              alert("此容器已经存在该组件")
            }
          }
        }
        setTimeout(() => {
          this.cleanDom(oDiv, cla)
          oDiv.className = "block animated";
          this.isDraging = false
        }, 300);
      };
    },
    cleanSelectContainerNumFn() {
      if (this.isDraging) {
        // this.selectContainerNum = null;
      }
    },
    hadRepeateFn(tempName) {
      if (this.tempFoucsContainerId != null) {
        this.tempContainerId = this.tempFoucsContainerId
      } else {
        this.tempContainerId = this.domContainerId
      }
      if (this.tempComponentObj[this.tempContainerId] == undefined) {
        this.tempComponentObj[this.tempContainerId] = []
      }
      if (this.tempComponentObj[this.tempContainerId].includes(tempName)) return false;
      this.tempComponentObj[this.tempContainerId].push(tempName)
      return true;
    },
    selectContainerFn(index) {
      // if (this.isDraging) {
      //   console.log(this.isDraging, "111111111111111111111")
      //   this.selectContainerNum = index;
      //   this.domContainerId = index + 1;
      // }
    },
    async createTempFn(tempName) {
      this.tempComponent = tempName;
      if (this.loader == null || !this.isDraging) return;
      // this.loader()
      //   .then(() => {
      if (!this.tempItemsObj[this.domContainerId]) {
        this.tempItemsObj[this.domContainerId] = []
      }
      if (!this.isDraging) return;
      let tempNameObj = {}
      tempNameObj[tempName] = async () => await this.loader()
      if (this.tempFoucsContainerId != null) {
        this.tempContainerId = this.tempFoucsContainerId
      } else {
        this.tempContainerId = this.domContainerId
      }
      this.tempFoucsContainerId = null
      this.tempItemsObj[this.tempContainerId].push(tempNameObj)
      this.tempItemsObj = { ...this.tempItemsObj }
      let tempH = 0
      let tempParamsObj = {}
      let outTempParamsObj = {}

      let tempComponents = {}
      setTimeout(async () => {
        if (!this.tempItemsObj[this.domContainerId]) return;
        this.tempItemsObj[this.tempContainerId].map((v, i) => {
          if (!!this.$refs[Object.keys(v)] && !!this.$refs[Object.keys(v)][0] && !!this.$refs[Object.keys(v)][0].$el) {
            this.selectTempIndex = i
            tempParamsObj[i] = this.$refs[Object.keys(v)][0].tempParams  //传回参数
            tempComponents[i] = this.$refs[Object.keys(v)][0].tempComponents //模板
            outTempParamsObj[i] = this.$refs[Object.keys(v)][0].outTempParams //可调节参数

            if (this.$refs[Object.keys(v)][0].$el.clientHeight > tempH) {
              tempH = this.$refs[Object.keys(v)][0].$el.clientHeight
            }
          }
        })
        this.tempParamsObj[this.tempContainerId] = tempParamsObj
        this.tempParamsObj = { ...this.tempParamsObj }
        this.tempComponents[this.tempContainerId] = tempComponents
        this.tempComponents = { ...this.tempComponents }

        this.outTempParamsObj[this.tempContainerId] = outTempParamsObj
        this.outTempParamsObj = { ...this.outTempParamsObj }
        this.tempContainerHObj[this.tempContainerId] = tempH
        this.tempContainerHObj = { ...this.tempContainerHObj }
        console.log(outTempParamsObj[this.selectTempIndex], "sssssssssddddsadasdadadsas")
        this.initComponentsFn(await this.handleAppendFn(outTempParamsObj[this.selectTempIndex]), "paramsComponents")
        console.log(this.paramsCompArr, "ssss111111111111111sssssssss")
      }, 400)
      // })
      // .catch((e) => {
      //   console.log(e, "errrrrrrrrr")
      //   this.component = () => import('../components/templateComponents/default.vue')
      // })
    },
    componentFocusFn1() {
      console.log("ssssssssssss-----点击组件---透过父容器了！！！！！！！！！！！")
    },
    changeTempParamsFn(tempContainerId, selectTempIndex, layerDomName, index, param) {
      if (this.tempParamsObj[tempContainerId][selectTempIndex] == undefined) {
        this.tempParamsObj[tempContainerId][selectTempIndex][layerDomName] = {}
      }
      let obj = this.tempParamsObj[tempContainerId][selectTempIndex][layerDomName]
      if (obj == undefined) {
        obj = {}
        obj.vlaueName = {}
        obj.className = {}
      }
      if (param.layer == "className") {
        let paramVal = ""
        paramVal = param.value
        if (param.needPx) {
          paramVal = param.value + "rem"
        }
        obj.className = { ...obj.className, [param.layerEle]: paramVal }
      } else {
        obj.vlaueName = { ...obj.vlaueName, [param.layerEle]: param.value }
      }
      // this.tempParamsObj[tempContainerId][selectTempIndex][layerDomName] = { ...this.tempParamsObj[tempContainerId][selectTempIndex].layerDomName, ...obj }
      // // let newParamsObj=this.tempParamsObj[tempContainerId][selectTempIndex][layerDomName]
      // let newParamsObj1 = { ...this.tempParamsObj[tempContainerId][selectTempIndex] }
      // this.tempParamsObj[tempContainerId][selectTempIndex] = {}
      // console.log(param.value, newParamsObj1, "kkkkkkkkkkkkkkkkkkkkkkkkkkk")
      // this.$nextTick(() => {
      //   this.tempParamsObj[tempContainerId][selectTempIndex] = newParamsObj1
      // })
      this.tempParamsObj[tempContainerId][selectTempIndex][layerDomName] = { ...this.tempParamsObj[tempContainerId][selectTempIndex].layerDomName, ...obj }
      let newParamsObj1 = { ...this.tempParamsObj[tempContainerId][selectTempIndex] }
      this.tempParamsObj[tempContainerId][selectTempIndex] = {}
      this.$nextTick(() => {
        this.tempParamsObj[tempContainerId][selectTempIndex] = newParamsObj1
      })
    },
    cleanDom(oDiv, cla) {
      if (oDiv.parentNode == null) return;
      this.selectTempNum = this.selectTempNum - 1
      oDiv.parentNode.removeChild(oDiv); // 在父节点插入克隆的节点 
      this.$nextTick(() => {
        this.selectTempNum = this.selectTempNum + 1
      })
    },
    copyDiv(allCla, cla, oDiv) {
      let aaaa = new Date()
      let sourceNode = document.querySelector(`.${cla}`); // 获得被克隆的节点对象 
      let clonedNode = sourceNode.cloneNode(true); // 克隆节点 
      clonedNode.childNodes[0].setAttribute("class", `${allCla}`); // 修改一下id 值，避免id 重复 
      sourceNode.appendChild(clonedNode); // 在父节点插入克隆的节点 
    },
    createContainerFn() {
      this.domContainerId += 1
      if (!this.tempItemsObj[this.domContainerId]) {
        this.tempItemsObj[this.domContainerId] = []
      }
      if (this.tempContainerHObj[this.domContainerId] == undefined) {
        this.tempContainerHObj[this.domContainerId] = 200
      }
    },
    createDom(allCla, cla, domName) {
      let myDom = document.createElement(domName);
      myDom.setAttribute("class", `${allCla}`)
      let sourceNode = document.querySelector(`.${cla}`); // 获得被克隆的节点对象 
      sourceNode.appendChild(myDom)
      document.body.appendChild(sourceNode)
    },
    rangeOfHead0(x, y, oDiv) {
      oDiv.style.left = x + 'px';
      oDiv.style.top = y + 'px';
      this.positionX = x;
      this.positionY = y;
      this.getOverContainerIdFn(x, y, oDiv)
    },
    getOverContainerIdFn(x, y, oDiv) {
      let tempContainer = document.querySelector(".show_container")
      let domContainerArr = document.querySelectorAll(".dom_container")
      let tempX = tempContainer.getBoundingClientRect().left
      let tempItemsArr = Object.keys(this.tempItemsObj)
      if (oDiv.clientWidth + x > tempX && tempItemsArr.length > 0) {
        let tempTop = 0
        let yy = oDiv.$clientY
        tempItemsArr.map((v, i) => {
          if (domContainerArr[0].clientHeight - yy > 0) {
            this.tempFoucsContainerId = 1
          } else if (yy - tempTop > 0 && (tempTop + domContainerArr[i].clientHeight) - yy > 0) {
            this.tempFoucsContainerId = v
          }
          tempTop = tempTop + domContainerArr[i].clientHeight
        })
      }
    },
    //选择模板样式
    selectTempStyleFn(containerId, tempIndex, index) {
      if (this.tempComponents[containerId] == undefined || this.tempComponents[containerId][tempIndex] == undefined) return;
      this.selectTempIndex = tempIndex
      this.tempContainerId = containerId
      let tempIndexArr = [...this.tempComponents[containerId][tempIndex]]
      tempIndexArr.map((v, i) => {
        v.isUseStyle = false
        if (i == index) {
          v.isUseStyle = true
        }
      })
      this.tempComponents[containerId][tempIndex] = tempIndexArr
      console.log(this.paramsCompArr, "sssssssssssss")
      // this.tempComponents[containerId][tempIndex].map((v, i) => {
      //   v.isUseStyle = false
      //   if (i == index) {
      //     v.isUseStyle = true
      //   }
      // })
      // let tempObj = { ...this.tempComponents }
      // this.tempComponents = {}
      // this.$nextTick(() => {
      //   this.tempComponents = { ...tempObj }
      // })
    },
    confirmFn() {
      axios({
        method: 'post',
        url: '/createHomeDataParams',
        data: {
          17301: {
            home: {
              "levelStruct": this.tempComponentObj,
              "styleParamsDara": this.tempParamsObj
            }
          }
        }
      }).then(v => {
        console.log(v, "sssssssssssssss")
      });
    },
    rangeOfHead1(x, y, oDiv) {
      if (x >= 200) {
        x = 200;
      } else if (x <= 0) {
        x = 0;
      }
      if (y >= 200) {
        y = 200;
      } else if (y <= 0) {
        y = 0;
      }
      oDiv.style.left = x + 'px';
      oDiv.style.top = y + 'px';
      this.positionX = x;
      this.positionY = y;

    },
    rangeOfHead2(x, y, oDiv) {
      if (x >= 100) {
        x = 100;
      } else if (x <= -100) {
        x = -100;
      }
      if (y >= 200) {
        y = 200;
      } else if (y <= 0) {
        y = 0;
      }
      oDiv.style.left = x + 'px';
      oDiv.style.top = y + 'px';

      this.positionX = x;
      this.positionY = y;

    },
    rangeOfHead3(x, y, oDiv) {
      if (x >= 0) {
        x = 0;
      } else if (x <= -200) {
        x = -200;
      }
      if (y >= 200) {
        y = 200;
      } else if (y <= 0) {
        y = 0;
      }
      oDiv.style.left = x + 'px';
      oDiv.style.top = y + 'px';

      this.positionX = x;
      this.positionY = y;
    },
    rangeOfMain3(x, y, oDiv) {
      if (x >= 0) {
        x = 0;
      } else if (x <= -200) {
        x = -200;
      }
      if (y >= 100) {
        y = 100;
      } else if (y <= -100) {
        y = -100;
      }
      oDiv.style.left = x + 'px';
      oDiv.style.top = y + 'px';

      this.positionX = x;
      this.positionY = y;

    },
    rangeOfFooter3(x, y, oDiv) {
      if (x >= 0) {
        x = 0;
      } else if (x <= -200) {
        x = -200;
      }
      if (y >= 0) {
        y = 0;
      } else if (y <= -200) {
        y = -200;
      }
      oDiv.style.left = x + 'px';
      oDiv.style.top = y + 'px';

      this.positionX = x;
      this.positionY = y;

    },
    rangeOfFooter2(x, y, oDiv) {
      if (x >= 100) {
        x = 100;
      } else if (x <= -100) {
        x = -100;
      }
      if (y >= 0) {
        y = 0;
      } else if (y <= -200) {
        y = -200;
      }
      oDiv.style.left = x + 'px';
      oDiv.style.top = y + 'px';

      this.positionX = x;
      this.positionY = y;

    },
    rangeOfFooter1(x, y, oDiv) {
      if (x >= 200) {
        x = 200;
      } else if (x <= 0) {
        x = 0;
      }
      if (y >= 0) {
        y = 0;
      } else if (y <= -200) {
        y = -200;
      }
      oDiv.style.left = x + 'px';
      oDiv.style.top = y + 'px';

      this.positionX = x;
      this.positionY = y;

    },
    rangeOfMain1(x, y, oDiv) {
      if (x >= 200) {
        x = 200;
      } else if (x <= 0) {
        x = 0;
      }
      if (y >= 100) {
        y = 100;
      } else if (y <= -100) {
        y = -100;
      }
      oDiv.style.left = x + 'px';
      oDiv.style.top = y + 'px';

      this.positionX = x;
      this.positionY = y;

    },
    rangeOfMain2(x, y, oDiv) {
      if (x >= 100) {
        x = 100;
      } else if (x <= -100) {
        x = -100;
      }
      if (y >= 100) {
        y = 100;
      } else if (y <= -100) {
        y = -100;
      }
      oDiv.style.left = x + 'px';
      oDiv.style.top = y + 'px';

      this.positionX = x;
      this.positionY = y;

    },
    changeBlock(blockName, oDiv) {
      this.positionX = 0;
      this.positionY = 0;
      oDiv.style.gridArea = blockName;
    }
  }
}
</script>
<style lang="less" scoped>
.fade_delete-enter-active,
.fade_delete-leave-active {
  transition: opacity 0.5s;
}
.fade_delete-enter, .fade_delete-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
.container {
  position: relative;
  display: grid;
  width: 300px;
  height: 300px;
  grid-template-columns: 100px 100px 100px;
  grid-template-rows: 100px 100px 100px;
  grid-template-areas: 'head1 head2 head3' 'main1 main2 main3' 'footer1 footer2 footer3';
  /*grid-template-areas: none;*/
  border: 1px solid #000;
  margin: 50px auto;
}

.block {
  position: absolute;
  width: 100px;
  height: 100px;
  display: flex;
  justify-content: center;
  justify-items: center;
  align-items: center;
  align-content: center;
  user-select: none;
  background: olivedrab;
}
.drag_box {
  display: flex;
  justify-content: space-around;
}

.show_container {
  width: 400px;
  height: 800px;
  display: inline-block;
  border: 2px solid red;
}

.select_container_box {
  min-height: 100px;
  background: #cccccc;
  border: 1px solid red;
  display: flex;
  justify-content: space-around;
}
.domc_temp {
  min-height: 100px;
  background: #cccccc;
  border: 1px solid red;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
}
.add_container,
.confirm_container {
  min-height: 100px;
  background: #cccccc;
  border: 1px solid red;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
}

.select_temp_box {
  width: 400px;
  height: 800px;
  display: inline-block;
  border: 2px solid red;
}

.select_temp {
  display: flex;
  height: 20px;
  width: 100px;
  height: 100px;
  display: flex;
  justify-content: center;
  justify-items: center;
  align-items: center;
  align-content: center;
  user-select: none;
  background: olivedrab;
  margin-top: 10px;
  z-index: 11111111111111;
}

.search_box {
  position: relative;
  height: 150px;
  background: red;
  width: 10px;
}

.select_temp_box1 {
  position: relative;
  height: 150px;
  background: yellow;
  width: 10px;
}

.select_temp,
.select_temp {
  position: absolute;
}

.dom_container_box {
  .dom_container {
    display: flex;
    & > .domc_com_box > * {
      cursor: crosshair;
    }
    .domc_com_box {
      display: flex;
      flex-direction: row;
      background: red;
      flex-grow: 1;
      position: relative;
      .domc_com {
        /* display: flex; */
        flex-direction: row;
        /* position: absolute; */
        background: green;
        z-index: 1;
      }
      .domc_delete {
        position: absolute;
        width: 50px;
        height: 20px;
        top: 0;
        right: -20px;
        background: blueviolet;
        border: 1px solid red;
        z-index: 11111111111111;
        display: flex;
        justify-content: center;
      }
    }
  }
}

/*  */
.params_container {
  border: 1px solid red;
  width: 300px;
}

.is_hide {
  display: none;
}
</style>