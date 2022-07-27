<template>
  <a-layout>
    <a-layout-sider :class="collapsed == false ? 'ant-un-collapsed-layout-sider': 'ant-collapsed-layout-sider'"
      v-model:collapsed="collapsed"
      :trigger="null"
      collapsible
    >
      <router-link to="/" class="logo">
        <img src="@/assets/img/logo.png" />
        <div class="app-name">
          <transition name="slide-fade">
            <span v-if="collapsed == false" key="name">{{ systemName }}</span>
            <span v-else key="empty"></span>
          </transition>
        </div>
      </router-link>

      <a-menu
        v-model:openKeys="openKeys"
        v-model:selectedKeys="selectedKeys"
        @select="onSelect"
        mode="inline"
        theme="dark"
      >
        <a-menu-item key="1">
          <template #icon>
            <PieChartOutlined />
          </template>
          <span>全球大盘</span>
        </a-menu-item>
        <a-sub-menu key="stock">
          <template #icon>
            <MailOutlined />
          </template>
          <template #title>股池笔记</template>
          <a-menu-item key="2">笔记信息</a-menu-item>
          <a-menu-item key="3">添加笔记</a-menu-item>
        </a-sub-menu>
        <a-menu-item key="4">
          <template #icon>
            <InboxOutlined />
          </template>
          <span>大事件日历(美联储议息等)</span>
        </a-menu-item>
        <a-menu-item key="1000">
          <template #icon>
            <DesktopOutlined />
          </template>
          <span>热点消息</span>
        </a-menu-item>
        <a-menu-item key="4000">
          <template #icon>
            <InboxOutlined />
          </template>
          <span>异动信息</span>
        </a-menu-item>
        <a-sub-menu key="sub1">
          <template #icon>
            <MailOutlined />
          </template>
          <template #title>前期强势</template>
          <a-menu-item key="5">10日线低吸</a-menu-item>
          <a-menu-item key="6">20日线低吸</a-menu-item>
          <a-menu-item key="7">A杀反弹</a-menu-item>
          <a-menu-item key="8">Option 8</a-menu-item>
        </a-sub-menu>
        <a-sub-menu key="sub2">
          <template #icon>
            <AppstoreOutlined />
          </template>
          <template #title>个股信息</template>
          <a-menu-item key="9">公告</a-menu-item>
          <a-menu-item key="10">Option 10</a-menu-item>
          <a-sub-menu key="sub3" title="Submenu">
            <a-menu-item key="11">Option 11</a-menu-item>
            <a-menu-item key="12">Option 12</a-menu-item>
          </a-sub-menu>
        </a-sub-menu>
      </a-menu>
    </a-layout-sider>

    <a-layout>
      <a-layout-header class="layout-header">
        <menu-unfold-outlined
          v-if="collapsed"
          class="trigger"
          @click="toggleCollapsed"
        />
        <menu-fold-outlined v-else class="trigger" @click="toggleCollapsed" />
        <div class="header-info">
          <header-search/>
          <header-notice/>
          <header-avatar class="user-avatar"/>
        </div>
      </a-layout-header>
      <a-divider style="height: 2px; background-color: #7cb305; margin-top: -1px; margin-bottom: 0px;" />
      <a-layout-content class="layout-content">
        <a-layout-header id='content-header'>
          <!-- <a-tabs v-model:activeKey="activeKey" hide-add type="editable-card" @tabClick='clickTable'>
            <a-tab-pane key="1" tab="Tab 1" :closable="true">Content of Tab Pane 1</a-tab-pane>
            <a-tab-pane key="2" tab="Tab 2" force-render :closable="true">Content of Tab Pane 2</a-tab-pane>
            <a-tab-pane key="30" tab="Tab 3" :closable="true">Content of Tab Pane 3</a-tab-pane>
          </a-tabs> -->

          <a-tabs v-model:activeKey="activeKey" hide-add type="editable-card" @edit="onEdit" @tabClick='clickTable'>
            <a-tab-pane v-for="pane in panes" :key="pane.key" :tab="pane.title" :closable="pane.closable">
            </a-tab-pane>
          </a-tabs>
        </a-layout-header>
        <div class="content">
          <router-view></router-view>
        </div>
      </a-layout-content>
      <a-layout-footer>Ant Design ©2018 Created by Ant UED</a-layout-footer>
    </a-layout>
  </a-layout>
</template>
<script>
import {
  BellOutlined,
  UserOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  PieChartOutlined,
  MailOutlined,
  DesktopOutlined,
  InboxOutlined,
  AppstoreOutlined,
  SearchOutlined,
} from "@ant-design/icons-vue";
import HeaderAvatar from './HeaderAvatar';
import HeaderNotice from './HeaderNotice';
import HeaderSearch from './HeaderSearch';

import { reactive, toRefs, ref } from "vue";
import { routes } from "@/router";

export default {
  components: {
    BellOutlined,
    UserOutlined,
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    PieChartOutlined,
    MailOutlined,
    DesktopOutlined,
    InboxOutlined,
    AppstoreOutlined,
    SearchOutlined,
    HeaderAvatar,
    HeaderNotice,
    HeaderSearch,
  },
  methods: {
    toggleCollapsed: function () {
      this.collapsed = !this.collapsed;
      this.openKeys = this.collapsed ? [] : this.preOpenKeys;
      if (this.collapsed) {
        this.selectedKeys = [];
      }
      this.count += 10;
      this.$store.commit("setCount", this.count);
      console.log("this.$store.getters.getCount is:",this.$store.getters.getCount);
    },

    getRouterLink: function (key) {
      // 优化成递归
      var path = "/";
      routes.forEach((item) => {
        if(item.key == key) {
          path = item.path
          return
        } else if (item.children !=null){
          console.log(`item is: ${JSON.stringify(item.children)}`)
          for(var i=0;i<item.children.length;i++){
            var child = item.children[i]
            if (child.key == key){
              path = child.path
              return path
            }
          }
        }
      });
      return path
    },

    onSelect: function (target) {
      const { key, selectedKeys } = target;
      let path = this.getRouterLink(selectedKeys);
      console.log(`path is: ${this.getRouterLink(key)}`);
      this.$router.push(path);
    },
    
    clickTable:function(element){
      console.log(`click tab is: ${element}`)
      this.$router.push('/userProfile')
    }
  },
  setup() {
    const state = reactive({
      collapsed: false,
      count: 10,
      systemName: "Ant Design Vue",
      selectedKeys: ["1"],
      openKeys: ["sub1"],
      preOpenKeys: ["sub1"],
      value: '',
      activeKey: ref(1)
    });

    // const toggleCollapsed = () => {
    //   state.collapsed = !state.collapsed;
    //   state.openKeys = state.collapsed ? [] : state.preOpenKeys;
    //   if (state.collapsed) {
    //     state.selectedKeys = [];
    //   }
    // };
    // return { ...toRefs(state), ...methods, toggleCollapsed };

    const panes = ref([{
      title: 'Tab 1',
      key: '1',
    }, {
      title: 'Tab 2',
      key: '2',
    }, {
      title: 'Tab 3',
      key: '3',
    }]);
    const activeKey = ref(panes.value[0].key);
    const newTabIndex = ref(0);

    const add = () => {
      activeKey.value = `newTab${++newTabIndex.value}`;
      panes.value.push({
        title: 'New Tab',
        content: 'Content of new Tab',
        key: activeKey.value,
      });
    };

    const remove = targetKey => {
      let lastIndex = 0;
      if (panes.value.length === 1){
        // 禁止关闭最后一个tab
        return 
      }
      panes.value.forEach((pane, i) => {
        if (pane.key === targetKey) {
          lastIndex = i - 1;
        }
      });
      panes.value = panes.value.filter(pane => pane.key !== targetKey);

      if (panes.value.length && activeKey.value === targetKey) {
        if (lastIndex >= 0) {
          activeKey.value = panes.value[lastIndex].key;
        } else {
          activeKey.value = panes.value[0].key;
        }
      }
    };

    const onEdit = (targetKey, action) => {
      if (action === 'add') {
        add();
      } else {
        remove(targetKey);
      }
    };
    return { ...toRefs(state), panes, activeKey, onEdit };
  },
};
</script>
<style lang="less">

.site-layout .site-layout-background {
  background: #fff;
}
.ant-menu-item {
  margin: 0 !important; // 菜单项之间的缝隙会影响点击
}
.slide-fade-enter-active {
  transition: all 0.1s;
  opacity: 0;
}
.slide-fade-enter {
  opacity: 0;
}

.layout-header {
  background: #fff;
  padding: 0;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  
  .header-info{
    display: flex;
    flex-direction: row;

    .ant-input-search{
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;

      svg{
        margin-left: 2px;
      }
    }

    .user-avatar{
      margin-left: 10px;
      margin-right: 20px;
    }
  }

  svg {
    width: 25px;
    height: 25px;
    margin-left: 20px;
  }
}

.ant-un-collapsed-layout-sider {
  flex: 0 0 264px !important;
  width: 264px !important;
  height: calc(100vh) !important;
  max-width: 264x !important;
  min-width: 264px !important;

  .logo {
    display: flex;
    flex-direction: row;

    img {
      margin: 18px 10px 6px 20px;
      width: 28px;
      height: 32px;
    }
  }
}

.ant-collapsed-layout-sider {
  flex: 0 0 80px !important;
  width: 80px !important;
  height: calc(100vh) !important;
  max-width: 80x !important;
  min-width: 80px !important;

  .logo {
    display: flex;
    flex-direction: row;

    img {
      margin: 18px 10px 6px 26px;
      width: 28px;
      height: 32px;
    }
  }
}

.app-name {
  line-height: 64px;
  height: 64px;
  font-size: 18px;
}


.layout-content{ 
  margin-top: 0px; 
  background: '#fff'; 
  display: flex;
  flex-direction: column;
  justify-content: flex-start;

  #content-header{
    background: #fff; 
    height: 39px; 
    width: 100%;
    padding-left:15px;
    padding-right: 0px;

    .ant-tabs-nav{
      height: inherit;
      margin-bottom: 0px;

      .ant-tabs-tab-with-remove{
        margin-left: 0px;
      }
    }
  }

  .content {
    margin: 3px 2px; 
    height: 100%;
    background: '#fff'; 
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }
}

.ant-tabs-editable{
  height: inherit;
  // justify-content: center;
  align-items:flex-start;
}

</style>