<template>

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
          <span>Option 1</span>
        </a-menu-item>
        <a-menu-item key="2">
          <template #icon>
            <DesktopOutlined />
          </template>
          <span>Option 2</span>
        </a-menu-item>
        <a-menu-item key="3">
          <template #icon>
            <InboxOutlined />
          </template>
          <span>Option 3</span>
        </a-menu-item>
        <a-sub-menu key="sub1">
          <template #icon>
            <MailOutlined />
          </template>
          <template #title>Navigation One</template>
          <a-menu-item key="5">Option 5</a-menu-item>
          <a-menu-item key="6">Option 6</a-menu-item>
          <a-menu-item key="7">Option 7</a-menu-item>
          <a-menu-item key="8">Option 8</a-menu-item>
        </a-sub-menu>
        <a-sub-menu key="sub2">
          <template #icon>
            <AppstoreOutlined />
          </template>
          <template #title>Navigation Two</template>
          <a-menu-item key="9">Option 9</a-menu-item>
          <a-menu-item key="10">Option 10</a-menu-item>
          <a-sub-menu key="sub3" title="Submenu">
            <a-menu-item key="11">Option 11</a-menu-item>
            <a-menu-item key="12">Option 12</a-menu-item>
          </a-sub-menu>
        </a-sub-menu>
      </a-menu>
    </a-layout-sider>
</template>

<script>

export default {
  name: 'HeaderAvatar',
  data(){
    return {
      collapsed: false,
      systemName: "Ant Design Vue",
      selectedKeys: ["1"],
      openKeys: ["sub1"],
      preOpenKeys: ["sub1"],
    }
  },
}
</script>

<style lang="less">
  .header-avatar{
    display: inline-flex;
    width: 80px;
    .avatar, .name{
      align-self: center;
    }
    .avatar{
      margin-right: 8px;
    }
    .name{
      font-weight: 500;
    }
  }
  .avatar-menu{
    width: 150px;
  }

</style>
