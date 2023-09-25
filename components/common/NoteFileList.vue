<template>
  <div>
	<div v-for="item in filesList" :key="item.noteId?'note'+item.noteId:'type'+item.typeId">
	  <div :class="'Item'+((selectedNoteId&&selectedNoteId==item.noteId)?' Selected':'')" @click="ItemClick(item)">
	  	<i :class="item.iconClass"></i>
		<span>{{item.typeName||item.noteName}}</span>
		<span class="ListFileSize" v-if="item.typeSize">{{item.typeSize}}</span>
	  </div>
	  <el-collapse-transition>
	    <div v-show="item.display">
	  	  <NoteFileList style="padding-left:0.5em" :filesList="item.typeChildren"></NoteFileList>
	      <NoteFileList style="padding-left:0.5em" :filesList="item.noteChildren"></NoteFileList>
	    </div>
	   </el-collapse-transition>
	</div>
  </div>
</template>
<script>
import NoteFileList from '~/components/common/NoteFileList.vue'
import Vue from 'vue'
import axios from '~/plugins/axios'
import { mapState } from 'vuex'
export default {
	name:'NoteFileList',
	data() {
	  return {
	  	noteContent:'',
	  	selectId:0   //没有用上 这里用了一个比较好的想法
	  	// ((selectedNoteId&&selectedNoteId==item.noteId)?' Selected':'')
	  }
	},
	props:{
	  filesList:Array,
	},
	computed: {
	  ...mapState(['selectedNoteId'])
	},
	components:{
		NoteFileList
	},
	methods: {
	  ItemClass:function(item) {
	  	var className='Item ';
	  	if(this.selectId==item.noteId) {
	  		className+='Selected';
	  	}
	  	return className;
	  },
	  ItemClick(item) {
	  	if(item.typeId&&!item.noteId) {
	  	  item.display=!item.display;
	  	  item.iconClass=(item.iconClass=='el-icon-caret-right')?'el-icon-caret-bottom':'el-icon-caret-right';
	  	}else{
	  	  axios.get("/v1/api/notes/"+item.noteId)
	  	  .then(resp=>{
	  	  	this.$store.commit('changeDefaultContent');
	  	  	this.$store.commit("changeNoteConent",resp.data.content);
	  	  	this.$store.commit("changeSelectedNoteTOCId",0);
	  	  	var TOC=[]
	  	  	// console.log(resp.data.content);
	  	  	this.$Toc.generateToc(resp.data.content,TOC);
	  	  	this.$store.commit('changeNoteTOC',TOC)
	  	  })
	  	  //this.selectId=item.noteId;
	  	  this.$store.commit('changeSelectedNoteId',item.noteId);
	  	  //console.log(this.selectedNoteId);
	  	  //console.log(this.selectId);
	  	  // this.$forceUpdate(); //强制渲染 层数过多 没有触发render函数进行自动更新
	  	  // //最后没有进行 更新 经过发现 是因为selectId 会在多个组件中存在 只需要维护一份selectId即可
	  	}
	  }
	}
}
</script>
<style scoped>
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