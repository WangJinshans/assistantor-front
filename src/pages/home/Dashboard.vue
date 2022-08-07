<template>
  <div>
    <div class="board">
      <KLine
        v-if="stock_data"
        title="上证指数"
        :data=stock_data
      ></KLine>
      <KLine
        v-if="chuangyeban_data"
        title="创业板指"
        :data=chuangyeban_data
      ></KLine>
      <KLine
        v-if="shenzheng_data"
        title="深圳成指"
        :data=shenzheng_data
      ></KLine>
      <!-- <KLine title="富时A50" :data=data></KLine>
        <KLine title="恒生指数" :data=data></KLine>
        <KLine title="恒生科技指数" :data=data></KLine>
        <KLine title="道琼斯指数" :data=data></KLine>
        <KLine title="纳斯达克指数" :data=data></KLine> -->
    </div>
    <div class="stock-table">
      <div>
        <span>
          <h3>亚洲</h3>
        </span>
        <a-table
          :dataSource="this.asia_data_source"
          :columns="this.columns"
          :pagination="{ pageSize: 3, size: 'small' }"
          :size="table_size"
        >
          <!-- <template slot="custom_rate_display" slot-scope="rate">
            {{ rate+100 }}
          </template> -->
        </a-table>
      </div>
      <div>
        <span>
          <h3>美洲</h3>
        </span>
        <a-table
          :dataSource="this.amer_data_source"
          :columns="this.columns"
          :pagination="{ pageSize: 3, size: 'small' }"
          :size="table_size"
        />
      </div>
      <div>
        <span>
          <h3>欧洲</h3>
        </span>
        <a-table
          :dataSource="this.europ_data_source"
          :columns="this.columns"
          :pagination="{ pageSize: 3, size: 'small' }"
          :size="table_size"
        />
      </div>
      <div>
        <span>
          <h3>澳洲</h3>
        </span>
        <a-table
          :dataSource="this.aus_data_source"
          :columns="this.columns"
          :pagination="{ pageSize: 3, size: 'small' }"
          :size="table_size"
        />
      </div>
    </div>
  </div>
</template>

<script>
import KLine from "@/components/KLine";
import {
  fetchStockHistoryInfo,
  fetchAsiaStockInfo,
  fetchEuropStockInfo,
  fetchAmerStockInfo,
  fetchAusStockInfo
} from "@/api/stock";
export default {
  components: {
    KLine
  },
  data() {
    return {
      table_size: "small",
      stock_data: null,
      chuangyeban_data: null,
      shenzheng_data: null,
      a50_data: null,
      hengsheng_data: null,
      hengsheng_keji_data: null,
      daoqiongsi_data: null,
      nasidake_data: null,

      asia_data_source: [],
      europ_data_source: [],
      amer_data_source: [],
      aus_data_source: [],

      columns: [
        {
          title: "名称",
          dataIndex: "stock_name",
          key: "stock_name"
        },
        {
          title: "最新价",
          dataIndex: "current_price",
          key: "current_price"
        },
        {
          title: "涨跌幅",
          dataIndex: "current_rate",
          key: "current_rate",
          customRender: state => {
            // console.log(`state is: ${JSON.stringify(state.record.current_rate)}`);
            return state.record.current_rate + "%";
          }
        }
      ]
    };
  },
  async mounted() {
    var shangzheng = {
      stock_id: "000001",
      stock_market: "1"
    };
    var chuangyeban = {
      stock_id: "399006",
      stock_market: "0"
    };
    var shenzheng = {
      stock_id: "399001",
      stock_market: "0"
    };

    fetchAsiaStockInfo().then(data => {
      this.asia_data_source = data.message;
    });

    fetchAmerStockInfo().then(data => {
      this.amer_data_source = data.message;
    });
    fetchEuropStockInfo().then(data => {
      this.europ_data_source = data.message;
    });
    fetchAusStockInfo().then(data => {
      this.aus_data_source = data.message;
    });

    fetchStockHistoryInfo(shenzheng).then(data => {
      var k_nodes = data.message;
      var data_list = [];
      for (var index = 0; index < k_nodes.length; index++) {
        var l = [];
        var time = k_nodes[index]["time_string"];
        var open = k_nodes[index]["open_price"];
        var close = k_nodes[index]["close_price"];
        var lowest_price = k_nodes[index]["lowest_price"];
        var highest_price = k_nodes[index]["highest_price"];
        var vol = k_nodes[index]["vol"];
        // time open close min max vol
        l.push(time, open, close, lowest_price, highest_price, vol);
        data_list.push(l);
      }

      this.shenzheng_data = data_list;
    });

    fetchStockHistoryInfo(shangzheng).then(data => {
      var k_nodes = data.message;
      var data_list = [];
      for (var index = 0; index < k_nodes.length; index++) {
        var l = [];
        var time = k_nodes[index]["time_string"];
        var open = k_nodes[index]["open_price"];
        var close = k_nodes[index]["close_price"];
        var lowest_price = k_nodes[index]["lowest_price"];
        var highest_price = k_nodes[index]["highest_price"];
        var vol = k_nodes[index]["vol"];
        // time open close min max vol
        l.push(time, open, close, lowest_price, highest_price, vol);
        data_list.push(l);
      }

      this.stock_data = data_list;
    });

    fetchStockHistoryInfo(chuangyeban).then(data => {
      var k_nodes = data.message;
      var data_list = [];
      for (var index = 0; index < k_nodes.length; index++) {
        var l = [];
        var time = k_nodes[index]["time_string"];
        var open = k_nodes[index]["open_price"];
        var close = k_nodes[index]["close_price"];
        var lowest_price = k_nodes[index]["lowest_price"];
        var highest_price = k_nodes[index]["highest_price"];
        var vol = k_nodes[index]["vol"];
        // time open close min max vol
        l.push(time, open, close, lowest_price, highest_price, vol);
        data_list.push(l);
      }

      this.chuangyeban_data = data_list;
    });
  }
};
</script>

<style lang="less" scoped>
.board {
  height: 100%;
  display: flex;
  flex-wrap: nowrap;
}
.stock-table {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-between;

  div {
    // border: solid red 2px;
    height: 290px;
    width: 350px;
  }
}
</style>