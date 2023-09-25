import Vue from 'vue'
var Decode = {
	install(Vue){
		Vue.prototype.$Decode={
			DecodeBase64:function(val) {
				return val;
			}
		};
	}
}
Vue.use(Decode);