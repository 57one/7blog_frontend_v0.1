<template>
  <div class="container">
  	<div class="login-form">
	  <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="80px">
	    <el-form-item label="用户名" prop="userName">
	      <el-input placeholder="请输入用户名" v-model="ruleForm.userName"></el-input>
	    </el-form-item>
	    <el-form-item label="密码" prop="password">
		  <el-input placeholder="请输入密码" v-model="ruleForm.password" show-password></el-input>
	    </el-form-item>
	    <el-form-item>
	      <el-button type="primary" @click="onClickSubmit('ruleForm')">登录</el-button>
	      <el-button type="primary" @click="onClickRegister()">注册</el-button>
	    </el-form-item>
	  </el-form>	
    </div>
  </div>
</template>
<script>
import axios from '~/plugins/axios'
import jwt_decode from 'jwt-decode'
export default {
data() {
  return {
    ruleForm: {
      userName: '',
      password:''
    },
    rules: {
      userName: [
        { required: true, message: '请输入用户名', trigger: 'blur' }
      ],
      password: [
        { required: true, message: '请输入用户密码', trigger: 'blur' }
      ]
    }
  };
},
methods: {
  submitForm(formName) {
    this.$refs[formName].validate((valid) => {
      if (valid) {
        alert('submit!');
      } else {
        console.log('error submit!!');
        return false;
      }
    });
  },
  onClickSubmit(formName) {
    let _this=this;
    this.$refs[formName].validate((valid) => {
      if (valid) {
        axios.post('/v1/api/user/login',this.ruleForm)
        .then(resp=>{
          var data=resp.data;
          if(data.status=="success") {
            if(data.token&&!data.userInfo) {
              localStorage.setItem('Authorization',resp.data.token);
              _this.$cookies.set('token',resp.data.token);
              const decode = jwt_decode(localStorage.Authorization);
              this.$store.commit('changeUser',decode);
            } else {
              localStorage.setItem('userInfo',data.userInfo);
              this.$store.commit('changeUser',data.userInfo);
            }
            _this.$message({
              showClose:true,
              message:data.message,
              type:'success'
            })
            // console.log(decode);
            this.$router.push({
              name:'index'
           });
            //window.location.href="http://localhost:8080/"
          } else {
            _this.$message({
              showClose:true,
              message:data.message,
              type:'error'
            })
            this.$router.push({
              name:'index',
            })
          }
        })
      } else {
        return false;
      }
   })

  },
  onClickRegister() {
    this.$router.push({
      name:'admin-register'
    })
  }
}
}
</script>
<style scoped>
.container {
	height: 100%;
	background: url('~assets/img/firstpicture.jpg');
}
.login-form {
	padding: 1em;
	width: 25em;
	position: absolute;
	left: 50%;
	top: 30%;
	transform: translate(-50%,-50%);
	background: white;
	border-radius: 0.5em;
}
</style>