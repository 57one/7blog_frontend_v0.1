<template>
	<div>
		<div class="grid-content bg-purple">
	      <el-card class="box-card music-card" shadow="hover">
	        这是一个音乐盒 这是一个音乐盒 这是一个音乐盒 这是一个音乐盒 这是一个音乐盒 这是一个音乐盒 这是一个音乐盒 这是一个音乐盒 音乐盒坏掉了呢
	      </el-card>
	      <el-card class="box-card right-card user-card" shadow="hover" :body-style="{ padding: '0px' }">
          	<div class="user-container">
          		<div class="user-header-img"></div>
          		<div class="user-info">
      				<div class="img-container">
      					<img src="~/assets/img/profile photo.jpg" alt="">
  					</div>
  					<div class="username">57one</div>
  					<div class="user-summary">
  						<span class="user-summary-item">笔记<div class="user-summary-item-num">{{common.notes}}</div></span>
  						<span class="user-summary-item">博客<div class="user-summary-item-num">{{common.blogs}}</div></span>
  						<span class="user-summary-item">点赞<div class="user-summary-item-num">{{common.likes}}</div></span>
  					</div>
          		</div>
          		<!-- <div class="user-desc">24歳,学生です</div> -->
          		<div class="user-icons">
          			<!-- github cnblogs qq wechat zhihu steam-->
          			<i class="iconfont iconitem">&#xe691;</i> 
          			<i class="iconfont iconitem">&#xe64d;</i>
          			<i class="iconfont iconitem">&#xe601;</i>
          			<i class="iconfont iconitem">&#xe63e;</i>
          			<i class="iconfont iconitem">&#xe69a;</i>
          			<i class="iconfont iconitem">&#xe600;</i>
          		</div>
          	</div>
          </el-card>
	    </div>
	</div>
</template>
<script>
import { mapState } from 'vuex'
export default{
	name:'HomeLeft',
	computed: {
		...mapState(['common'])
	},
	mounted() {
		if(this.common==''||!this.common) {
		  	var jsonBlogInfo = sessionStorage.getItem('blogInfo');
			if(jsonBlogInfo&&jsonBlogInfo!='') {
			var blogInfo = JSON.parse(jsonBlogInfo);
			this.$store.commit('changeCommon',blogInfo.common);
			}
		}
	}
}
</script>
<style scoped>
.music-card {
	margin-bottom: 5em;
}
.box {
	width: 100% !important;
}
.img-container {
	height: 60px;
	width: 60px;
	border-radius: 50%;
	overflow: hidden;
}
.img-container img {
	height: 100%;
	width: 100%;
}
.user-card {
	text-align: center;
}
.user-header-img {
	height: 7em;
	background: url('~assets/img/firstpicture.jpg') no-repeat center;
	background-size: 100%;
}
.img-container {
	margin: auto;
	margin-top: -2em;
}
.img-container:hover {
	transform: rotate(360deg) scale(1.5,1.5);
	transition: transform 0.25s linear;
}
.username {
	font-size: 1.3em;
	margin: 1em;
}
.user-summary {
	font-size: 1em;
	margin: 1em;
}
.user-summary .user-summary-item {
	display: inline-block;
	padding: 0 2em;
	color:grey;
}
.user-summary-item-num {
	color:#3498db;
}
.user-icons .iconitem {
	font-size: 1.5em;
	padding: 0 0.5em;
}
</style>