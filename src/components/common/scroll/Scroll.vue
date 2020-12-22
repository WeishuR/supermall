<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>

  </div>
</template>

<script>
import BScroll from 'better-scroll'

export default {
  name: "Scroll",
  props: {
    probeType: {
      type: Number,
      default: 0
    },
    pullUpLoad: {
      type: Boolean,
      default: false
    },
  },
  data() {
    return {
      scroll: null
    }
  },
  mounted() {
    // 1.初始化BScroll对象
    this.$nextTick(() => {
      this.scroll = new BScroll(this.$refs.wrapper, {
        probeType: this.probeType,
        pullUpLoad: this.pullUpLoad,
        click: true,
        observeDOM: true,
        mouseWheel: true,

        // tap: true
      })
      // 2.监听滚动的位置
      this.scroll.on('scroll',(position) => {
        this.$emit('scroll', position)
      })

      // 3.监听上拉事件
      this.scroll.on('pullingUp', () => {
        this.$emit('pullingUp')
      })

    })

  },
  methods: {
    scrollTo(x, y, time=500) {
      this.scroll.scrollTo(x, y, time)
    },
    finishPullUp() {
      this.scroll.finishPullUp()
    },
    refresh() {
      console.log('----');
      this.scroll && this.scroll.refresh()
    }
  }
}



</script>

<style scoped>

</style>
