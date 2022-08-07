<template>
  <div
    id="qrcode"
    style="margin:0 auto;width:200px;height:200px"
  ></div>
</template>


<script>
import QRCode from "qrcodejs2";
export default {
  name: "QrCodeC",
  data() {
    return {
      res: ""
    };
  },
  props: ["content"],
  mounted() {
      this.bindQRCode()
  },
  methods: {
    bindQRCode: function() {
      var contents = this.content;
      new QRCode("qrcode", {
        width: 200,
        height: 200,
        text: contents // 二维码中的信息
      });
    }
  }
};
</script>