<template>
  <div>
    <Header></Header>
    <div class="content m-mobile-content">
      <el-row :gutter="20">
	    <el-col :span="6" class="m-mobile-hide">
	    	<HomeLeft></HomeLeft>
	    </el-col>
	    <el-col :span="12" class="m-blogcard-show">
       <HomeClasses :types="types"></HomeClasses>
			 <HomeContainer></HomeContainer>
	    </el-col>
	    <el-col :span="6" class="m-mobile-hide">
	    	<HomeRight></HomeRight>
	    </el-col>
	  </el-row>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import axios from '~/plugins/axios.js'
import Header from '~/components/home/Header.vue'
import HomeLeft from '~/components/home/HomeLeft.vue'
import HomeRight from '~/components/home/HomeRight.vue'
import HomeContainer from '~/components/home/HomeContainer.vue'
import HomeClasses from '~/components/home/HomeClasses.vue'
//import Decode from '~/plugins/decode.js'
export default {
  components: {
    Header,
    HomeLeft,
    HomeRight,
    HomeContainer,
    HomeClasses
  },
  data() {
    return {
      blogs:[],
      types:[],
      totalSize:0,
      recommendList:[]
    }
  },
  // computed: {
  //   ...mapState(['pageSize','currentPage'])
  // },
  async fetch(context) {
    //TO DO 
    //取出数据库中的设定
    // context.store.commit('changeCurrentPage',1);
    // context.store.commit('changePageSize',5);
  },
  async asyncData(context) {
    let reqUrlBlogs='';
    let reqUrlTotalSize='';
    if(context.params&&context.params.typeId){
      context.store.commit("changeTypeId",context.params.typeId);
    }
    if(context.store.state.typeId){
      reqUrlBlogs="/v1/api/blogs/"+context.store.state.typeId+"/"+context.store.state.currentPage+"/"+context.store.state.pageSize;
      reqUrlTotalSize="/v1/api/blogs/nums/"+context.store.state.typeId;
    } else {
      reqUrlBlogs="/v1/api/blogs/published/"+context.store.state.currentPage+"/"+context.store.state.pageSize
      reqUrlTotalSize="/v1/api/blogs/published";
    }
    let [blogsResp,typesResp,totalSizeResp,recommendListResp,recommendTotalSizeResp,commonResp,sentencesResp] = await Promise.all([
      // axios.get("/v1/api/blogs/1/5"),
      axios.get(reqUrlBlogs),
      axios.get("/v1/api/types"),
      axios.get(reqUrlTotalSize),
      axios.get("/v1/api/blogs/recommend/"+context.store.state.recommendCurrentPage+"/"+context.store.state.recommendPageSize),
      axios.get("/v1/api/blogs/recommend"),
      axios.get("/v1/api/common"),
      axios.get("/v1/api/sentences")
    ])
    return {
      blogs:blogsResp.data,
      types:typesResp.data,
      totalSize:totalSizeResp.data,
      recommendList:recommendListResp.data,
      recommendTotalSize:recommendTotalSizeResp.data,
      common:commonResp.data,
      sentences:sentencesResp.data
    }
  },
  created() {
    //有对应的包 不用自己解析了
    //console.log(this.$Decode.DecodeBase64(22));
    this.$store.commit('changeBlogList',this.blogs);
    this.$store.commit('changeTotalSize',this.totalSize);
    this.$store.commit('changeRecommendList',this.recommendList);
    let totalPages=Math.ceil(this.recommendTotalSize/this.$store.state.recommendPageSize);
    this.$store.commit('changeRecommendTotalPages',totalPages);
    this.$store.commit('changeCommon',this.common);
    this.$store.commit('changeSentences',this.sentences);

    //检查用户token是否过期
    var token = this.$cookies.get('token');
    if(token&&token!='') {
      axios.post('/v1/api/user/check',token)
      .then(resp=>{
        var data=resp.data;
        if(data.status=='fail') {
          localStorage.removeItem('Authorization');
          this.$cookies.remove('token');
          // VueCookies.remove('token');
          this.$store.commit('changeUser',[]);
        }
      })
    } 
  },
  mounted() {
    let _this = this;
    var blogInfo = {
      'common': _this.common,
      'recommendList':_this.recommendList,
      'recommendTotalPages':_this.$store.state.recommendTotalPages,
      'recommendCurrentPage':1
    };
    // sessionStorage.setItem('blogInfo',blogInfo);
    // var i = sessionStorage.getItem('blogInfo');
    // console.log(i);
    // 使用sessionStroge存储对象 需要使用JSON.stringify()转换成对象字符串 读出后使用JSON.parse()进行转换
    var jsonBlogInfo = JSON.stringify(blogInfo);
    sessionStorage.setItem('blogInfo',jsonBlogInfo);
    // var i = sessionStorage.getItem('blogInfo');
    // console.log(JSON.parse(i));
  },
  methods: {
  }
}
</script>
<style scoped>
.content {
	margin:5em;
}
</style>
