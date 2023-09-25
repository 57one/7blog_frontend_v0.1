<template>
  <div>
  	<div class="grid-content bg-purple">
	  <el-card class="box-card note-card" shadow="hover" :body-style="{ padding: '20px' }">
	  	<el-row type="flex" :gutter="20">
		  <el-col :span="3">
		  	<div class="grid-content bg-purple">
			  <el-tabs v-model="activeName">
			    <el-tab-pane label="文件" name="first">
           		  <NoteFileList :filesList="filesList"></NoteFileList>
			    </el-tab-pane>
			    <el-tab-pane label="大纲" name="second">
                <TOCList></TOCList>
			    </el-tab-pane>
			  </el-tabs>
		  	</div>
		  </el-col>
		  <el-col :span="1">
		  	<div class="m-divider-vertical"></div>
	  	  </el-col>
		  <el-col :span="20">
		  	<div class="grid-content bg-purple">
		  	  <div class="note-container">
		  	  	<el-scrollbar class="live-scrollbar">
              <h1>{{defaultContent}}</h1>
		  	  		<div v-html="noteContent">
              </div>
		  	  	</el-scrollbar>		
		  	  </div>
		  	</div>
		  </el-col>
		</el-row>
  	  </el-card>
	</div>
  </div>
</template>
<script>
import axios from '~/plugins/axios.js'
import NoteFileList from '~/components/common/NoteFileList.vue'
import TOCList from '~/components/common/TOCList.vue'
import { mapState } from 'vuex'
export default {
	name:'Note',
  data() {
    return {
      filesList:[],
      notesList:[],
      activeName:'first'
    }
  },
  computed: {
    ...mapState(['noteContent','defaultContent'])
  },
  components:{
    NoteFileList,
    TOCList
  },
  methods:{
  	recursiveChargeDisplay(parentItem) {
      parentItem.itemClass='Item';
  	  if(parentItem.typeId&&!parentItem.noteId) {
  	  	parentItem.display=false;
  	  	parentItem.iconClass='el-icon-caret-right';
  	  	parentItem.typeChildren.forEach(el=>{
  	  		this.recursiveChargeDisplay(el);
  	  	})
  	  	parentItem.noteChildren.forEach(el=>{
  	  		this.recursiveChargeDisplay(el);
  	  	})
  	  }else {
  	  	parentItem.iconClass='el-icon-notebook-2';
  	  }
  	}
  },
  created() {
    axios.get("/v1/api/noteTypes")
    .then(resp=>{
      resp.data.forEach(el=>{
      	this.recursiveChargeDisplay(el);
      })
      this.filesList=resp.data;
    })
  }
}
</script>
<style scoped>
.note-card {
	height: 52em;
}
.note-container {
	height: 48em;
	overflow: hidden;
	padding:3.5em 0em;
}
.m-divider-vertical {
	height: 48em;
}
.live-scrollbar {
	height: 50em;
/*  height: 120%;*/
}
</style>