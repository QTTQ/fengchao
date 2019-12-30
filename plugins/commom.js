import Vue from 'vue'
// var comsys = {
//     install(Vue) {
//         Vue.prototype.comsys = {
//             val: function (val) {
//                 return val
//             }
//         };
//     }
// }
const obj = {
    install(Vue, options) {
        Vue.prototype.aaaa = function(e){
            console.log(e, "s------------handleDragOver--------------")
        }
    }
}
Vue.use(obj);