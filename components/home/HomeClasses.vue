<template>
	<div class="container">
		<div class="grid-content bg-purple">
	      <el-card class="box-card class-card" shadow="hover">
	        <div slot="header" class="clearfix">
	          <span>博客分类</span>
	          <span style="float:right;">共<span style="color:orange">{{types.length}}</span>类</span>
	        </div>
	          <div class="classes">
  	             <el-popover 
  	          	 class="classes-item"
				 placement="top-start"
				 width="100"
				 trigger="hover"
				 v-for="item in types"
				 :key="item.typeId"
				 :content="item.typeName"
				 :disabled="item.children.length==0"
				 >
				   <div class="subclasses">
				     <p v-for="i in item.children" :key="i.typeId" @click="changeBlogsByType(i.typeId)">{{i.typeName}}<span class="num" v-if="i.typeSize">{{i.typeSize}}</span></p> 	
				   </div>
				 <p slot="reference" class="classes-link" @click="changeBlogsByType(item.typeId)">{{item.typeName}}<span class="num" v-if="item.typeSize">{{item.typeSize}}</span></p>
				 </el-popover>
	          </div>
	      </el-card>
	    </div>
	</div>
</template>
<script>
import { mapState } from 'vuex'
import axios from '~/plugins/axios'
export default{
	name:'HomeClasses',
	props: {
		types:Array
	},
	computed: {
		...mapState(['pageSize'])
	},
	methods: {
		reset(typeId) {
			//先重刷新vuex中的数据
			this.$store.commit("changeCurrentPage",1);
			this.$store.commit("changeTypeId",typeId);
		},
		changeBlogsByType(typeId) {
			let _this = this;
			this.reset(typeId);
			axios.get("/v1/api/blogs/"+typeId+"/1/"+_this.pageSize)
			.then(resp => {
				this.$store.commit("changeBlogList",resp.data);
			})
			axios.get("/v1/api/blogs/nums/"+typeId)
			.then(resp => {
				this.$store.commit("changeTotalSize",resp.data);
			})
		}
	}
}
</script>
<style scoped>
.container {
	margin-bottom: 2em;
}
.music-card {
	margin-bottom: 5em;
}
.box {
	width: 100% !important;
}
.class-item {
	margin: 0.2em;
}
.classes .classes-item {
	padding: 1em;
}
.classes .classes-link {
	font-size: 1em;
	display: inline-block;
}
.classes p {
	cursor: pointer;
}
.subclasses p {
	display: inline-block;
	cursor: pointer;
	padding: 0.5em;
}
.num {
	background:LightSkyBlue;
	color: white;
	display: inline-block;
	font-size: 0.7em;
	width: 2.0em;
	vertical-align: middle;
	text-align: center;
	margin-left: 0.3em;
	margin-top: -1px;
}
</style>