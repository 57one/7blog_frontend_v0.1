<template>
	<div>
	  <Header></Header>
	  <div class="content m-mobile-content">
      <el-row :gutter="20">
	    <el-col :span="6" class="m-mobile-hide">
	    	<HomeLeft></HomeLeft>
	    </el-col>
	    <el-col :span="12" class="m-blogcard-show">
			<el-card class="box-card class-card" shadow="hover">
			  <div class="diary">
			    <el-timeline v-for="item in diaryList" :key="item.diaryId">
<!-- 			  	  <div class="diary-year">
			  		  <h2>{{dataItem.year}}</h2>
			  	  </div> 加上年份 to do-->
<!-- 			      <el-timeline-item 
			      v-for="item in dataItem.articles"
				  :timestamp="item.timestamp"
			      placement="top">
		            <div class="diary-content">
			  		  {{item.content}}
			        </div>
			      </el-timeline-item> -->
			      <el-timeline-item 
				  :timestamp="item.createTime"
			      placement="top">
		            <div class="diary-content" v-html="item.content">
			        </div>
			      </el-timeline-item>			      
			    </el-timeline>
			  </div>
			  <div class="pagination">
			    <el-pagination
			    background
			   	:current-page="diaryCurrentPage"
		        :page-size="diaryPageSize"
		        :total="diaryTotalSize"
		        layout="prev, pager, next, jumper"
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
import Header from '~/components/home/Header.vue'
import HomeLeft from '~/components/home/HomeLeft.vue'
import HomeRight from '~/components/home/HomeRight.vue'
import axios from 'axios'
import { mapState } from 'vuex'
export default {
  middleware:'diaryMiddleware',
  components: {
	Header,
	HomeLeft,
		HomeRight
  },data() {

  },
  computed: {
    ...mapState(['diaryList','diaryCurrentPage','diaryTotalSize','diaryPageSize'])
  },
  async asyncData(context) {
  	let [diaryListResp,diaryTotalSizeResp] = await Promise.all([
  			axios.get("/v1/api/diaries/"+context.store.state
  				.diaryCurrentPage+"/"+context.store.state.diaryPageSize),
  			axios.get("/v1/api/diaries/nums")
  		])
  	return {
  		diaryListD:diaryListResp.data,
  		diaryTotalSizeD:diaryTotalSizeResp.data
  	}
  },
  created() {
  	this.$store.commit('changeDiaryList',this.diaryListD);
  	this.$store.commit('changeDiaryTotalSize',this.diaryTotalSizeD);
  },
  methods: {
  	pageChange(currentPage) {
  		let _this=this;
  		var diaryToken = localStorage.getItem('diaryToken');
  		axios.defaults.headers.diaryToken=diaryToken;
  		this.$store.commit('changeDiaryCurrentPage',currentPage);
  		axios.get("/v1/api/diaries/"+_this.diaryCurrentPage+"/"+_this.diaryPageSize)
  		.then(resp => {
  			this.$store.commit('changeDiaryList',resp.data);
  		})
  	}
  }
}
</script>
<style scoped>
.content {
	margin:5em;
}
.diary-year {
	margin-bottom: 1em;
}
.diary-content {
	width: 70%;
	padding: 1em;
	background: #fffa65;
}
.pagination {
	text-align: center;
}
</style>