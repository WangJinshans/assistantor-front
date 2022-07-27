<template>
  <div>
    <div class="top">
      <div class="header">
        <img
          alt="logo"
          class="logo"
          src="@/assets/img/logo.png"
        />
        <span class="title">{{ systemName }}</span>
      </div>
      <div class="desc">It's free and alawys will be</div>
    </div>
    <div class="register">
      <a-form
        @submit="onSubmit"
        :model="formInfo"
      >
            <a-alert
              type="error"
              :closable="true"
              v-show="error"
              :message="error"
              showIcon
              style="margin-bottom: 24px"
            />
            <a-form-item>
              <a-input
                autocomplete="autocomplete"
                size="large"
                placeholder="admin"
                v-model:value="formInfo.user_name"
              >
                <!-- <a-icon type="user" /> -->
              </a-input>
            </a-form-item>
            <a-form-item>
              <a-input
                size="large"
                placeholder="888888"
                autocomplete="autocomplete"
                type="password"
                v-model:value="formInfo.pass_word"
              >
                <a-icon type="lock" />
              </a-input>
            </a-form-item>
        <a-form-item>
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
    getPublicKey().then(data => {
      this.pub_key = data.message;
      this.ctx_id = data.ctx_id;
    });
  },
  data() {
    return {
      formInfo: {
        user_name: "",
        pass_word: ""
      },
      pub_key: "",
      pri_key: "",
      ctx_id: "",
      logging: false,
      error: ""
      // form: this.$form.createForm(this)
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
      let encryptStr = new JSEncrypt()
      encryptStr.setPublicKey(this.pub_key) // 设置 加密公钥
      let data = encryptStr.encrypt(this.formInfo.pass_word) // 进行加密
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
.top {
  text-align: center;
  padding: 112px 0 10px;
  .header {
    height: 44px;
    line-height: 44px;
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

.register {
  width: 368px;
  margin: 0 auto;
  @media screen and (max-width: 576px) {
    width: 95%;
  }
  @media screen and (max-width: 320px) {
    .captcha-button {
      font-size: 14px;
    }
  }

  .login-option {
    display: flex;
    justify-content: space-between;
    flex-direction: row;
  }

  .other-login {
    display: flex;
    justify-content: space-between;
    flex-direction: row;

    .other-login-dv {
      height: 100%;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;

      .other-login-icon {
        line-height: 24px;
        margin-left: 10px;
        font-size: 24px;
        cursor: pointer;
        transition: color 0.3s;
      }
    }
  }
}
</style>
