<template>
  <div id="home" class="wrapper">
    <nav-bar class="home-nav" >
      <div slot="center">购物街</div>
    </nav-bar>
    <!-- ref 是用于定位元素和取到组件的内容，:是绑定属性 @是绑定方法-->
    <scroll class="content" ref="scroll"
            :probe-type="3"
            @scroll="contentScroll"
            :pull-up-load="true"
            @pullingUp="loadMore">
      <home-swiper :banners="banners"></home-swiper>
      <recommend-view :recommends="recommends"></recommend-view>
      <feature-view/>
      <tab-control class="tab-control"
                   :titles="['流行','新款','精选']" @tabClick= "tabClick"/>
      <goods-list :goods="showGoods"/>
    </scroll>
    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
  </div>
</template>

<script>

  import HomeSwiper from './childComps/HomeSwiper'
  import RecommendView from './childComps/HomeRecommendView'
  import FeatureView from './childComps/FeatureView'

  import NavBar from 'components/common/navbar/NavBar'
  import TabControl from 'components/content/tabControl/TabControl'
  import GoodsList from "components/content/goods/GoodsList"
  import Scroll from "components/common/scroll/Scroll";
  import BackTop from "components/content/backTop/BackTop";

  import {getHomeMultidata, getHomeGoods} from 'network/home'

  export default {
    name: "Home",
    components: {
      HomeSwiper,
      RecommendView,
      NavBar,
      TabControl,
      FeatureView,
      GoodsList,
      Scroll,
      BackTop
    },
    data() {
      return {
        banners: [],
        recommends: [],
        goods: {
          'pop': {page: 0, list: []},
          'new': {page: 0, list: []},
          'sell': {page: 0, list: []},
        },
        currentType: 'pop',
        isShowBackTop: false
      }
    },
    computed: {
      showGoods() {
        return this.goods[this.currentType].list
      }
    },
    created() {
      // 1.请求多个数据
      this.getHomeMultidata()
      // 2.请求商品数据
      this.getHomeGoods('pop')
      this.getHomeGoods('new')
      this.getHomeGoods('sell')



    },
    mounted() {
      const refresh = this.debounce(this.$refs.scroll.refresh, 500)
    //3.监听Item中图片加载完成
    this.$bus.$on('itemImageLoad',() => {
        refresh()
      })
    },

    methods: {
      /*
        **事件监听相关的方法
      */
      debounce(func, delay) {
        let timer = null
        return function (...args) {
          if(timer)  clearTimeout(timer)
          timer = setTimeout(() => {
            func.apply(this, args)
          }, delay)
        }
      },
      tabClick(index) {
        switch (index) {
          case 0:
            this.currentType = 'pop'
                break
          case 1:
            this.currentType = 'new'
                break
          case 2:
            this.currentType = 'sell'
                break
        }
      },
      backClick() {
        this.$refs.scroll.scrollTo(0, 0, 500)
      },
      contentScroll(position) {
        this.isShowBackTop = (-position.y) > 1000
      },
      loadMore() {
        this.getHomeGoods(this.currentType)

        // this.$refs.scroll.refresh()
      },

      /*
      **  网络请求方法
       */
      getHomeMultidata() {
        getHomeMultidata().then(res => {
          this.banners = res.data.banner.list;
          this.recommends = res.data.recommend.list;
        })
      },
      getHomeGoods(type) {
        const page = this.goods[type].page + 1
        getHomeGoods(type,page).then(res => {
          // console.log(res);
          // 1,通过遍历的方式存放数组
          // for (let n of res.data.list) {
          //   this.goods[type].list.push(n)
          // }

          // 2.通过解析进行存放
          this.goods[type].list.push(...res.data.list)
          this.goods[type].page += 1

          this.$refs.scroll.finishPullUp()
        })
      }
    }
  }
</script>

<style scoped>
  #home {
    padding-top:44px;
    height: 100vh;
    position: relative;
    touch-action: none;
  }

  .home-nav {
    background-color: var(--color-tint);
    color: #fff;
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 9999;
  }

  .tab-control {
    position: sticky;
    top: 44px;
    z-index: 9;
  }
  .content {
    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;

    /*z-index: -1;*/
  }

  /*.content {*/
  /*  height: calc(100% - 93px);*/
  /*  overflow: hidden;*/
  /*  !*margin-top: 44px;*!*/
  /*}*/
</style>
