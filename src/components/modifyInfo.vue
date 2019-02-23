<template>
    <div class="modifyInfo">
        <div class="title">
            <span @click="$router.go(-1)">返回</span>
            <h3>修改个人信息</h3>
        </div>
        <form v-on:submit.prevent>
            <div>
                <div class="phoneSymbol"></div>
                <input type="text" placeholder="请输入手机号" v-model="telphone">
            </div>
            <div class="seg"></div>
            <div>
                <div class="wechatSymbol"></div>
                <input type="text" placeholder="请输入微信号" v-model="wechat">
            </div>
            <div class="seg"></div>
            <div>
                <div class="emailSymbol"></div>
                <input type="text" placeholder="请输入邮箱号" v-model="email">
            </div>
            <div class="seg"></div>
            <div>
                <div class="pswSymbol"></div>
                <input :type="visibleType1" placeholder="请输入密码" v-model="passwordMod">
                <div class="visibleSymbol" @click="isVisible1"></div>
            </div>
            <div class="seg"></div>
            <div>
                <div class="pswSymbol"></div>
                <input :type="visibleType2" placeholder="请确认密码" v-model="passwordComfirmMod">
                <div class="visibleSymbol" @click="isVisible2"></div>
            </div>
            <div class="seg"></div>
            <button type="submit" class="submit-btn" @click="submit">提交</button>
        </form>
    </div>
</template>

<script>
import { Toast } from 'vant';
export default {
  name: 'modifyInfo',
  data () {
    return {
      state: true,
      visibleType1:  'password',
      visibleType2:  'password',
      telphone: '',
      passwordMod: '',
      wechat: '',
      email:  '',
      passwordComfirmMod:  '',
	  regTel: /^1(3|4|5|7|8)\d{9}$/,
	  regEmail: /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/,
	  regWechat: /^[a-zA-Z][a-zA-Z0-9_-]{5,19}$/,
	  regPsw: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,16}$/
    }
  },
  methods: {
    isVisible1(){
        this.visibleType1 = this.visibleType1 == 'password' ? 'text' : 'password';
    },
    isVisible2(){
        this.visibleType2 = this.visibleType2 == 'password' ? 'text' : 'password';
    },
	submit(){
		if (!this.telphone) {
			Toast('请输入手机号');
			return false;
		}else if(!this.regTel.test(this.telphone)){
			Toast('请输入正确的手机号');
			return false;
		}
		if (!this.wechat) {
			Toast('请输入微信号');
			return false;
		}else if(!this.regWechat.test(this.wechat)){
			Toast('请输入正确的微信号');
			return false;
		}
		if (!this.email) {
			Toast('请输入邮箱号');
			return false;
		}else if(!this.regEmail.test(this.email)){
			Toast('请输入正确的邮箱号');
			return false;
		}
		if (!this.passwordMod) {
			Toast('请输入密码');
			return false;
		}else if(!this.regPsw.test(this.passwordMod)){
			Toast('请输入正确的密码格式:由数字和字母组成，并且要同时含有数字和字母，且长度要在8-16位之间');
			return false;
		}
		if (!this.passwordComfirmMod) {
			Toast('请输入密码');
			return false;
		}else if(this.passwordComfirmMod != this.passwordMod){
			Toast('两次密码输入不正确');
			return false;
		}
		this.$router.push('/personalCenter');
	}
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import url('../assets/css/modifyInfo.css');
</style>
