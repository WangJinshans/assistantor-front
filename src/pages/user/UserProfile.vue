JS
<template>
  <a-table
    :columns="columns"
    :data-source="data"
    @change="onChange"
  />
</template>
<script>
import { defineComponent, reactive, toRefs, onMounted } from "vue";
import { fetchTopStockInfo } from "@/api/stock";
const columns = [
  {
    title: "名称",
    dataIndex: "name",
    // specify the condition of filtering result
    // here is that finding the name started with `value`
    onFilter: (value, record) => record.name.indexOf(value) === 0,
    align:'center'
  },
  {
    title: "代码",
    dataIndex: "code",
    sorter: (a, b) => a.code - b.code,
    sortDirections: ["descend"],
    align:'center'
  },
  {
    title: "涨跌幅",
    dataIndex: "shares_range",
    filterMultiple: false,
    onFilter: (value, record) => record.address.indexOf(value) === 0,
    sorter: (a, b) => a.shares_range - b.shares_range,
    sortDirections: ["descend", "ascend"],
    align:'center'
  },
  {
    title: "分析",
    dataIndex: "content",
    align:'center'
  },
  {
    title: "价格",
    dataIndex: "price",
    filterMultiple: false,
    onFilter: (value, record) => record.address.indexOf(value) === 0,
    sorter: (a, b) => a.price - b.price,
    sortDirections: ["descend", "ascend"],
    align:'center'
  }
];

export default defineComponent({
  setup() {
    var stockInfo = reactive({
      data: []
    });
    const onChange = (pagination, filters, sorter) => {
      console.log("params", pagination, filters, sorter);
    };

    onMounted(() => {
      fetchTopStockInfo().then(data => {
        stockInfo.data = data;
      });
    });

    return {
      columns,
      onChange,
      ...toRefs(stockInfo)
    };
  }
});
</script>