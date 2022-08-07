<template>

  <a-dropdown placement="bottom">
    <div class="header-avatar" style="cursor: pointer" @click="userClick">
      <a-avatar class="avatar" size="small" shape="circle" :src="user.avatar"/>
      <span class="name">{{user.name}}</span>
    </div>
    <template #overlay>
      <a-menu class="avatar-menu">
        <a-menu-item>
          <a
            target="_blank"
            rel="noopener noreferrer"
            @click="profileClick"
          >
            个人中心
          </a>
        </a-menu-item>
        <a-menu-item>
          <a
            target="_blank"
            rel="noopener noreferrer"
            @click="settingClick"
          >
            设置
          </a>
        </a-menu-item>
        <a-menu-item>
          <a
            target="_blank"
            rel="noopener noreferrer"
            @click="signout"
          >
            退出登录
          </a>
        </a-menu-item>
      </a-menu>
    </template>
  </a-dropdown>
</template>

<script>
import { logout } from "@/api/login";

export default {
  name: 'HeaderAvatar',
  data(){
    return {
      user: {
        name: "Jack",
        avatar: "https://joeschmoe.io/api/v1/random",
      }
    }
  },
  methods: {
    userClick() {
      let token = localStorage.getItem('token')
      if (token == null){
        this.$router.push('/login')
      }
    },
    settingClick() {
      this.$router.push('/user/setting')
    },
    profileClick() {
      this.$router.push('/user/profile')
    },
    signout() {
      let userId = localStorage.getItem('user_id')
      let data = {}
      data.user_id = userId
      logout(data)
      localStorage.removeItem('user_id')
      localStorage.removeItem('token')
    }
  }
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
