<template>
  <div class="header">
    <el-header>
      <el-row align="middle" type="flex" :gutter="30" style="height: 60px">
        <el-col :span="6" class="hidden-sm-and-down">
          <div class="gird-content bg-purple header-icon">
            <nuxt-link :to="{name:'index'}"><i class="icon iconfont">&#xe605;</i><p>首页</p></nuxt-link>
            <nuxt-link :to="{name:'more-notes'}"><i class="icon iconfont">&#xe610;</i><p>个人笔记</p></nuxt-link>
<!--             <nuxt-link :to="{name:'tools'}"><i class="icon iconfont">&#xe60e;</i><p>小玩具</p></nuxt-link> -->
            <nuxt-link :to="{name:'archive'}"><i class="icon iconfont">&#xe619;</i><p>归档</p></nuxt-link>
            <nuxt-link :to="{name:'about'}"><i class="icon iconfont">&#xe6aa;</i><p>关于我</p></nuxt-link>
          </div>  
        </el-col>
        <el-col :span="6" :offset="3">
          <el-input v-model="SearchInput" placeholder="请输入搜索内容" class="hidden-sm-and-down">
            <el-button slot="append" type="primary">搜索</el-button>
          </el-input>
        </el-col>
        <el-col :span="6" :offset="3" class="hidden-sm-and-down">
          <div v-if="user&&user.length==0">
            <nuxt-link :to="{name:'admin-login'}"><i class="icon iconfont">&#xe616;</i><p>登录</p></nuxt-link>
            <nuxt-link :to="{name:'admin-register'}"><i class="icon iconfont">&#xe642;</i><p>注册</p></nuxt-link>
          </div>
          <div v-if="user&&user.length!=0" class="block">
            <el-popover 
            class="classes-item"
            placement="top"
            width="30"
            trigger="hover"
            >
              <div class="subclasses">
                <p v-if="user&&user.typeID==1" @click="clickToAdmin()">管理页面</p>
                <p @click="clickQuit()">退出</p>
              </div>
              <el-avatar :src="user.avatar" slot="reference" :size="50" style="cursor: pointer;"></el-avatar>
            </el-popover>
            <span style="padding-left: 10px; margin-top: -5px">{{user.nickName}}</span>
          </div>
        </el-col>
      </el-row> 
    </el-header>
  </div>
</template>

<script>
import 'element-ui/lib/theme-chalk/display.css'
import { mapState } from 'vuex'
import jwt_decode from 'jwt-decode'
import axios from '~/plugins/axios'
export default {
  name: 'Header',
  data() {
    return {
      SearchInput:' '
    }
  },
  computed: {
    ...mapState(['user'])
  },
  methods: {
    clickToAdmin:function() {
      let _this = this;
      //检查用户token是否过期
      var token = this.$cookies.get('token');
      if(token&&token!='') {
        axios.post('/v1/api/user/check',token)
        .then(resp=>{
          var data=resp.data;
          if(data.status=='fail') {
            localStorage.removeItem('Authorization');
            this.$cookies.remove('token');
            this.$store.commit('changeUser',[]);
          } else {
            var token=localStorage.getItem('Authorization');
            if(token==null||token=='') {
              this.$router.push({
                name:'index'
              });
            } else {
              // console.log(token);
              axios.post('/v1/api/user/check/getDiaryToken',token)
              .then(resp => {
                var data=resp.data;
                if(data.status=='success') {
                  _this.$cookies.set('diaryToken',data.token);
                  // window.location.href="http://localhost:8080/"
                  window.location.href="https://57one66.com/admin"
                  // console.log(data.token);
                }
              })
            }
          }
        })
      } 
    },
    clickQuit:function() {
      this.$store.commit('changeUser',[]);
      localStorage.removeItem('Authorization');
      localStorage.removeItem('userInfo');
      this.$cookies.remove('token');
    }
  },
  mounted() {
    var token = localStorage.getItem('Authorization');
    if(token&&token!=''&&token!=" ") {
      const decode = jwt_decode(token);
      // console.log(decode)
      this.$cookies.set('token',token);
      this.$store.commit('changeUser',decode);
    } else {
      var userInfoStr = localStorage.getItem('userInfo');
      if (userInfoStr&&userInfoStr!=''&&userInfoStr!=" ") {
        var userInfo = JSON.parse(userInfoStr);
        this.$store.commit('changeUser',userInfo);
        // console.log(userInfo)
      }
    }
  }
}
</script>
<style scoped>
a {
  text-decoration: none;
  color: white;
  cursor: pointer;
}
a:hover {
  color: lightblue;
}
a p {
  display: inline-block;
}
.icon {
  padding-right: 4px;
}
.header{
  padding-top: 1em;
  background: url('~assets/img/header-background.png');
  padding-bottom: 1em;
}
.header-icons p{
  color: white !important;
}
.subclasses p {
  display: inline-block;
  cursor: pointer;
  padding: 0.7em;
}
.block {
  display: flex;
  flex-flow: row;
  align-items: center;
}
</style>
