<template>
	<div>
	 <div class="grid-content bg-purple">
        <el-card class="box-card right-card tools-card" shadow="hover">
          <div class="clearfix" slot="header">
            <span>更多功能</span>
          </div>
          <div class="tools-card-tool">
            <div class="tool-item" @click="clickDiary()">
              <a href="javascript:void(0)"><i class="icon iconfont">&#xe628;</i><p>日记</p></a>
            </div>
            <div class="tool-item">
              <nuxt-link :to="{name:'more-notes'}"><i class="icon iconfont">&#xe610;</i><p>笔记</p></nuxt-link>
            </div>
<!--             <div class="tool-item">
              <nuxt-link :to="{name:'tools'}"><i class="icon iconfont">&#xe60e;</i><p>小玩具</p></nuxt-link>
            </div>
            <div class="tool-item">
              <nuxt-link :to="{name:'index'}"><i class="icon iconfont">&#xe602;</i><p>友链</p></nuxt-link>
            </div>
            <div class="tool-item">
              <nuxt-link :to="{name:'index'}"><i class="icon iconfont">&#xe61b;</i><p>赞赏</p></nuxt-link>
            </div>
            <div class="tool-item">
              <nuxt-link :to="{name:'index'}"><i class="icon iconfont">&#xe612;</i><p>好康的</p></nuxt-link>
            </div> -->
          </div>
        </el-card>
        <el-card class="box-card right-card recommends-card" shadow="hover">
          <div class="clearfix" slot="header">
            <span>作者推荐</span>
            <span class="recommends-card-header-more" style="float:right;" v-if="recommendTotalPages>1"
              @click="onClickMoreRecommends">换一批</span>
          </div>
          <div class="recommends-card-recommend">
            <div class="item" v-for="item in recommendList" :key="item.blogId">
              <div class="recommend-item">
                <span class="recommend-item-title" @click="onClickTitle(item.blogId,item.type)">{{item.title}}</span>
              <div class="recommend-item-classes">
                <!-- <span class="primary-color">编程语言</span> -->
                <span class="secondary-color">{{item.type.typeName}}</span>
              </div>
            </div>  
            <el-divider></el-divider>
            </div>
          </div>
        </el-card>
        <el-card class="box-card right-card comments-card" shadow="hover" :body-style="{padding:'10px'}">
          <div class="clearfix" slot="header">
            <span>最新评论</span>
          </div>
          <div class="comments-card-comment">
            <div class="comment-item">
              <el-card class="box-card" shadow="never" :body-style="{padding:'10px'}">
                <div class="comment-info">
                  <div class="img-container">
                    <img src="~/assets/img/profile photo.jpg" alt="">
                  </div>
                  <span class="comment-info-name">57one</span>
                </div>
                <div class="m-divider"></div>
                <div class="comment-message">你这点钱,我很难替你办事啊</div>
              </el-card>
            </div>
            <div class="comment-item">
              <el-card class="box-card" shadow="never" :body-style="{padding:'10px'}">
                <div class="comment-info">
                  <div class="img-container">
                    <img src="~/assets/img/profile photo.jpg" alt="">
                  </div>
                  <span class="comment-info-name">57one</span>
                </div>
                <div class="m-divider"></div>
                <div class="comment-message">不错不错</div>
              </el-card>
            </div>
            <div class="comment-item">
              <el-card class="box-card" shadow="never" :body-style="{padding:'10px'}">
                <div class="comment-info">
                  <div class="img-container">
                    <img src="~/assets/img/profile photo.jpg" alt="">
                  </div>
                  <span class="comment-info-name">57one</span>
                </div>
                <div class="m-divider"></div>
                <div class="comment-message">你这个写的有点问题</div>
              </el-card>
            </div>
          </div>
        </el-card>
      </div>
    <el-dialog title="通知" :visible.sync="dialogDiary" width="40%">
      <el-form :model="form">
        <el-form-item label="日记密码" label-width="100px">
          <el-input v-model="form.password" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogDiary = false">取 消</el-button>
        <el-button type="primary" @click="clickDiarySubmit()">确 定</el-button>
      </div>
    </el-dialog>
	</div>
</template>
<script>
import { mapState } from 'vuex'
import axios from '~/plugins/axios'
export default{
	name:'HomeRight',
  computed: {
    ...mapState(['recommendList','recommendTotalPages','recommendCurrentPage','recommendPageSize'])
  },
  data() {
    return {
      dialogDiary:false,
      form:{
        password:''
      }
    }
  },
  methods: {
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
    },
    onClickMoreRecommends() {
      let newRecommendCurrentPage=(this.recommendCurrentPage>=this.recommendTotalPages)?1:this.recommendCurrentPage+1
      this.$store.commit('changeRecommendCurrentPage',newRecommendCurrentPage);
      axios.get("/v1/api/blogs/recommend/"+this.recommendCurrentPage+"/"+this.recommendPageSize)
      .then(resp => {
        this.$store.commit('changeRecommendList',resp.data);
        var JsonBlogInfo = sessionStorage.getItem('blogInfo');
        if (JsonBlogInfo&&JsonBlogInfo!=''){
          var blogInfo = JSON.parse(JsonBlogInfo);
          blogInfo.recommendList=resp.data;
          blogInfo.recommendCurrentPage=newRecommendCurrentPage;
          JsonBlogInfo = JSON.stringify(blogInfo);
          sessionStorage.setItem('blogInfo',JsonBlogInfo);
        }        
      })
    },
    clickDiary() {
      var diaryToken = localStorage.getItem("diaryToken");
      if(diaryToken&&diaryToken!='') {
        axios.post("/v1/api/diary/checktoken",{'token':diaryToken})
        .then(resp => {
          var data=resp.data;
          if(data.status=='success') {
            this.$router.push({
              name:'more-diaries'
            })            
          } else {
            this.dialogDiary=true;
          }
        })
      } else {
        this.dialogDiary=true;
      }
    },
    clickDiarySubmit() {
      let _this = this;
      this.dialogDiary=false;
      axios.post("/v1/api/diary/check",this.form)
      .then(resp => {
        var data=resp.data;
        if(data.status=='success') {
          _this.$message({
            showClose:true,
            message:data.message,
            type:'success'
          })
          localStorage.setItem("diaryToken",data.token);
          this.$cookies.set('diaryToken',data.token);
          this.$router.push({
            name:'more-diaries'
          })
        }else {
          _this.$message({
            showClose:true,
            message:data.message,
            type:'error'
          })
        }
        this.form.password='';
      })
    }
  },
  mounted() {
    var JsonBlogInfo = sessionStorage.getItem('blogInfo');
    if (JsonBlogInfo&&JsonBlogInfo!=''){
      var blogInfo = JSON.parse(JsonBlogInfo);
      this.$store.commit('changeRecommendList',blogInfo.recommendList);
      this.$store.commit('changeRecommendTotalPages',blogInfo.recommendTotalPages);
      this.$store.commit('changeRecommendCurrentPage',blogInfo.recommendCurrentPage);
      }
    }
}
</script>
<style scoped>
a {
  text-decoration: none;
  color: black;
}
a:hover {
  color: #0fbcf9;
}
a p {
  display: inline-block;
  font-size: 0.9em;
}
.icon {
  padding-right: 4px;
}
.right-card {
	margin-bottom: 2em;
}
.tool-item {
  display: inline-block;
  padding: 1em;
  text-align: center;
}
.recommends-card-header-more {
  cursor: pointer;
  color: #0fbcf9;
}
.recommend-item-classes {
  float: right;
  display: inline-block;
  vertical-align: middle;
  color: white;
  font-size: 0.8em;
}
.recommend-item-classes {
  margin: 1em;
}
.recommend-item-title {
  cursor: pointer;
}
.primary-color {
  background-color: #0fbcf9;
}
.secondary-color {
  padding: 0.5em;
  background-color: #4bcffa;
}
.comment-item .box-card {
  margin:0 0 1em 0;
  background-color: #f6e58d;
}
.comment-info {
  position: relative;
}
.img-container {
  display: inline-block;
  height: 2em;
  width: 2em;
  border-radius: 50%;
  overflow: hidden;
}
.img-container img {
  height: 100%;
  width: 100%;
}
.comment-info-name {
  position: absolute;
  top:50%;
  transform: translateY(-50%);
  display: inline-block;
  font-size: 1.2em;
  margin: 0 0 0 0.5em;
}
</style>