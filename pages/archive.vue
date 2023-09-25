<template>
	<div class="archive">
	  <Header></Header>
	  <div class="content m-mobile-content">
      <el-row :gutter="20">
	    <el-col :span="6" class="m-mobile-hide">
	    	<HomeLeft></HomeLeft>
	    </el-col>
	    <el-col :span="12" class="m-blogcard-show">
	      <el-card class="box-card class-card" shadow="hover">
	      	<div class="archive">
			  <el-timeline>
			    <el-timeline-item 
			    v-for="blogItem in archiveBlogList"
				:timestamp="blogItem.createTime"
			    placement="top"
			    :key="blogItem.blogId">
		          <span class="title" @click="onClickTitle(blogItem.blogId,blogItem.type)">{{blogItem.title}}</span>
			    </el-timeline-item>
			  </el-timeline>
			</div>
			<div class="pagination">
			    <el-pagination
			    background
			   	:current-page="this.archiveCurrentPage"
		        :page-size="this.archivePageSize"
		        layout="prev, pager, next, jumper"
		        :total="this.archiveTotalSize"
		        @current-change="pageChange"
		        :hide-on-single-page="true">
		        </el-pagination>
			</div>
	      </el-card>		
	    </el-col>
	    <el-col :span="6" class="m-mobile-hide">
	    	<HomeRight></HomeRight>
	    </el-col>
	  </el-row>
    </div>
	</div>
</template>
<script>
import axios from '~/plugins/axios'
import { mapState } from 'vuex'
import Header from '~/components/home/Header.vue'
import HomeLeft from '~/components/home/HomeLeft.vue'
import HomeRight from '~/components/home/HomeRight.vue'
export default {
	components: {
		Header,
		HomeLeft,
		HomeRight
	},
	computed: {
		...mapState(['archiveBlogList','archiveCurrentPage','archivePageSize','archiveTotalSize'])
	},
	async asyncData(context) {
		let [archiveBlogListResp,archiveNums] = await Promise.all([
			axios.get("/v1/api/blogs/published/"+context.store.state.archiveCurrentPage+"/"+context.store.state.archivePageSize),
			axios.get("/v1/api/blogs/published")
			
		])
		return {
			archiveList:archiveBlogListResp.data,
			archiveNums:archiveNums.data
		}
	},
	created() {
		this.$store.commit('changeArchiveBlogList',this.archiveList);
		this.$store.commit('changeArchiveTotalSize',this.archiveNums);
	},
	methods: {
		pageChange(currentPage) {
			let _this = this;
			this.$store.commit('changeArchiveCurrentPage',currentPage);
			axios.get("/v1/api/blogs/published/"+_this.archiveCurrentPage+"/"+_this.archivePageSize)
			.then(resp => {
				this.$store.commit('changeArchiveBlogList',resp.data);
			})
		},
		onClickTitle(blogId,type) {
			this.$router.push({
				name:'blog-blogId',
				params: {
					blogId:blogId
				},
				query: {
					parentId:type.parentId
				}
			})
		}
	}
}
</script>
<style scoped>
html,body {
	height: 100%;
}
.title {
	cursor: pointer;
	text-align: left;
}
.archive {
	height: 100%;
}
.content {
	margin:5em;
}
.archive-year {
	margin-bottom: 1em;
}
.pagination {
	text-align: center;
}
</style>