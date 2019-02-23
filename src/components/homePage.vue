<template>
    <div class="homePage">
        <div class="home">
            <div class="banner">
                <van-swipe :autoplay="3000" indicator-color="white">
                    <van-swipe-item v-for="item in imgLists" :key="item"><img :src="item"></van-swipe-item>
                </van-swipe>
            </div>
            <div class="level-now">
                <span>当前等级</span>
                <span>V{{level}}</span>
            </div>
            <div class="level-up">
                <span>升至V{{tolevel}}</span>
                <span>￥{{amount}}</span>
            </div>
            <div class="upgrade">
                <div class="pic-left" @click="showUpMethod"></div>
                <span>我要升级</span>
            </div>
            <div class="gameShow">
                <div class="pic-right"></div>
                <span>升级说明</span>
            </div>
            <div class="upMethod" v-if="display">
                <h3>加微信好友，发红包升级</h3>
                <p class="wechat">微信：{{weChat}}<span class="copy" :data-clipboard-text="weChat" type="text">复制</span></p>
                <p class="tel">电话：{{telphone}}</p>
                <div class="close" @click="close">+</div>
            </div>
        </div>
		<foot></foot>
    </div>
</template>

<script>
import Clipboard from 'clipboard'
import foot from './foot'
import { Swipe, SwipeItem } from 'vant'
import { Toast } from 'vant';

let clipboard = new Clipboard('.copy')
export default {
  name: 'homePage',
  data () {
    return {
        display: false,
		level: '',
        amount: '10',
        weChat: '',
        telphone: '',
        imgLists: [],
        tolevel: '',
    }
  },
  components:{
	  foot
  },
  methods: {
      showUpMethod(){
          this.$axios.post('/user/do_upgrade',{id:localStorage.id}).then((res) => {
              if (this.level<5) {
                  this.display = true;
                  this.weChat = res.data.wchat;
                  this.telphone = res.data.phone;
              }else{
                  Toast('已经是最高级别')
              }
          })
      },
      close(){
          this.display = false;
      }
  },
  mounted() {
      this.level = localStorage.lev;
      this.tolevel = (Number(localStorage.lev) + 1) == 5 ? 5 : (Number(localStorage.lev) + 1);
      this.$axios.post('/user/get_banner',{}).then((res) => {
          var imgArr = res.data.content;
          var imgList = [];
          imgArr.forEach((val) => {
              imgList.push(val.img);
          });
          this.imgLists = imgList;
      })
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import url('../assets/css/homePage.css');
</style>
