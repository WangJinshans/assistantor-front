<template>
  <div class="mark-board">
    <div class="add-area">
      <a-button
        type="primary"
        @click="showModal"
      >新增笔记</a-button>
      <a-modal
        title="Title"
        height="400px"
        v-model:visible="visible"
        :confirm-loading="confirmLoading"
        :width="width"
        :keyboard="keyboard"
        @ok="handleOk"
      >
        <AddMarkPanel></AddMarkPanel>
      </a-modal>
    </div>

    <a-table
      :columns="columns"
      :data-source="data"
      @change="onChange"
    >
      <template #action="{ text }">
        <a :href=text.link>查看详情</a>
      </template>
    </a-table>
  </div>
</template>
<script>
import { ref, reactive, defineComponent, onMounted, toRefs } from "vue";
import { addStockMark, fetchStockMarkInfo } from "@/api/stock";
import AddMarkPanel from "@/components/AddMarkPanel";

const columns = [
  {
    title: "名称",
    dataIndex: "stockName",
    onFilter: (value, record) => record.stockName.indexOf(value) === 0,
    align: "center"
  },
  {
    title: "代码",
    dataIndex: "stockId",
    sorter: (a, b) => a.stockId - b.stockId,
    sortDirections: ["descend"],
    align: "center"
  },
  {
    title: "备注",
    dataIndex: "message"
    // align: "center"
  },
  {
    title: "类型",
    dataIndex: "type",
    align: "center"
  },
  {
    title: "是否到位",
    dataIndex: "ready",
    align: "center"
  },
  {
    title: "是否有主动性",
    dataIndex: "isStockPositive",
    align: "center"
  },
  {
    title: "板块是否活跃",
    dataIndex: "isBankPositive",
    align: "center"
  },
  {
    title: "操作",
    key: "operation",
    align: "center",
    fixed: "right",
    width: 100,
    slots: {
      customRender: "action"
    }
  }
];
export default defineComponent({
  components: {
    AddMarkPanel
  },
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
    const modalText = ref("Content of the modal");
    const visible = ref(false);
    const confirmLoading = ref(false);

    const showModal = () => {
      visible.value = true;
    };

    const rowclick = (record, index) => {
      console.log(12222);

      return {
        on: {
          click: () => {
            console.log(record, index, 2222);
          },
          dblclick: () => {
            console.log(record, index, 2222);
          }
        }
      };
    };

    const handleOk = () => {
      modalText.value = "The modal will be closed after two seconds";
      console.log(`form data is: ${JSON.stringify(formState.ready)}`);
      formState.ready = formState.ready ? 1 : 0;
      formState.isStockPositive = formState.isStockPositive ? 1 : 0;
      formState.isBankPositice = formState.isBankPositice ? 1 : 0;

      addStockMark(formState).then(data => {
        console.log(`response data: ${JSON.stringify(data)}`);
      });
      visible.value = false;
      confirmLoading.value = false;
      //   setTimeout(() => {
      //     visible.value = false;
      //     confirmLoading.value = false;
      //   }, 2000);
    };
    var stockInfo = reactive({
      data: []
    });
    const onChange = (pagination, filters, sorter) => {
      console.log("params", pagination, filters, sorter);
    };

    onMounted(() => {
      fetchStockMarkInfo().then(data => {
        stockInfo.data = data.message;
      });
    });

    return {
      modalText,
      visible,
      keyboard,
      confirmLoading,
      showModal,
      handleOk,
      width,
      labelCol: {
        span: 4
      },
      wrapperCol: {
        span: 14
      },
      formState,
      columns,
      onChange,
      rowclick,
      ...toRefs(stockInfo)
    };
  }
});
</script>


<style lang="less" scoped>
.mark-board {
    display: flex;
    flex-direction: column;
    padding-left: 10px;
    padding-right: 10px;
    width: 100%;
    height: 88%;
    
  .add-area {
    display: flex;
    flex-direction: column;
    justify-content: right;
  }
}
</style>