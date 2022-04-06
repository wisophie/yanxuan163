import Vue from "vue";
import {
  Lazyload,
  Button,
  Search,
  Swipe,
  SwipeItem,
  Popup,
  Tabbar,
  TabbarItem,
  Grid,
  GridItem,
  Card,
  Tag,
  NavBar,
  Sidebar,
  SidebarItem,
  Icon,
  DropdownMenu,
  DropdownItem,
  List,
  Cell,
  GoodsAction,
  GoodsActionIcon,
  GoodsActionButton,
  Pagination,
  Sku,
  Checkbox,
  CheckboxGroup,
  Stepper,Overlay,Form,Field,Toast,SubmitBar
} from "vant";

Vue.use(Button).use(Overlay).use(Form ).use(Field).use(Toast).use(SubmitBar)
  .use(Pagination)
  .use(Sku)
  .use(Checkbox)
  .use(Card)
  .use(Stepper)
  .use(CheckboxGroup)
  .use(Cell)
  .use(List)
  .use(GoodsAction)
  .use(GoodsActionButton)
  .use(GoodsActionIcon)
  .use(DropdownMenu)
  .use(DropdownItem)
  .use(Search)
  .use(Swipe)
  .use(SwipeItem)
  .use(Popup)
  .use(Tabbar)
  .use(TabbarItem)
  .use(Grid)
  .use(GridItem)
  .use(Card)
  .use(NavBar)
  .use(Sidebar)
  .use(SidebarItem)
  .use(Tag)
  .use(Icon);

Vue.use(Lazyload, {
  // error: "/img/loading.jpg",
  // loading: "/img/error.jpg",
  error: require('../../public/img/loading.jpg'),
  loading:  require('../../public/img/error.jpg'),
  attempt: 1,
});

Vue.filter("money", (val) => {
  return "￥ " + (+val).toFixed(2) + " 元";
});
