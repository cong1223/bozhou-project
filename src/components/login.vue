<template>
  <div class="login">
    <div class="logo"></div>
    <div class="btn">
      <div class="log" @click="changePage(1)" :class="{active: state}"><span>登陆</span></div>
      <div class="reg" @click="changePage(0)" :class="{active: !state}"><span>注册</span></div>
    </div>
    <form class="log-page login-page" v-if="state">
      <div class="phoneArea">
        <div class="pnoneSymbol"></div>
        <input type="text" placeholder="请输入手机号码" v-model="telphone">
      </div>
      <div class="passwordArea">
        <div class="pswSymbol"></div>
        <input :type="visibleTypeLog" placeholder="请输入密码" v-model="passwordLog">
        <div class="visibleSymbol" @click="isVisibleLog"></div>
      </div>
      <p @click="$router.push('reset')">忘记密码？</p>
      <!-- <router-link to="reset">忘记密码？</router-link> -->
      <button type="submit" class="submit-btn" @click="login">登陆</button>
    </form>
    <form class="log-page reg-page" v-else>
      <div class="phoneArea">
        <div class="reg-id"></div>
        <input type="text" placeholder="编号" v-model="id">
      </div>
      <div class="passwordArea reg-pswArea">
        <div class="reg-phone"></div>
        <input type="text" placeholder="请输入手机号" v-model="telphoneReg">
      </div>
      <div class="passwordArea reg-pswArea">
        <div class="reg-wechat"></div>
        <input type="text" placeholder="请输入微信号" v-model="wechat">
      </div>
      <div class="passwordArea reg-pswArea">
        <div class="reg-email"></div>
        <input type="text" placeholder="请输入邮箱号" v-model="email">
      </div>
      <div class="passwordArea reg-pswArea">
        <div class="pswSymbol"></div>
        <input :type="visibleTypeReg1" placeholder="请输入密码" v-model="passwordReg">
        <div class="visibleSymbol" @click="isVisibleReg1"></div>
      </div>
      <div class="passwordArea reg-pswArea">
        <div class="pswSymbol"></div>
        <input :type="visibleTypeReg2" placeholder="请确认密码" v-model="passwordComfirmReg">
        <div class="visibleSymbol" @click="isVisibleReg2"></div>
      </div>
      <button type="submit" class="submit-btn" @click="registered">提交注册</button>
      <h6>注册须知</h6>
    </form>
  </div>
</template>

<script>
import { Toast } from 'vant';
export default {
  name: 'login',
  data () {
    return {
      state: true,
      visibleTypeLog:  'password',
      visibleTypeReg1:  'password',
      visibleTypeReg2:  'password',
      telphone: '',
      telphoneReg: '',
      passwordLog: '',
      passwordReg: '',
      id: '',
      wechat: '',
      email:  '',
      passwordComfirmReg:  '',
			regTel: /^1(3|4|5|7|8)\d{9}$/,
			regEmail: /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/,
      regPsw: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,16}$/,
    }
  },
  methods: {
    changePage(num) { 
      this.state = num;
    },
    isVisibleLog(){
      this.visibleTypeLog = this.visibleTypeLog == 'password' ? 'text' : 'password';
    },
    isVisibleReg1(){
      this.visibleTypeReg1 = this.visibleTypeReg1 == 'password' ? 'text' : 'password';
    },
    isVisibleReg2(){
      this.visibleTypeReg2 = this.visibleTypeReg2 == 'password' ? 'text' : 'password';
    },
		login(){
			if (!this.telphone) {
				Toast('请输入手机号');
				return false;
			}else if(!this.regTel.test(this.telphone)){
				Toast('请输入正确的手机号');
				return false;
			}
			if (!this.passwordLog) {
			 	Toast('请输入密码');
			 	return false;
      }
      var postDataLog = {
        phone: this.telphone,
        pwd: this.passwordLog
      }
      this.$axios.post('/user/login',postDataLog).then((res) => {
        if (res.data.code == 200) {
          localStorage.id = res.data.content.id;
          localStorage.phone = res.data.content.phone;
          localStorage.wchat = res.data.content.wchat;
          localStorage.email = res.data.content.mail;
          localStorage.lev = res.data.content.lev;
          this.$router.push('/homePage');
        }else{
          Toast('登陆失败');
        }
      })
			
		},
		registered(){
			if (!this.id) {
				Toast('请输入编号');
				return false;
			}
			if (!this.telphoneReg) {
				Toast('请输入手机号');
				return false;
			}else if(!this.regTel.test(this.telphoneReg)){
				Toast('请输入正确的手机号');
				return false;
			}
			if (!this.wechat) {
				Toast('请输入微信号');
				return false;
			}
			if (!this.email) {
				Toast('请输入邮箱号');
				return false;
			}else if(!this.regEmail.test(this.email)){
				Toast('请输入正确的邮箱号');
				return false;
			}
			if (!this.passwordReg) {
				Toast('请输入密码');
				return false;
			}else if(!this.regPsw.test(this.passwordReg)){
				Toast('请输入正确的密码格式:由数字和字母组成，并且要同时含有数字和字母，且长度要在8-16位之间');
				return false;
			}
			if (!this.passwordComfirmReg) {
				Toast('请输入密码');
				return false;
			}else if(this.passwordComfirmReg != this.passwordReg){
				Toast('两次密码输入不正确');
				return false;
      }
      var postDataReg = {
        phone: this.telphoneReg,
        pwd: this.passwordReg,
        pid: this.id,
        mail: this.email,
        wchat: this.wechat
      }
      var successData = {
        phone: postDataReg.phone,
        pwd: postDataReg.pwd
      }
      this.$axios.post('/user/regist',postDataReg).then((res) => {
        if(res.data.code == 200){
          Toast('注册成功，即将登陆');
          this.$axios.post('/user/login',successData).then((res) => {
            localStorage.id = res.data.content.id;
            localStorage.phone = res.data.content.phone;
            localStorage.wchat = res.data.content.wchat;
            localStorage.email = res.data.content.mail;
            localStorage.lev = res.data.content.lev;
            this.$router.push('/homePage');
          })
        }else{
          Toast(res.data.msg);
        }
      })
		}
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import url('../assets/css/login-style.css');
</style>
