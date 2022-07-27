<template>
  <a-form
    :model="formState"
    :label-col="labelCol"
    :wrapper-col="wrapperCol"
    style="width:500px"
  >
    <a-form-item label="股票代码">
      <a-input v-model:value="formState.stockId" />
    </a-form-item>
    <a-form-item label="股票名称">
      <a-input v-model:value="formState.stockName" />
      <!-- <a-select
            v-model:value="formState.stockName"
            placeholder="please select your zone"
          >
            <a-select-option value="shanghai">Zone one</a-select-option>
            <a-select-option value="beijing">Zone two</a-select-option>
          </a-select> -->
    </a-form-item>
    <a-form-item label="消息">
      <a-input
        v-model:value="formState.message"
        type="textarea"
      />
    </a-form-item>
    <a-form-item label="类型">
      <a-select
        v-model:value="formState.type"
        placeholder="选择类型"
      >
        <!-- 
                  up_and_down: 冲高回落上影线 up: 小阳线 uup: 中阳线  uuup:大阳线  down:小阴线 ddown: 中阴线 dddown:大阴线  face_pressure: 前期压力位
                  w1: 先上涨,上影线打到前高,回调  w2: 第二次冲击前高  w3: 第三次冲击前高 reverse: 反向情绪
              -->
        <a-select-option value="up">小阳线</a-select-option>
        <a-select-option value="uup">中阳线</a-select-option>
        <a-select-option value="uuup">大阳线</a-select-option>
        <a-select-option value="down">小阴线</a-select-option>
        <a-select-option value="ddown">中阴线</a-select-option>
        <a-select-option value="dddown">大阴线</a-select-option>
        <a-select-option value="face_pressure">前期压力位</a-select-option>
        <a-select-option value="w1"> 先上涨,上影线打到前高,回调</a-select-option>
        <a-select-option value="w2">第二次冲击前高</a-select-option>
        <a-select-option value="w3">第三次冲击前高</a-select-option>
        <a-select-option value="reverse">反向情绪</a-select-option>
        <a-select-option value="up_and_down"> 冲高回落上影线</a-select-option>
      </a-select>
    </a-form-item>
    <a-form-item label="地位">
      <a-select
        v-model:value="formState.stockPosition"
        placeholder="选择地位"
      >
        <a-select-option value="1">龙头</a-select-option>
        <a-select-option value="2">龙二</a-select-option>
        <a-select-option value="3">龙三</a-select-option>
        <a-select-option value="4">跟风</a-select-option>
      </a-select>
    </a-form-item>
    <a-form-item label="个股强势">
      <a-switch v-model:checked="formState.isStockPositive" />
    </a-form-item>
    <a-form-item label="板块强势">
      <a-switch v-model:checked="formState.isBankPositice" />
    </a-form-item>
    <a-form-item :wrapper-col="{ span: 14, offset: 4 }">
      <a-button
        type="primary"
        @click="onSubmit"
      >Create</a-button>
      <a-button style="margin-left: 10px">Cancel</a-button>
    </a-form-item>
  </a-form>
</template>
<script>
import { ref, reactive, defineComponent } from "vue";
export default defineComponent({
  setup() {
    const formState = reactive({
      stockId: "",
      stockName: "",
      type: "",
      message: "",
      ready: false,
      isStockPositive: false,
      isBankPositice: false,
      targetPrice: 0,
      stockPosition: "",
      bankName: "",
      bankId: ""
    });

    const keyboard = ref(true);
    const width = 800;

    const onSubmit = () => {
      console.log("submit!");
    };

    return {
      width,
      labelCol: {
        span: 4
      },
      wrapperCol: {
        span: 14
      },
      formState,
      onSubmit
    };
  }
});
</script>