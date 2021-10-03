<template>
  <div>
    <!-- Table View -->
    <a-table
      :columns="columns"
      :data-source="data"
      @change="onChange"
      style="padding: 0px"
      :customRow="customRow"
    >
      <span slot="action">
        <a-button icon="delete">Delete</a-button>
      </span>
    </a-table>
  </div>
</template>

<script>
import axios from "axios";

import WebConstants from '../../constants.json';

const columns = [
  {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      sorter: (a, b) => {
      let A = a.id.toUpperCase();
      let B = b.id.toUpperCase();
      if (A < B) {
        return -1;
      }
      if (A > B) {
        return 1;
      }
      return 0;
    },
    sortDirections: ["descend", "ascend"],
  },
  {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      sorter: (a, b) => {
      let A = a.name.toUpperCase();
      let B = b.name.toUpperCase();
      if (A < B) {
        return -1;
      }
      if (A > B) {
        return 1;
      }
      return 0;
    },
    sortDirections: ["descend", "ascend"],
  },
  {
      title: 'Product',
      dataIndex: 'product_type',
      key: 'product_type',
      sorter: (a, b) => {
      let A = a.product_type.toUpperCase();
      let B = b.product_type.toUpperCase();
      if (A < B) {
        return -1;
      }
      if (A > B) {
        return 1;
      }
      return 0;
    },
    sortDirections: ["descend", "ascend"],
  },
  {
      title: 'Phone',
      dataIndex: 'phone_no'
  },
  {
      title: 'Email',
      dataIndex: 'email'
  },
  {
    title: "",
    width: 100,
    scopedSlots: { customRender: "action" },
  }
];

export default {
    data() {
        return {
            WebConstants,
            columns,
            data : ''
        }
    },
    created() {
        axios.get(WebConstants.server.adderss + WebConstants.api.supplier.getAll).then((response) => {
            this.data = response.data.results;
            console.log(this.data);
        });
    }
}
</script>

<style>

</style>