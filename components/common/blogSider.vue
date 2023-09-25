<template>
  <div class="siderContainer">
    <el-popover 
	 placement="right"
	 width="200"
	 trigger="click"
	 content="ssss"
	 >
	  <div v-for="item in blogTOC" :key="item.index">
        <div :class="'Item'+((selectedBlogTOCId&&selectedBlogTOCId==item.index)?' Selected':'')" :style="{marginLeft:(0.5*item.textLevel)+'em'}" @click="itemClick(item)">
      	  <span @click="url(item.text)">
      	    <a href="javascript:void(0)">{{item.text}}</a>
      	  </span>
        </div>  	
	  </div>
	  <el-button slot="reference">目录</el-button>
	</el-popover>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  props: {
  	blogTOC:Array
  },
  computed: {
  	...mapState(['selectedBlogTOCId'])
  },
  methods: {
  	itemClick:function(item) {
		this.$store.commit('changeSelectedBlogTOCId',item.index);
	},
	url(text) {
		console.log(text);
		document.querySelector('#'+text).scrollIntoView(true);
	}	
  }
}	
</script>

<style scoped>
a {
	text-decoration: none;
	color:#333;     /*去掉颜色*/
	outline: none;  /*去掉虚线框*/
}
.siderContainer {
	position: fixed;
	left: 50px;
	bottom: 150px;
}
.Item {
	color:grey;
	font-size: 0.9em;
}
.Item:hover {
	background-color:#F5F7FA;
	cursor: pointer;
}
.Selected {
	background-color:#F5F7FA
}
</style>