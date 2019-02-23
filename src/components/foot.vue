<template>
	<div class="nav">
	    <ul>
	        <li @click="go(val)" v-for="val in list" :class="{act:val.title==isSelect}">
				<img :src="val.title==isSelect?val.newUrl:val.oldUrl">
	            <span>{{val.text}}</span>
	        </li>
	    </ul>
	</div>
</template>

<script>
	export default {
	  name: 'foot',
	  data () {
	    return {
		  isSelect: "homePage",
	      list: [
			  {text:'首页',jumpUrl:'/homePage',title:'homePage',oldUrl:'./static/img/shengji_grey.png',newUrl:'./static/img/shengji.png'},
			  {text:'批准升级',jumpUrl:'/approvalLevelUp',title:'approvalLevelUp',oldUrl:'./static/img/pizhun_grey.png',newUrl:'./static/img/pizhun.png'},
			  {text:'个人中心',jumpUrl:'/personalCenter',title:'personalCenter',oldUrl:'./static/img/geren_grey.png',newUrl:'./static/img/geren.png'},
			  {text:'推广链接',jumpUrl:'/promotionLinks',title:'promotionLinks',oldUrl:'./static/img/tuijian_grey.png',newUrl:'./static/img/tuijian.png'},
		  ],
		  
	    }
	  },
	  methods:{
		  go(item){
			this.$router.push(item.jumpUrl);
		  }
	  },
	  mounted(){
		  this.isSelect = this.$route.name;
	  }
	}
</script>

<style scoped>
	.nav{
	    position: fixed;
		z-index: 999;
	    bottom: 0;
	    left: 0;
	    width: 100vw;
	    height: .92rem;
	    box-shadow:0px -2px 5px 0px rgba(0, 0, 0, 0.3);
	}
	.nav ul{
	    width: 100vw;
	    height: .92rem;
	    display: flex;
	    justify-content: space-around;
	}
	.nav ul li{
	    display: flex;
	    flex-direction: column;
	    justify-content: center;
	    align-items: center;
	    margin-top: .12rem;
	}
	.nav ul li img{
	    width: .47rem;
	    height: .41rem;
		margin-bottom: .05rem;
	}
	.act{
		color: red;
	}
</style>
