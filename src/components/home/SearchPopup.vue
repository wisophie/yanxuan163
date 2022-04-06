<template>
  <div class="search">
    <van-search
      v-model="searchVal"
      show-action
      placeholder="请输入搜索关键词"
      @search="onSearch"
      @cancel="$router.back()"
      @input="input"
    />
    <search-tips
      :tips="tips"
      :searchVal.sync="searchVal"
      v-if="bool1"
      @queryClick="queryClick"
    />
    <search-list v-if="bool2" :queryData="queryData" @updateDate="updateDate" />
    <search-result
      @queryClick="queryClick"
      v-if="bool"
      :historyKeywordList="historyKeywordList"
      :hotKeywordList="hotKeywordList"
    />
  </div>
</template>

<script>
import { getSearchHistory, getSearchTips, getSearchList } from "@/network/api";
import SearchResult from "./SearchResult.vue";
import SearchList from "./SearchList.vue";
import SearchTips from "./SearchTips.vue";
export default {
  components: { SearchResult, SearchList, SearchTips },
  data() {
    return {
      bool: true,
      bool1: true,
      bool2: false,
      searchVal: "",
      historyKeywordList: [],
      hotKeywordList: [],
      tips: [],
      queryData: [],
    };
  },
  async created() {
    let { data } = await getSearchHistory();
    this.historyKeywordList = data.historyKeywordList;
    this.hotKeywordList = data.hotKeywordList;
  },
  methods: {
    onSearch() {
      this._getSearchList({});
    },
    //点击搜索事件
    queryClick(val) {
      this.searchVal = val;
      this._getSearchList({});
    },
    //获取搜索提示
    async _getSearchTips() {
      let { data } = await getSearchTips(this.searchVal);
      this.tips = data;
    },
    //获取搜索数据
    async _getSearchList({keyword,page = 1,size = 20,order='' ,categoryId = 0,sort}){
      let { data } = await getSearchList({
        keyword: this.searchVal,
        page,
        size,
        order,
        categoryId,
        sort
      })
      this.bool1 = false;
      this.bool = false;
      this.bool2 = true;
      this.queryData = data;
    },
    //搜索提示
    input() {
      this._getSearchTips();
      this.bool = false;
      this.bool1 = true;
      this.bool2 = false;
    },
    //更新数据
    updateDate({id,order,sort}) {
      this._getSearchList({ categoryId: id,order,sort});
    },
  },
};
</script>
<style lang="scss" scoped>
.search {
  position: absolute;
  top: 0;
  width: 100%;
  min-height: 100%;
  background: #efefef;
  z-index: 99;
  overflow: hidden;
  .van-search__content {
    border-radius: 15px;
  }
}
</style>
