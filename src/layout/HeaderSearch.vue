<template>
  <input class="search" type="text" name="search" placeholder="站内搜索...">
</template>

<script>
import {
  SearchOutlined,
} from "@ant-design/icons-vue";
export default {
  name: "HeaderSearch",
  components: {
    SearchOutlined,
  },
  data() {
    return {
      value: ''
    };
  }
};
</script>

<style lang="less">
.search {
  width: 120px; /* 设定起始宽度 */
  float: right;
  outline: none; 
  border:transparent;
  border-radius: 4px;
  font-size: 16px;
  background-color: white;
  background-size: 23px;
  background-image: url('@/assets/img/search.png');
  background-position: center right 10px;
  background-repeat: no-repeat;
  transition: width 0.4s ease-in-out; /* 设置宽度改变时的动画 */
}

.search:focus {
  width: 300px;
}
</style>
