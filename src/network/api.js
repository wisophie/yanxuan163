import http from "./request";
//获取首页信息
export const getHome = () => http.get("/index/index");

//获取首页跳转的商品分类
export const getShopCategory = (id) => http.get(`goods/category?id=${id}`);

//获取商品分类的商品列表
export const getShopList = ({ categoryId, page = 1, size = 50 }) =>
  http.get(`/goods/list`, {
    params: {
      categoryId,
      page,
      size,
    },
  });

//获取品牌制造商详细信息
export const getBrandDetail = (id) => http.get("/brand/detail?id="+id);

//获取专题信息
export const getTopic = (page = 1, size = 10) =>
  http.get(`/topic/list?page=${page}&size=${size}`);

//获取全部分类信息
export const getCate = () => http.get("/catalog/index");

//获取当前分类数据
export const getCurrentCate = (id) => http.get("/catalog/current?id=" + id);

//显示搜索历史
export const getSearchHistory = () => http.get("/search/index");

//获取搜索提示
export const getSearchTips = (keyword) =>
  http.get("/search/helper?keyword=" + keyword);

//获取搜索数据
export const getSearchList = ({
  keyword,
  page,
  size,
  order,
  categoryId,
  sort = "id",
}) =>
  http.get("/goods/list", {
    params: {
      keyword,
      page,
      size,
      order,
      categoryId,
      sort,
    },
  });

//获取商品详细信息
export const getShopDetail = (id) => http.get("/goods/detail?id=" + id);

//获取商品推荐信息
export const getshopRelated = (id) => http.get("/goods/related?id=" + id);

//登录功能
export const loginUp = (params) => http.post("/auth/loginByWeb", params);

//加入购物车
let token = localStorage.getItem("token");
export const addCart = ({ goodsId, productId, number }) =>
  http.post("/cart/add", { goodsId, productId, number },{headers:{'X-Nideshop-Token':token}});

//获取购物车数量
export const getCartNumber = () => http.get("/cart/goodscount",{headers:{'X-Nideshop-Token':token}});

//获取购物车数据
export const getCartList = () => http.get("/cart/index",{headers:{'X-Nideshop-Token':token}});

//添加商品数量
export const addGoodsNumber = (params) => http.post("/cart/update",params,{headers:{'X-Nideshop-Token':token}});

//切换商品选中状态
export const switchGoodsChecked = (params) => http.post("/cart/checked",params,{headers:{'X-Nideshop-Token':token}});

