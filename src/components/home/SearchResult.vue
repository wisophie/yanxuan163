<template>
  <div>
    <div class="tag1">
      <div class="title">
        <h3>历史记录</h3>
        <van-icon name="delete-o" />
      </div>
      <ul>
        <li v-for="(item, index) in historyKeywordList" :key="index">
          <van-tag plain size="medium" @click="tagClick(item)">{{ item }}</van-tag>
        </li>
      </ul>
    </div>
    <div class="tag2">
      <div class="title">
        <h3>热门搜索</h3>
      </div>
      <ul>
        <li v-for="(item, index) in hotKeywordList" :key="index">
          <van-tag
           @click="tagClick(item.keyword)"
            plain
            size="medium"
            :class="{ HotColor: item.is_hot == 1 }"
            >{{ item.keyword }}</van-tag>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  props: ["hotKeywordList", "historyKeywordList"],
  data() {
    return {};
  },
  methods:{
    tagClick(val){
      this.$emit('queryClick',val)
    }
  }
};
</script>

<style lang="scss" scoped>
.tag1,
.tag2 {
  padding: 10px 15px;
  background: #fff;
  .title {
    display: flex;
    justify-content: space-between;
    h3 {
      font-size: 18px;
      margin-bottom: 10px;
    }
    i {
      font-size: 24px;
      color: #000;
    }
  }
  ul {
    display: flex;
    flex-wrap: wrap;
    li {
      margin: 10px 12px 0 0;
    }
  }
}
.tag2 {
  margin-top: 20px;
}
//热门搜索颜色
.HotColor {
  color: deeppink;
}
</style>
