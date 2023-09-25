<template>
  <div class="container">
  	<div class="login-form">
	  <el-form :model="ruleForm" ref="ruleForm" :rules="rules" label-width="80px">
	    <el-form-item label="用户名" prop="userName">
	      <el-input placeholder="请输入用户名" v-model="ruleForm.userName"></el-input>
	    </el-form-item>
	    <el-form-item label="密码" prop="password">
		  <el-input placeholder="请输入密码" v-model="ruleForm.password" show-password></el-input>
	    </el-form-item>
	    <el-form-item label="确认密码" prop="checkPass">
		  <el-input type="password" placeholder="请再次输入密码" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
		</el-form-item>
	    <el-form-item label="昵称" prop="nickName">
		  <el-input placeholder="请输入昵称" v-model="ruleForm.nickName"></el-input>
	    </el-form-item>
	    <el-form-item label="邮件" prop="email">
		  <el-input placeholder="请输入邮件" v-model="ruleForm.email"></el-input>
	    </el-form-item>    
	    <el-form-item>
	      <el-button type="primary" @click="onClcikRegister('ruleForm')">注册</el-button>
	      <el-button type="primary" @click="onClcikLogin()">登录</el-button>
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
  var validateCheckPass = (rule,value,callback) => {
  	if (value === '') {
  		callback(new Error('请再次输入密码'));
  	} else if (value !== this.ruleForm.password) {
  		callback(new Error('两次输入密码不一致!'));
  	} else {
  		callback();
  	}
  }
  return {
    ruleForm: {
      userName: '',
      password:'',
      checkPass:'',
      nickName:'',
      email:''
    },
    rules: {
      userName: [
        { required: true, message: '请输入用户名', trigger: 'blur' }
      ],
      password: [
        { required: true, message: '请输入用户密码', trigger: 'blur' }
      ],
      checkPass: [
      	{ validator: validateCheckPass, required:true, trigger:'blur' }
      ],
      nickName:[
        { required: true, message: '请输入昵称', trigger:'blur' }
      ],
      email:[
      	{ required: true, message: '请输入邮箱', trigger:'blur' }
      ],
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
  onClcikRegister(formName) {
  	let _this = this;
  	var user = {
  	  'userName':_this.ruleForm.userName,
  	  'password':_this.ruleForm.password,
  	  'nickName':_this.ruleForm.nickName,
  	  'email':_this.ruleForm.email
  	}
  	this.$refs[formName].validate((valid) => {
  	  if (valid) {
  	  	axios.post('/v1/api/user/add',user)
  	  	.then(resp=>{
  	  		var data=resp.data;
  	  		if(data.status=="success") {
  	  		  localStorage.setItem('Authorization',resp.data.token);
              _this.$cookies.set('token',resp.data.token);
              _this.$message({
                showClose:true,
                message:data.message,
              })
              const decode = jwt_decode(localStorage.Authorization);
              this.$store.commit('changeUser',decode);
              // console.log(decode);
              this.$router.push({
                name:'index'
              }); 
  	  		} else {
              _this.$message({
                showClose:true,
                message:data.message,
                type:'error'
              })
              this.$refs[formName].resetFields();
  	  		}
  	  	})
  	  }
  	})

  },
  onClickSubmit() {
    //先验证
    
    let _this=this;
    axios.post('/v1/api/user/login',this.ruleForm)
    .then(resp=>{
      var data=resp.data;
      if(data.status=="success") {
        localStorage.setItem('Authorization',resp.data.token);
        _this.$cookies.set('token',resp.data.token);
        _this.$message({
          showClose:true,
          message:data.message,
        })
        const decode = jwt_decode(localStorage.Authorization);
        this.$store.commit('changeUser',decode);
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
  },
  onClcikLogin() {
  	this.$router.push({
  		name:'admin-login'
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