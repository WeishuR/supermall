<template>
  <div class="recommend">
      <div v-for="item in recommends"  class="recommend-item">
          <a :href="item.link">
              <img :src="item.image" alt="">
              <div>{{item.title}}</div>
          </a>
      </div>
  </div>
</template>

<script>
export default {
    name: "HomeRecommendView",
    props: {
        recommends: {
            type: Array,
            default() {
                return []
            }
        }
    }
}
</script>

<style scoped>
    .recommend {
        display: flex;
        text-align: center;
        width: 100%;
        font-size: 12px;
        padding: 10px 0 10px;
        border-bottom: 10px solid #eee;
    }
    .recommend img {
        width: 80%;
        margin-bottom: 10px;
    }

    .recommend-item {
        flex: 1;
    }
</style>
