<template>
  <div id='login'>
    <div class="top"></div>
    <div class="login">
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
      >
        <a-tabs
          size="large"
          :tabBarStyle="{textAlign: 'center'}"
          style="padding: 0 2px;"
          centered
        >
          <a-tab-pane
            tab="账户密码登录"
            key="1"
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
          </a-tab-pane>
          <a-tab-pane
            tab="手机号登录"
            key="2"
          >
            <a-form-item>
              <a-input
                size="large"
                placeholder="mobile number"
              >
                <a-icon type="mobile" />
              </a-input>
            </a-form-item>
            <a-form-item>
              <a-row
                :gutter="8"
                style="margin: 0 -4px"
              >
                <a-col :span="16">
                  <a-input
                    size="large"
                    placeholder="captcha"
                  >
                    <a-icon type="mail" />
                  </a-input>
                </a-col>
                <a-col
                  :span="8"
                  style="padding-left: 4px"
                >
                  <a-button
                    style="width: 100%"
                    class="captcha-button"
                    size="large"
                  >获取验证码</a-button>
                </a-col>
              </a-row>
            </a-form-item>
          </a-tab-pane>
        </a-tabs>
        <div class="login-option">
          <a-checkbox :checked="true">自动登录</a-checkbox>
          <a style="float: right">忘记密码</a>
        </div>
        <a-form-item>
          <a-button
            :loading="logging"
            style="width: 100%; margin-top: 24px"
            size="large"
            htmlType="submit"
            type="primary"
          >登录</a-button>
        </a-form-item>
        <div class="other-login">
          <div class="other-login-dv">
            <span style="font-size: 16px">其他登录方式</span>
            <AlipayCircleOutlined class="other-login-icon" />
            <TaobaoCircleOutlined
              class="other-login-icon"
              :style="{color: '#08c'}"
            />
            <WechatOutlined
              class="other-login-icon"
              :style="{color: '#3CB371'}"
            />
          </div>
          <router-link to="/register">注册账户</router-link>
        </div>
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
import { login, getPublicKey } from "@/api/login";
import { JSEncrypt } from "jsencrypt";

export default {
  name: "Login",
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
      // this.form.validateFields((err) => {
      //   if (!err) {
      //     this.logging = true
      //     const name = this.form.getFieldValue('name')
      //     const password = this.form.getFieldValue('password')
      //     // login(name, password).then(this.afterLogin)
      //   }
      // })
      let loginData = {};
      let rsaPassWord = this.ras_encrypt();
      loginData.pass_word = rsaPassWord;
      loginData.user_name = this.formInfo.user_name;

      console.log(`rsaPassWord is: ${rsaPassWord}`);
      var res = login(loginData, this.ctx_id).then(data => {
        this.afterLogin(data);
      });
      // console.log(`user name is: ${this.formInfo.username}, password is: ${this.formInfo.password}`)
    },

    ras_encrypt() {
      let encryptStr = new JSEncrypt();
      encryptStr.setPublicKey(this.pub_key); // 设置 加密公钥
      let data = encryptStr.encrypt(this.formInfo.pass_word); // 进行加密
      return data;
    },

    afterLogin(data) {
      // this.logging = false
      let loginRes = data.message;
      let token = data.token;
      let userId = data.user_id;
      console.log(`token is: ${token}`);
      localStorage.setItem("token", token);
      localStorage.setItem("user_id", userId);
      if (loginRes === "success") {
        this.$router.push("/");
      }
    }
  }
};
</script>

<style lang="less" scoped>
#login {
  border: none;
  height: inherit;
  background-color: #f1f1f1;
  background-position: center center;
  background-image: url("@/assets/img/register.jpg");
  // background-image: url('@/assets/img/login.jpg');
  background-repeat: no-repeat;
  background-size: cover;
  background-attachment: fixed;
}
.top {
  text-align: center;
  padding: 112px 0 10px;
}

.login {
  width: 368px;
  margin-left: 150px;
  
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
