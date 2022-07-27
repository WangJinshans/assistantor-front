<template>
  <a-dropdown placement="bottomRight">
    <div class="notice-icon">
      <bell-outlined :style="{fontSize: '16px'}"/>
    </div>
    <template #overlay>
      <a-menu>
        <a-menu-item>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="http://www.alipay.com/"
          >
            menu item
          </a>
        </a-menu-item>
        <a-menu-item>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="http://www.taobao.com/"
          >
            menu item
          </a>
        </a-menu-item>
        <a-menu-item>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="http://www.tmall.com/"
          >
            menu item
          </a>
        </a-menu-item>
      </a-menu>
    </template>
  </a-dropdown>
</template>

<script>
import {BellOutlined} from "@ant-design/icons-vue";
export default {
  name: "HeaderNotice",
  components: {
    BellOutlined
  },
};
</script>

<style lang="less">
.notice-icon{
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
 
 span{
    margin: 10px 6px 10px 10px;
    svg {
      margin: 0 auto;
    }
  }
}
</style>
