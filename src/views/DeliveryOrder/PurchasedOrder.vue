<template>
  <div>
    <h1>Accepted Orders</h1>

    <a-table
      :columns="columns"
      :data-source="data"
      @change="onChange"
      style="padding: 0px"
      :customRow="customRow"
    >
      <span slot="action" slot-scope="record">
        <a-button  size="small" @click="viewOrder(record)">View</a-button>
        <a-button type="danger" icon="delete" size="small" style="margin-left:20px" @click="deleteOrder(record)">Delete</a-button>
      </span>
    </a-table>

       <!-- Model -->
    <div>
      <a-modal v-model="visible" :title="model.order_id" on-ok="handleOk" :centered="true" width="700px">
       
        <div>
          <p><b>Order ID :  </b>{{model.order_id}}</p>
          <p><b>Requisition ID :  </b>{{model.requisition_id}}</p>
          <p><b>Quantity :  </b>{{model.quantity}}</p>
          <p><b>Amount :  </b>{{model.amount}}</p>
          <p><b>Delivery_charge :  </b>{{model.delivery_charge}}</p>
          <p><b>Site Name  :  </b>{{model.site_name}}</p>
          <p><b>Supplier ID :  </b>{{model.supplier_id}}</p>
          <p><b>Delivery Address :  </b>{{model.delivery_address}}</p>
          <p><b>Supplier Approval :  </b>{{model.supplier_approval}}</p>
          <p><b>Payment Status :  </b>{{model.payment_status}}</p>
          <p><b>Delivery Date :  </b>{{model.delivery_date}}</p>
        </div>
      </a-modal>
    </div>


  </div>
</template>



<script>
// Import libraries
import axios from "axios";
import "vue-resource";

const columns = [
  {
    title: "Requisition ID",
    dataIndex: "requisition_id",
    sorter: (a, b) => {
      let RequisitionA = a.requisition_id.toUpperCase();
      let RequisitionB = b.requisition_id.toUpperCase();
      if (RequisitionA < RequisitionB) {
        return -1;
      }
      if (RequisitionA > RequisitionB) {
        return 1;
      }
      return 0;
    },
    sortDirections: ["descend", "ascend"],
  },

  {
    title: "Order ID",
    dataIndex: "order_id",
    sorter: (a, b) => {
      let OrderA = a.order_id.toUpperCase();
      let OrderB = b.order_id.toUpperCase();
      if (OrderA < OrderB) {
        return -1;
      }
      if (OrderA > OrderB) {
        return 1;
      }
      return 0;
    },
    sortDirections: ["descend", "ascend"],
  },

  {
    title: "Supplier ID",
    dataIndex: "supplier_id",
    width: "20%",
  },

  {
    title: "Status",
    scopedSlots: { customRender: "action" }
  },
];

function onChange(pagination, filters, sorter) {
  console.log("params", pagination, filters, sorter);
}

export default {
  data() {
    return {
      hello: "Hello",
      data: '',
      columns,
      loading: false,
      visible: false,
      search: "",
      model: {
        order_id: "",
        requisition_id: "",
        quantity: "",
        amount: "",
        delivery_charge: "",
        site_name: "",
        supplier_id: "",
        delivery_address: "",
        supplier_approval: "",
        payment_status: "",
        delivery_date: "",
      },
    };
  },

  created() {
    /**
     get all accepted order details from API
     */

    axios
      .get("http://127.0.0.1:8000/api/purchasedOrders/allPurchasedOrders")
      .then((response) => {
        this.data = response.data.orders;
        console.log(this.data);
      });
  },

  methods: {
    onChange,
    showModal(e) {
      this.visible = true;
      console.log(e);
    },


    customRow(record) {
      return {
        on: {
          click: (event) => {
            /**
             * Can use event and record
             */
            this.model = record;
            this.showModal();
            console.log(event);
            console.log(this.model);
          },
        },
      };
    },

    openNotificationSuccess(message, description) {
      /**
       * Notification toast success
       */
      this.$notification.open({
        message: message,
        duration: 5,
        icon: <a-icon type="like" theme="filled" style="color: #27ae60" />,
        description: description,
        onClick: () => {
          console.log("Notification Clicked!");
        },
      });
    },
    openNotificationUnsuccess(message, description) {
      /**
       * Notification toast unsuccess
       */
      this.$notification.open({
        message: message,
        duration: 8,
        icon: <a-icon type="dislike" theme="filled" style="color: #c0392b" />,
        description: description,
        onClick: () => {
          console.log("Notification Clicked!");
        },
      });
    },
   
    deleteOrder(record) {
      console.log(record.id);
      this.$http.delete('http://127.0.0.1:8000/api/purchasedOrders/deleteCompletedOrder/'+record.id).then(
              function (response) {
                console.log(record.id);
                this.data.splice(
                  this.data.findIndex((e) => e === record),
                  1
                );
                console.log(response);
                this.notification('success', 'Supplier Unegistered', 'Supllier ID ' + response.body.supplier.id);
              },
              (error) => {
                console.log(error);
                this.notification('unsuccess', 'Supplier Cannot Unregistered', 'Server error! ' + error.status + " " + error.statusText)
              }
            );
    },
  },
};
</script>
<style >
</style>
