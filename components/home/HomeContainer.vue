<template>
    <div class="grid-content bg-purple">
	  <div class="blog-list">
        <el-card class="box-card blog-card" shadow="hover">
          <div slot="header" class="clearfix">
            <span>博客</span>
            <span style="float:right;">共<span style="color:orange">{{totalSize}}</span>篇</span>
          </div>
          <div v-if="Sentences&&Sentences.length">
            每日一句
			<el-button style="vertical-align:middle;padding: 6px;" circle @click="changeSentence">
				<i class="iconfont">&#xe64e;</i>
			</el-button>
          </div>
          <div>
          	{{currentSentence}}
          </div>
        </el-card>
	    <el-card v-for="item in blogList" :key="item.blogId" class="box-card article-card" shadow="hover" :body-style="{ padding: '0px' }"> 
	      <div class="article-card-img lg-article-card-img"></div>
	      <div class="article-card-info lg-article-card-info">
			<!--<div class="router-class">
	      		<nuxt-link :to="{name:'blog'}"><div class="article-card-title">{{item.title}}</div></nuxt-link>
	      	</div> -->
	      	<div class="article-card-title" @click="onClickTitle(item.blogId,item.type)">{{item.title}}</div>
	      	<div class="article-card-summary">{{item.summary}}</div>
			<div class="article-card-icon">
			  <i class="iconfont">&#xe746;</i><span>{{item.createTime}}</span>
			  <i class="iconfont">&#xe75b;</i><span>{{item.views}}</span>
			  <i class="iconfont">&#xe753;</i><span>{{item.likes}}</span>
			  <i class="iconfont">&#xe751;</i><span>{{item.type.typeName}}</span> 
			</div>
	      </div>
	    </el-card>
      </div>
      <!-- @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page.sync="currentPage" -->
	  <div class="pagination">
	    <el-pagination
	    background
	   	:current-page="this.currentPage"
        :page-size="this.pageSize"
        layout="prev, pager, next, jumper"
        :total="this.totalSize"
        @current-change="pageChange"
        :hide-on-single-page="true">
        </el-pagination>
	  </div>
      </div>
</template>
<script>
import { mapState } from 'vuex'
import axios from '~/plugins/axios'
export default{
	name:'HomeContainer',
	computed: {
		...mapState(['pageSize','totalSize','currentPage','blogList','Sentences','currentCountSentence']),
		currentSentence: function() {
			if (this.Sentences.length){
				return this.Sentences[this.currentCountSentence].content;
			} else {
				return null;
			}
		}
	},
	methods: {
		onClickTitle(blogId,type) {
			this.$router.push({
				name: 'blog-blogId',
				params: {
					blogId:blogId
				},
				query: {
					parentId:type.parentId
				}
			})
		},
		pageChange(currentPage) {
			let _this = this;
			this.$store.commit('changeCurrentPage',currentPage);
			axios.get("/v1/api/blogs/published/"+currentPage+"/"+_this.pageSize)
			.then(resp => {
				this.$store.commit('changeBlogList',resp.data);
			})
		},
		changeSentence() {
			if(this.currentCountSentence>=10) {
				axios.get("/v1/api/sentences")
				.then(resp => {
					this.$store.commit('changeSentences',resp.data);
					this.$store.commit('changeCurrentCountSentence',1);
				})
			}else {
				 this.$store.commit('changeCurrentCountSentence',this.currentCountSentence+1);
			}
		}
	}
}
</script>
<style scoped>
.blog-card {
	margin: 0;
}
.article-card {
	position: relative;
	margin-bottom: 1em;
}
.article-card-img {
	height:15em;
	background: url('~assets/img/firstpicture.jpg') no-repeat center;
	background-position:center;
	background-size:100%;
	transition: background-size 0.5s linear;
}
.article-card-title:hover {
	cursor: pointer
}
@media screen and (min-width: 1201px) {
.article-card:hover .article-card-img {
	filter:blur(3px);
	background-size:130%;
}
.article-card:hover .article-card-info .article-card-title{
	font-size:1.8em;
	top: 40%;
}
.article-card:hover .article-card-info .article-card-summary {
	opacity: 1;
}
.article-card:hover .article-card-info .article-card-icon {
	opacity: 1;
}
.article-card-info {
	width: 100%;
	color: white;
}
.article-card-title {
	transition: font-size 0.1s linear,top 0.1s linear;;
	color: white;
	font-size: 1.4em;
	position: absolute;
	left: 50%;
	top:  50%;
	transform: translate(-50%,-50%);
	text-align: center;
}
.article-card-summary {
	transition: opacity 0.3s linear;
	opacity: 0;
	position: absolute;
	bottom: 3.5em;
	left: 0.5em;
}
.article-card-icon {
	transition: opacity 0.3s linear;
	opacity: 0;
	position: absolute;
	left: 0.5em;
	bottom: 0.5em;
	color: black;
}
.article-card-icon i {
	color: white;
	font-size: 15px;
	vertical-align: middle;
}
.article-card-icon span {
	color: white;
	font-size: 15px;
	vertical-align: middle;
}
}
/*媒体查询*/
@media screen and (max-width: 1200px) {
.lg-article-card-img {
	background-size:100% 100%;
}
.lg-article-card-info{
	padding: 1em;
}
.lg-article-card-info .article-card-title {
	font-weight: bold;
	font-size: 1.3em;
	color: black;
}
}
.pagination {
	text-align: center;
}
</style>