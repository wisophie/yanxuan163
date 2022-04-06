const skuData={
  // sku数据
  sku: {
    tree: [
      // {
      //   k: "规格", // skuKeyName：规格类目名称
      //   k_s: "s1", // skuKeyStr：sku 组合列表（下方 list）中当前类目对应的 key 值，value 值会是从属于当前类目的一个规格值 id
      //   v: [
      //     {
      //       id: "1", // skuValueId：规格值 id
      //       name: "红色", // skuValueName：规格值名称
      //       imgUrl: "/img/loading.jpg", // 规格类目图片，只有第一个规格类目可以定义图片
      //       // previewImgUrl: "/img/error.jpg", // 用于预览显示的规格类目图片
      //     },
      //   ],
      //   largeImageMode: true, //  是否展示大图模式
      // },
    ],
    // 所有 sku 的组合列表，比如红色、M 码为一个 sku 组合，红色、S 码为另一个组合
    list: [
      // {
      //   id: 2259, // skuId
      //   s1: "1", // 规格类目 k_s 为 s1 的对应规格值 id
      //   s2: "1", // 规格类目 k_s 为 s2 的对应规格值 id
      //   price: 100, // 价格（单位分）
      //   stock_num: 20, // 当前 sku 组合对应的库存
      // },
    ],
    price: "250.00", // 默认价格（单位元）
    stock_num: 50, // 商品总库存
    collection_id: 2261, // 无规格商品 skuId 取 collection_id，否则取所选 sku 组合对应的 id
    none_sku: true, // 是否无规格商品
    // messages: [
    //   {
    //     // 商品留言
    //     datetime: "0", // 留言类型为 time 时，是否含日期。'1' 表示包含
    //     multiple: "0", // 留言类型为 text 时，是否多行文本。'1' 表示多行
    //     name: "留言", // 留言名称
    //     type: "text", // 留言类型，可选: id_no（身份证）, text, tel, date, time, email
    //     required: "1", // 是否必填 '1' 表示必填
    //     placeholder: "", // 可选值，占位文本
    //   },
    // ],
    hide_stock: false, // 是否隐藏剩余库存
  },
  properties:[
    // 商品属性
    {
      k_id: 123, // 属性id
      k: '加猛料', // 属性名
      is_multiple: true, // 是否可多选
      v: [
        {
          id: 1222, // 属性值id
          name: '珍珠', // 属性值名
          price: 200, // 属性值加价
        },
        {
          id: 1223,
          name: '肥仔水',
          price: 500,
        },
        {
          id: 1224,
          name: '奥利给',
          price: 10000,
        },
        {
          id: 1225,
          name: '毒药',
          price: 2000,
        },
      ],
    },
  ],
  stockThreshold:20,	//库存阈值。低于这个值会把库存数高亮显示
  showAddCartBtn:true,//是否显示加入购物车按钮
  addCartText:'',  //加入购物车按钮文字
  quotaUsed:0, //已经购买过的数量
  //商品图
  goods: {
    picture: "/img/error.jpg",
  },
  // 商品 id
  goodsId: '946755',
  // 留言信息
  messages: {
    message_0: '12',
    message_1: ''
  },
  //限购件数
  quota:99,
  // 选择的商品数量
  selectedNum: 1,
}
export default skuData