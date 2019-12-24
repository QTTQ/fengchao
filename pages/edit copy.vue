<template>
  <section>
    <div class="drag_box">
      <div class="select_temp_box">
        <div class="search_box">
          <div
            class="select_temp search"
            v-for="(item,index) in selectTempNum"
            :key="index"
            @mousedown.stop="move($event,'select_temp search','search_box')"
          >搜索框</div>
        </div>
        <div class="customer_box">
          <div
            class="select_temp customer"
            v-for="(item,index) in selectTempNum"
            :key="index"
            @mousedown.stop="move($event,'select_temp customer','customer_box')"
          >客服</div>
        </div>
      </div>
      <div class="show_container" @mouseout="cleanSelectContainerNumFn">
        <div class="dom_container_box">
          <div
            class="dom_container"
            @mouseover="selectContainerFn(index)"
            v-for="(item,index) in domContainerId"
            :key="index"
          >
            <div v-for="(item,index) in tempItemsObj[index+1]" :key="index">
              <component :is="item" :data="dataParams" v-if="item" />
            </div>
            <div class="domc_temp" v-if="!tempItemsObj[index+1]">请放置组件</div>
          </div>
        </div>
        <div class="select_container_box">
          <div class="add_container" @click="createContainerFn">添加容器</div>
          <div class="confirm_container">确认</div>
        </div>
      </div>
      <div class="show_container"></div>
    </div>

    <div class="container">
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
    </div>
  </section>
</template>

<script>
const search = { template: "../components/templateComponents/search.vue" }

export default {
  name: "edit",
  data() {
    return {
      positionX: 0,
      positionY: 0,
      isHide: "",
      selectTempNum: 2,
      domContainerId: 0,
      selectContainerNum: null,
      isDraging: false,
      component: "",
      tempItemsObj: {},
      dataParams: {},
      tempComponent: null
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
    move(e, allClass, cla) {
      this.isDraging = true
      let oDiv = e.target;      //获取点击的目标元素
      let gDiv = e.path[1];     //获取点击元素的父级元素
      let disX = e.clientX - 0;
      let disY = e.clientY - 0;
      if (!this.isDrage) {
        this.isDraging = true
        // this.selectTempNum = this.selectTempNum - 1
      }
      // this.copyDiv(allClass, cla, oDiv)
      // this.createDom(allClass, cla, e.target.nodeName)
      document.onmousemove = (e) => {
        let left = e.clientX - disX;
        let top = e.clientY - disY;
        // switch (oDiv.style.gridArea) {
        //     case "head1 / head1 / head1 / head1": this.rangeOfHead1(left, top, oDiv); break;
        //     case "head2 / head2 / head2 / head2": this.rangeOfHead2(left, top, oDiv); break;
        //     case "head3 / head3 / head3 / head3": this.rangeOfHead3(left, top, oDiv); break;
        //     case "main1 / main1 / main1 / main1": this.rangeOfMain1(left, top, oDiv); break;
        //     case "main2 / main2 / main2 / main2": this.rangeOfMain2(left, top, oDiv); break;
        //     case "main3 / main3 / main3 / main3": this.rangeOfMain3(left, top, oDiv); break;
        //     case "footer1 / footer1 / footer1 / footer1": this.rangeOfFooter1(left, top, oDiv); break;
        //     case "footer2 / footer2 / footer2 / footer2": this.rangeOfFooter2(left, top, oDiv); break;
        //     case "footer3 / footer3 / footer3 / footer3": this.rangeOfFooter3(left, top, oDiv); break;
        // }
        this.rangeOfHead0(left, top, oDiv)
      };
      document.onmouseup = (e) => {
        this.selectTempNum = this.selectTempNum + 1
        this.cleanDom(oDiv, cla)
        if (e.clientY - gDiv.offsetTop < 100 && e.clientX - gDiv.offsetLeft < 100) {
          this.changeBlock("head1", oDiv);
        } else if (e.clientY - gDiv.offsetTop > 100 && e.clientX - gDiv.offsetLeft < 100 && e.clientY - gDiv.offsetTop < 200) {
          this.changeBlock("main1", oDiv);
        } else if (e.clientY - gDiv.offsetTop > 200 && e.clientX - gDiv.offsetLeft < 100) {
          this.changeBlock("footer1", oDiv);
        } else if (e.clientY - gDiv.offsetTop < 100 && e.clientX - gDiv.offsetLeft > 100 && e.clientX - gDiv.offsetLeft < 200) {
          this.changeBlock("head2", oDiv);
        } else if (e.clientY - gDiv.offsetTop < 100 && e.clientX - gDiv.offsetLeft > 200) {
          this.changeBlock("head3", oDiv);
        } else if (e.clientY - gDiv.offsetTop > 100 && e.clientX - gDiv.offsetLeft > 200 && e.clientY - gDiv.offsetTop < 200) {
          this.changeBlock("main3", oDiv);
        } else if (e.clientY - gDiv.offsetTop > 200 && e.clientX - gDiv.offsetLeft > 200) {
          this.changeBlock("footer3", oDiv);
        } else if (e.clientY - gDiv.offsetTop > 200 && e.clientX - gDiv.offsetLeft > 100 && e.clientX - gDiv.offsetLeft < 200) {
          this.changeBlock("footer2", oDiv);
        } else {
          this.changeBlock("main2", oDiv);
        }
        document.onmousemove = null;
        document.onmousedown = null;

        oDiv.className = "block animated wobble";
        this.createTempFn(cla.split("_")[0])
        let removeClass = setTimeout(() => {
          oDiv.className = "block animated";
          this.isDraging = false
        }, 200);

      };
    },
    handleAppend(template) { //动态插入需要显示的组件
      //   this.items.push({ template: template, data: { id } });
      this.items.push({ template: template });
    },
    cleanSelectContainerNumFn() {
      if (this.isDraging) {
        this.selectContainerNum = null;
      }
    },
    createTempFn(tempName) {
      if (this.tempComponent == tempName) return;
      this.tempComponent = tempName;
      this.toggle(tempName)
    },
    selectContainerFn(index) {
      if (this.isDraging) {
        this.selectContainerNum = index;
      }
    },
    toggle(componentName) {
      if (this.loader == null) return;
      this.loader()
        .then(() => {
          //   this.component = () => this.loader()
          if(!this.tempItemsObj[this.domContainerId]){
              this.tempItemsObj[this.domContainerId]=[]
          }
          this.tempItemsObj[this.domContainerId].push(() => this.loader())
          this.tempItemsObj={...this.tempItemsObj}
          console.log(this.tempItemsObj,"2222222222222")
        })
        .catch((e) => {
          console.log(e, "errrrrrrrrr")
          this.component = () => import('../components/templateComponents/default.vue')
        })
    },
    cleanDom(oDiv, cla) {
      //   if (oDiv.parentNode == null) {
      //   }
      // setTimeout(() => {
      //     oDiv.className = "is_hide"
      // }, 300)
      oDiv.parentNode.removeChild(oDiv); // 在父节点插入克隆的节点 
    },
    copyDiv(allCla, cla, oDiv) {
      let aaaa = new Date()
      let sourceNode = document.querySelector(`.${cla}`); // 获得被克隆的节点对象 
      let clonedNode = sourceNode.cloneNode(true); // 克隆节点 
      // clonedNode.setAttribute("class", `${allCla} time${aaaa.getFullYear()}`); // 修改一下id 值，避免id 重复 
      clonedNode.childNodes[0].setAttribute("class", `${allCla}`); // 修改一下id 值，避免id 重复 
      // sourceNode.parentNode.appendChild(clonedNode); // 在父节点插入克隆的节点 
      // sourceNode.parentNode.removeChild(clonedNode); // 在父节点插入克隆的节点 
      sourceNode.appendChild(clonedNode); // 在父节点插入克隆的节点 
    },
    createContainerFn() {
          console.log(this.tempItemsObj,"000000000000000bbbbb")
      this.domContainerId += 1
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
<style scoped>
.container {
  position: relative;
  display: grid;
  width: 300px;
  height: 300px;
  grid-template-columns: 100px 100px 100px;
  grid-template-rows: 100px 100px 100px;
  grid-template-areas: "head1 head2 head3" "main1 main2 main3" "footer1 footer2 footer3";
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
  flex-direction: row;
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
  margin: auto;
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
}

.search_box {
  position: relative;
  height: 150px;
  background: red;
  width: 10px;
}

.customer_box {
  position: relative;
  height: 150px;
  background: yellow;
  width: 10px;
}

.select_temp,
.select_temp {
  position: absolute;
}

.is_hide {
  display: none;
}
</style>