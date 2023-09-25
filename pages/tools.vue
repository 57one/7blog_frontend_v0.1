<template>
	<div class="tools">
		<Header></Header>
		<div class="tools-container m-mobile-content">
		  <el-row :gutter="20">
		    <el-col :span="5" class="m-mobile-hide" ><div class="tools-left-content grid-content bg-purple"><HomeLeft></HomeLeft></div></el-col>
		    <el-col :span="16" class="m-blogcard-show">
		      <div class="grid-content bg-purple">
		    	<el-row :gutter="20">
		    	  <el-col :span="6">
		    	  	<el-card  class="box-card" shadow="hover">
		    	  	  复习50音图
		    	  	</el-card>
		    	  </el-col>
		    	  <el-col :span="6"><el-card></el-card></el-col>
		    	  <el-col :span="6"><el-card></el-card></el-col>
		    	  <el-col :span="6"><el-card></el-card></el-col>
	    		</el-row>
		      </div>
		    </el-col>
		    <el-col :span="3"><div class="grid-content bg-purple"></div></el-col>
		  </el-row>
		</div>
	</div>
</template>
<script>
import Header from '~/components/home/Header'
import HomeLeft from '~/components/home/HomeLeft'
export default {
	components: {
		Header
	}
}
</script>
<style scoped>
.tools-container {
	margin: 5em;
}
.tools-left-content:after {
	content: " ";
}
</style>