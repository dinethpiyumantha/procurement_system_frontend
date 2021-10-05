<template>
  <div>
    <div class="container">
        <h2>My Requisitions</h2>
        <h3 style="color: #888; line-height: 10px">{{ new Date() | moment("dddd, MMMM Do YYYY") }}</h3>
        <a-input-search placeholder="input search text" style="margin: 20px 0px;" size="large" @search="onSearch" />
    </div>

    <!-- Table View -->
    <a-table
      :columns="columns"
      :data-source="searchResult"
      @change="onChange"
      style="padding: 0px"
      :customRow="customRow"
    >
      <a-button slot="action" type="primary" shape="circle" @click="showModal"
        ><a-icon type="right" style="padding-bottom: 5px"
      /></a-button>
    </a-table>
    <!-- View Model -->
    <div>
      <a-modal v-model="visible" title="My Requisition" on-ok="handleOk" :centered="true" width="700px">
        <template slot="footer">
          
          <a-button
            key="submit"
            type="primary"
            :loading="loading"
            @click="handleUpdate"
          >
            Edit
          </a-button>
          <a-button
            key="submit"
            type="danger"
            :loading="loading"
            @click="handleDelete"
          >
            Delete
          </a-button>
          <a-button key="back" @click="handleCancel"> Close </a-button>
        </template>
        
        <div class="row">
          <div class="col-8">
            <div class="row"><div class="col-4"><b>Requisition ID</b></div><div class="col-8"><p>{{model.requisition_id}}</p></div></div>
            <div class="row"><div class="col-4"><b>Product</b></div><div class="col-8"><p>{{model.good_type}}</p></div></div>
            <div class="row"><div class="col-4"><b>Date Created</b></div><div class="col-8"><p>{{model.dateCreated}}</p></div></div>
            <div class="row"><div class="col-4"><b>Approval Status</b></div><div class="col-8"><p>{{model.approvalStatus}}</p></div></div>
            <div class="row"><div class="col-4"><b>Action</b></div><div class="col-8"><p>{{model.action}}</p></div></div>
          </div>
        </div>      
      </a-modal>
    </div>
  </div>
</template>

<script>
// Import libraries
import axios from "axios";
import 'vue-resource';
/**
 * Table Columns
 * with sort methods and filters
 */
const columns = [
  {
    title: "Requisition ID",
    dataIndex: "requisition_id",
    key: 'requisition_id',
    sorter: (a, b) => {
      let requisition_idA = a.requisition_id.toUpperCase();
      let requisition_idB = b.requisition_id.toUpperCase();
      if (requisition_idA < requisition_idB) {
        return -1;
      }
      if (requisition_idA > requisition_idB) {
        return 1;
      }
      return 0;
    },
    sortDirections: ["descend", "ascend"],
  },
   {
    title: "Product",
    dataIndex: "good_type",
    key: 'good_type',
    sorter: (a, b) => {
      let good_typeA = a.good_type.toUpperCase();
      let good_typeB = b.good_type.toUpperCase();
      if (good_typeA < good_typeB) {
        return -1;
      }
      if (good_typeA > good_typeB) {
        return 1;
      }
      return 0;
    },
    sortDirections: ["descend", "ascend"],
  },
   {
    title: "Date Created",
    dataIndex: "dateCreated",
    key: 'dateCreated',
    sorter: (a, b) => {
      let dateCreatedA = a.dateCreated.toUpperCase();
      let dateCreatedB = b.dateCreated.toUpperCase();
      if (dateCreatedA < dateCreatedB) {
        return -1;
      }
      if (dateCreatedA > dateCreatedB) {
        return 1;
      }
      return 0;
    },
    sortDirections: ["descend", "ascend"],
  },
   {
    title: "Approval Status",
    dataIndex: "approvalStatus",
    key: 'approvalStatus',
    sorter: (a, b) => {
      let approvalStatusA = a.approvalStatus.toUpperCase();
      let approvalStatusB = b.approvalStatus.toUpperCase();
      if (approvalStatusA < approvalStatusB) {
        return -1;
      }
      if (approvalStatusA > approvalStatusB) {
        return 1;
      }
      return 0;
    },
    sortDirections: ["descend", "ascend"],
  },
  {
    title: "Action",
    dataIndex: "action",
    key: 'action'
  },
  {
    title: "",
    key: "id",
    fixed: "right",
    width: 100,
    scopedSlots: { customRender: "action" },
  },
];
function onChange(pagination, filters, sorter) {
  console.log("params", pagination, filters, sorter);
}
export default {
  data() {
    /**
     * Data attributes
     */
    return {
      data: [],
      columns,
      loading: false,
      visible: false,
      search: '',
      model: {
        requisition_id: '',
        good_type: undefined,
        dateCreated: undefined,
        approvalStatus: '',
        action: '',
      }
    };
  },
  created() {
    /**
     * Get all persons from database
     * using API request
     */
    axios.get("http://127.0.0.1:8000/api/requisition/all").then((response) => {
      this.data = response.data.results;
      console.log(this.data);
    });
  },
  methods: {
    onChange,
    showModal(e) {
      this.visible = true;
      console.log(e);
    },
    handleOk() {
      this.loading = true;
      setTimeout(() => {
        this.visible = false;
        this.loading = false;
      }, 2000);
      
    },
    handleDelete() {
      /**
       * Call to delete a person by 
       * mouse event
       */
      this.loading = true;
      setTimeout(() => {
        this.visible = false;
        this.loading = false;
        this.showConfirm(); // for confirm delete operation, then delete
      }, 500);
    },
    handleUpdate() {
      
      this.loading = true;
      setTimeout(() => {
      this.visible = false;
      this.loading = false;
      this.$router.push({ path: `/update-requisition/`+this.model.id});
      }, 500);
    },
    handleCancel() {
      this.visible = false;
    },
    
    customRow(record) {
      return {
        on: {
          click: event => {
            /**
             * Can use event and record
             */
            this.model = record;
            this.showModal();
            console.log(event);
            console.log(this.model);
          }
        }
      };
    },
    
    openNotificationSuccess(message, description) {
      /**
       * Notification toast success
       */
      this.$notification.open({
        message: message,
        duration: 5,
        icon: <a-icon type="like" theme="filled" style="color: #27ae60"/>,
        description:
          description,
        onClick: () => {
          console.log('Notification Clicked!');
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
        icon: <a-icon type="dislike" theme="filled" style="color: #c0392b"/>,
        description:
          description,
        onClick: () => {
          console.log('Notification Clicked!');
        },
      });
    },
     
    showConfirm() {
      this.$confirm({
        title: 'Do you want to delete these items?' + this.model.serialno + '('+this.model.id+')',
        content: 'When clicked the OK button, this dialog will be closed after 1 second',
        onOk: () => {
          this.$http.delete("http://127.0.0.1:8000/api/requisition/delete/" + this.model.id).then(
            function(response) {
              this.openNotificationSuccess('Successfully Deleted', 'Requisition'+ this.model.serialno +' record deleted.')
              this.data.splice((this.data.findIndex((e) => e === this.model)), 1);
              console.log(response);
            }, (error) => {
              this.openNotificationUnsuccess('Error', 'Requisition'+ this.model.serialno +' record cannot delete. Operation occured an error !');
              console.log(error);
            }
          );
          console.log('OK')
        },
        onCancel() {
          console.log('Cancel')
        },
      });
    },
  },
  computed: {
    searchResult: function() {
      return this.data.filter((item)=> {
          return (item.requisition_id.toLowerCase().match(this.search.toLowerCase()) || item.product.toLowerCase().match(this.search.toLowerCase()) || item.approvalStatus.toLowerCase().match(this.search.toLowerCase()));
      });
    },
  }
};
</script>