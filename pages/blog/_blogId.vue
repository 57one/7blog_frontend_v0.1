<template>
	<div>
	  <Header></Header>
	  <div class="blog-container m-mobile-content">
	  	<el-row :gutter="20">
		  <el-col :span="6" class="m-mobile-hide">
		  	<div class="grid-content bg-purple">
		  	  <HomeLeft></HomeLeft>
		  	  <blogSider :blogTOC="blogTOC"></blogSider>
		  	</div>
		  </el-col>
		  <el-col class="m-blogcard-show" :span="12">
		  	<div class="grid-content bg-purple">
		  	  <el-card class="box-card blog-card" shadow="hover" :body-style="{ padding: '20px' }">
		  	  	<div class="blog-card-header">
	  	  		  <div class="bread-crumb">
	  	  	  		<el-breadcrumb separator="/">
			    	  <el-breadcrumb-item :to="{ name: 'index' }">首页</el-breadcrumb-item>
			    	  <el-breadcrumb-item :to="{ name: 'index' , params:{typeId:parentType.typeId} }">
			    	    {{parentType.typeName}}
			    	  </el-breadcrumb-item>
			    	  <el-breadcrumb-item :to="{ name: 'index' , params:{typeId:blog.type.typeId} }">
			    	    {{blog.type.typeName}}
			    	  </el-breadcrumb-item>
			    	  <el-breadcrumb-item>{{blog.title}}</el-breadcrumb-item>
			  		</el-breadcrumb>
	  	  		  </div>
		  	  	</div>
		  	  	<div class="blog-card-img">
		  	  		<img src="~/assets/img/firstpicture.jpg" alt="">
		  	  	</div>
		  	  	<div class="blog-card-content typo typo-selection">
		  	  		<div class="title"><h2 class="test-title">{{blog.title}}</h2></div>
		  	  		<div class="content" v-html="blog.content">
		  	  		</div>
		  	  	</div>
		  	  	<div class="blog-card-support-like">
	  	  		  <el-popover
				      placement="bottom"
				      trigger="click"
				      content="这是一段内容,这是一段内容,这是一段内容,这是一段内容。">
				        <div class="support-images">
				          <div class="images">
				            <div class="image">
				     	        <img class="image" src="~/assets/img/wechat.png" alt="">
				     	        <div class="image-desc">微信</div>
				     	      </div>
				     	      <div class="image">
				     	        <img class="image" src="~/assets/img/zhifubao.jpg" alt="">
				     	        <div class="image-desc">支付宝</div>
				     	      </div>
				          </div>
				        </div>
				        <el-button round type="primary" slot="reference">赞赏</el-button>
				      </el-popover>
				      <el-button round type="success" slot="reference">点赞</el-button>
		  	  	</div>
<!-- 		  	  	<div class="blog-card-message">
		  	  		 博客信息
		  	  	</div> -->
		  	  </el-card> 
		  	  <el-card class="box-card blog-card" shadow="hover" :body-style="{ padding: '0px' }">
		  	  	<div slot="header" class="clearfix">
				  <span>评论</span>
				</div>
				<div class="comment-content">
					<!-- <Comment :comments="commentData"></Comment> -->
				</div>
		  	  </el-card>	
		  	</div>
		  </el-col>
		  <el-col class="m-mobile-hide" :span="6">
		    <div class="grid-content bg-purple">
		  	  <HomeRight></HomeRight>
		  	</div>
		  </el-col>
		</el-row>
	  </div>
	</div>
</template>
<script>
import axios from '~/plugins/axios'
import prismjs from '~/assets/js/prism.js'
import Header from '~/components/home/Header.vue'
import HomeLeft from '~/components/home/HomeLeft.vue'
import HomeRight from '~/components/home/HomeRight.vue'
import Comment from '~/components/common/Comment.vue'
import * as CommentData from '~/assets/js/mockdata.js'
import blogSider from '~/components/common/blogSider'
import Vue from 'vue'
import { mapState } from 'vuex'
export default {
	components: {
	  Header,
	  HomeLeft,
	  Comment,
	  HomeRight,
	  blogSider
	},
  methods: {
  	generaNavigation(content) {
  	}
  },
  head() {
    return {
      // script: [
      // {
      //   src:'/js/prism.js'
      // }]
      // link:[
      // {
      //   rel:'stylesheet',
      //   href:'/css/typo.css'
      // }]
    }
  },
  computed: {
  	...mapState(['blogTOC'])
  },
  data() {
	return {
		commentData:[],
  		blog:{},
  		parentType:{}
	}
	},
	created() {
		this.commentData = CommentData.comment.data;
    // axios.get("/v1/api/blog/"+this.$route.params.blogId)
    // .then(resp => {
    //   console.log(resp.data);
    // })
	},
  mounted() {
    prismjs.highlightAll();
  	var TOC=[]
	this.$Toc.generateToc(this.blog.content,TOC);
	console.log(this.blog.content);
	this.$store.commit('changeBlogTOC',TOC);
	console.log(TOC);
  },
  async asyncData(context) {
  	let [blogResp,parentTypeResp] = await Promise.all([
  	  axios.get("/v1/api/blogs/"+context.params.blogId),
  	  axios.get("/v1/api/type/"+context.query.parentId)
  	])
  	return {
  		blog:blogResp.data,
  		parentType:parentTypeResp.data
  	}
    // let {data}= await axios.get("/v1/api/blogs/"+context.params.blogId);
    // return {blog:data}
  }
}
</script>
<style>
@import "../../assets/css/prism.css";
.blog-container	{
	margin: 5em;
}
.blog-card {
	margin: 0 0 2em 0;
}
.blog-card-img {
	margin: 1em 0;
	height: 20em;
	width: 100%;
}
.blog-card-img img {
	height: 100%;
	width: 100%;
}
.title {
	text-align: center;
}
.blog-card-content {
	margin: 1em;
}
.blog-card-support-like {
	text-align: center;
	margin: 1em;
}
.support-images {
	color: #f2711c;
	padding: 1em;
	border: 1px solid #f2711c;
}
.image {
	display: inline-block;
	width: 120px;
}
.image-desc {
	text-align: center;
}
</style>