<template>
  <div>
    <div v-for="item in noteTOC" :key="item.index">
      <div :class="'Item'+((selectedNoteTOCId&&selectedNoteTOCId==item.index)?' Selected':'')" :style="{marginLeft:(0.5*item.textLevel)+'em'}" @click="itemClick(item)">
      	<span @click="url(item.text)">
      	  <a href="javascript:void(0)">{{item.text}}</a>
      	</span>
      </div>
    </div>
  </div>
</template>
<script>
import Vue from 'vue'
import { mapState } from 'vuex'
export default {
	name:'TOCList',
	computed: {
		...mapState(['noteTOC','selectedNoteTOCId']),
	},
	methods: {
		itemClick:function(item) {
			this.$store.commit('changeSelectedNoteTOCId',item.index);
		},
		url(text) {
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
.ListFileSize {
	background:#4bcffa;
	padding: 0 0.3em;
}
</style>
