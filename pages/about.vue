<template>
	<div>
	  <Header></Header>
	  <div class="about-content m-mobile-content">
	    <el-row :gutter="20">
		  <el-col :span="6" class="m-mobile-hide">
		  	<HomeLeft></HomeLeft>
		  </el-col>
		  <el-col :span="12" class="m-blogcard-show">
		  	<div class="grid-content bg-purple">
		  	  <el-card class="box-card class-card" shadow="hover">
  			  	 57one,20岁,是学生
	  	  	  </el-card>
		    </div>
		  </el-col>
		  <el-col :span="6" class="m-mobile-hide">
		  	<HomeRight></HomeRight>
		  </el-col>
		</el-row>
	  </div>
	</div>
</template>
<script>
import Header from '~/components/home/Header.vue'
import HomeLeft from '~/components/home/HomeLeft.vue'
import HomeRight from '~/components/home/HomeRight.vue'
export default {
	components: {
		Header,
		HomeLeft,
		HomeRight
	}
}
</script>
<style scoped>
.about-content {
	margin: 5em;
}
</style>