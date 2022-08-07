<template>
  <div id='register_page'>
    <div class="top"></div>
    <div class="register">
      <div class="header">
        <img
          alt="logo"
          class="logo"
          src="@/assets/img/logo.png"
        />
        <span class="title">{{ systemName }}</span>
      </div>
      <div class="desc">It's free and alawys will be</div>
      <a-form
        @submit="onSubmit"
        :model="formInfo"
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
      >
        <a-alert
          type="error"
          :closable="true"
          v-show="error"
          :message="error"
          showIcon
          style="margin-bottom: 24px"
        />
        <a-form-item label="邮箱">
          <a-input
            autocomplete="autocomplete"
            size="large"
            placeholder="邮箱"
            v-model:value="formInfo.email"
          >
          </a-input>
        </a-form-item>
        <a-form-item label="昵称">
          <a-input
            autocomplete="autocomplete"
            size="large"
            placeholder="昵称"
            v-model:value="formInfo.user_name"
          >
          </a-input>
        </a-form-item>
        <a-form-item label="密码">
          <a-input
            size="large"
            placeholder="密码"
            autocomplete="autocomplete"
            type="password"
            v-model:value="formInfo.pass_word"
          >
            <a-icon type="lock" />
          </a-input>
        </a-form-item>
        <a-form-item label="确认密码">
          <a-input
            size="large"
            placeholder="确认密码"
            autocomplete="autocomplete"
            type="password"
            v-model:value="formInfo.comfirm_password"
          >
            <a-icon type="lock" />
          </a-input>
        </a-form-item>
        <a-form-item label="性别">
          <a-radio-group v-model:value="formInfo.gender">
            <a-radio value="1">男</a-radio>
            <a-radio value="2">女</a-radio>
          </a-radio-group>
        </a-form-item>
        <a-form-item :wrapper-col="{ span: 8, offset: 8 }">
          <a-button
            :loading="logging"
            style="width: 100%; margin-top: 24px"
            size="large"
            htmlType="submit"
            type="primary"
          >注册</a-button>
        </a-form-item>
      </a-form>
    </div>
  </div>
</template>

<script>
import {
  TaobaoCircleOutlined,
  AlipayCircleOutlined,
  WechatOutlined
} from "@ant-design/icons-vue";
import { register, getPublicKey } from "@/api/login";
import { JSEncrypt } from "jsencrypt";

export default {
  name: "Register",
  components: {
    TaobaoCircleOutlined,
    AlipayCircleOutlined,
    WechatOutlined
  },
  mounted() {
    // 设置label的高度
    // let label = document.querySelector('.ant-form-item-label label')
    // label.style.height = '40px'

    var label_list = document.getElementsByClassName("ant-form-item-label");
    for (var i = 0; i < label_list.length; i++) {
      let element = label_list[i]
      element.style.textAlign = 'center'
      if (i != 4) {
        element.children[0].style.height = "42px";
      }
    }

    getPublicKey().then(data => {
      this.pub_key = data.message;
      this.ctx_id = data.ctx_id;
    });
  },
  data() {
    return {
      formInfo: {
        user_name: "",
        pass_word: "",
        gender: "",
        comfirm_password: "",
        email: ""
      },
      pub_key: "",
      pri_key: "",
      ctx_id: "",
      logging: false,
      error: "",
      labelCol: {
        span: 5
      },
      wrapperCol: {
        span: 16
      }
    };
  },
  computed: {
    systemName() {
      return this.$store.getters.getSystemName;
    }
  },
  methods: {
    onSubmit(e) {
      e.preventDefault();
      let registerData = {};
      let rsaPassWord = this.ras_encrypt();
      registerData.pass_word = rsaPassWord;
      registerData.user_name = this.formInfo.user_name;

      var res = register(registerData, this.ctx_id).then(data => {
        this.afterLogin(data);
      });
    },

    ras_encrypt() {
      let encryptStr = new JSEncrypt();
      encryptStr.setPublicKey(this.pub_key); // 设置 加密公钥
      let data = encryptStr.encrypt(this.formInfo.pass_word); // 进行加密
      return data;
    },

    afterLogin(data) {
      // this.logging = false
      const loginRes = data.message;
      if (loginRes === "success") {
        this.$router.push("/");
      }
    }
  }
};
</script>

<style lang="less" scoped>

#register_page{
  border: none;
  height: inherit;
  background-color: #f1f1f1;
  background-position: center center;
  background-image: url('@/assets/img/register.jpg');
  // background-image: url('@/assets/img/login.jpg');
  background-repeat: no-repeat;
  background-size: cover;
  background-attachment: fixed;
}
.top {
  text-align: center;
  padding: 112px 0 10px;
}

.register {
  width: 400px;
  margin-left: 150px;
  // border: solid #f7f7f7 2px;
  // box-sizing: border-box;
  // border-radius: 4px;
  // background-color: #fafafa;

  @media screen and (max-width: 576px) {
    width: 95%;
  }
  @media screen and (max-width: 320px) {
    .captcha-button {
      font-size: 14px;
    }
  }

  .header {
    height: 44px;
    line-height: 44px;
    margin-top: 15px;
    box-shadow: 2px;
    a {
      text-decoration: none;
    }
    .logo {
      height: 44px;
      vertical-align: top;
      margin-right: 16px;
    }
    .title {
      font-size: 33px;
      color: #000;
      font-family: "Myriad Pro", "Helvetica Neue", Arial, Helvetica, sans-serif;
      font-weight: 600;
      position: relative;
      top: 2px;
    }
  }
  .desc {
    font-size: 14px;
    margin-top: 12px;
    margin-bottom: 40px;
  }
}
</style>
