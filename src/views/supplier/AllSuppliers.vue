<template>
  <div>
    <h2>All Suppliers</h2>
    <!-- Table View -->
    <a-table
      :columns="columns"
      :data-source="data"
      @change="onChange"
      style="padding: 0px"
    >
      <span slot="action" slot-scope="record">
        <a-button icon="search" size="small" @click="setModel(record); "  style="margin: 2px">View</a-button>
        <a-button icon="delete" size="small" type="danger" @click="unregisterSupplier(record)" style="margin: 2px">Delete</a-button>
      </span>
    </a-table>
    
    <a-modal v-model="visible" :title="'Supplier Details'" :centered="true" width="700px">
        <template slot="footer">
          <a-button v-if="modelDisable" key="Edit" @click="editModel()"> Edit </a-button>
          <a-button v-if="!modelDisable" type="primary" key="Edit" @click="updateSupplier()"> Save </a-button>
          <a-button v-if="!modelDisable" key="Edit" @click="editModel()"> Cancel </a-button>
          <a-button key="back" @click="showModel()"> Close </a-button>
        </template>
        
        <div>
          <a-form-model ref="ruleForm" :model="model" :label-col="labelCol" :wrapper-col="wrapperCol" :rules="rules">
            <a-row style="margin: 8px 0"><a-col :span="6"><b>Employee ID</b></a-col><a-col :span="12"><a-input v-model="model.id" disabled/></a-col></a-row>
            <a-row style="margin: 8px 0"><a-col :span="6"><b>ID</b></a-col><a-col :span="12"><a-input v-model="model.employee_id"  disabled/></a-col></a-row>
            <a-row style="margin: 8px 0"><a-col :span="6"><b>Agreement ID</b></a-col><a-col :span="12"><a-form-model-item ref="agreement_id" prop="agreement_id"><a-input v-model="model.agreement_id" :disabled="modelDisable"/></a-form-model-item></a-col></a-row>
            <a-row style="margin: 8px 0"><a-col :span="6"><b>Name</b></a-col><a-col :span="12"><a-input v-model="model.name"  disabled/></a-col></a-row>
            <a-row style="margin: 8px 0"><a-col :span="6"><b>Phone Number</b></a-col><a-col :span="12"><a-form-model-item ref="phone_no" prop="phone_no"><a-input v-model="model.phone_no"  :disabled="modelDisable"/></a-form-model-item></a-col></a-row>
            <a-row style="margin: 8px 0"><a-col :span="6"><b>Email</b></a-col><a-col :span="12"><a-form-model-item ref="email" prop="email"><a-input v-model="model.email"  :disabled="modelDisable"/></a-form-model-item></a-col></a-row>
            <a-row style="margin: 8px 0"><a-col :span="6"><b>Company</b></a-col><a-col :span="12"><a-input v-model="model.company_name"  disabled/></a-col></a-row>
            <a-row style="margin: 8px 0"><a-col :span="6"><b>Product Type</b></a-col><a-col :span="12"><a-form-model-item ref="product_type" prop="product_type"><a-input v-model="model.product_type"  :disabled="modelDisable"/></a-form-model-item></a-col></a-row>
            <a-row style="margin: 8px 0"><a-col :span="6"><b>Password</b></a-col><a-col :span="12"><a-form-model-item ref="password" prop="password"><a-input-password v-model="model.password"  :disabled="modelDisable"/></a-form-model-item></a-col></a-row>
          </a-form-model>
        </div>
    </a-modal>
  </div>
</template>

<script>
import axios from "axios";

import WEBCONSTANTS from "../../constants.json";

/**
 * Table Columns
 */
const columns = [
  {
    title: "ID",
    dataIndex: "id",
    key: "id",
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
    title: "Name",
    dataIndex: "name",
    key: "name",
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
    title: "Product",
    dataIndex: "product_type",
    key: "product_type",
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
    title: "Phone",
    dataIndex: "phone_no",
  },
  {
    title: "Email",
    dataIndex: "email",
  },
  {
    title: "",
    scopedSlots: { customRender: "action" },
  },
];

let SLPhoneValidator = (rule, value, callback) => {
  const regex = /^(?:0|94|\+94)?(?:(11|21|23|24|25|26|27|31|32|33|34|35|36|37|38|41|45|47|51|52|54|55|57|63|65|66|67|81|912)(0|2|3|4|5|7|9)|7(0|1|2|4|5|6|7|8)\d)\d{6}$/;
  let result = regex.test(value);
  if (!result) {
    callback(new Error('Please input valid phone number again'));
  } else if (value === ''){
    callback();
  } else {
    callback();
  }
}

export default {
  data() {
    /**
     * Data attributes
     * (Vue Models)
     */
    return {
      WEBCONSTANTS,
      columns,
      data: "",
      visible: false,
      currentRecord: null,
      model: {
        id: null,
        employee_id: null,
        agreement_id: null,
        name: null,
        phone_no: null,
        email: null,
        company_name: null,
        product_type: null,
        password: null
      },
      modelDisable: true,
      rules: {
        agreement_id: [{required: true, message: 'Please insert Agreement ID',trigger: 'blur',},],
        phone_no: [{validator: SLPhoneValidator,trigger: 'change',}],
        email: [{type: 'email', message: 'The input is not valid E-mail!',trigger: 'blur',},
                {required: true, message: 'Please input your E-mail!',trigger: 'blur',},],
        name: [{required: true, message: 'Please insert supplier name',trigger: 'blur',},],
        password: [{required: true, message: 'Please insert password',trigger: 'blur',},],
        product_type: [{required: true, message: 'Please insert product type',trigger: 'blur',},],
      },
    };
  },
  components: {
  },
  created() {
    /**
     * On Create Life Cycle State
     */
    axios
      .get(WEBCONSTANTS.server.adderss + WEBCONSTANTS.api.supplier.getAll)
      .then((response) => {
        this.data = response.data.results;
        console.log(this.data);
      });
  },
  methods: {
    setModel(record) {
      this.model = record;
      this.showModel();
    },
    editModel() {
      this.modelDisable = !this.modelDisable;
    },
    showModel() {
      this.visible = !this.visible;
      this.modelDisable = true;
    },
    updateSupplier() {
      this.editModel();
      this.$confirm({
        title: "Are you sure?",
        content: "Do you really want to delete this record (" + this.model.id + ")? This process cannot be undone.",
        onOk: () => {
          this.$http.put(WEBCONSTANTS.server.adderss + WEBCONSTANTS.api.supplier.updateSupplier + this.model.id, this.model).then(function (response) { 
            console.log(response);
          }, (error) => {
            console.log(error);
          });
        },
        oncancel() {

        }
      });
    },
    unregisterSupplier(record) {
      /**
       * Unregister a Supplier from system
       */
      this.$confirm({
        title: "Are you sure?",
        content: "Do you really want to delete this record (" + record.id + ")? This process cannot be undone.",
        onOk: () => {
          console.log(record);
          this.$http
            .delete( WEBCONSTANTS.server.adderss + WEBCONSTANTS.api.supplier.unregister + record.id )
            .then(
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
        oncancel() {},
      });
    },
    notification(type, message, description) {
      if(type === 'success') {
        this.$notification.open({
          message: message,
          duration: 8,
          icon: <a-icon type="like" theme="filled" style="color: #27ae60"/>,
          description: description,
          onClick: () => {
              console.log('Notification success');
          },
        });
      } else {
        this.$notification.open({
            message: message,
            duration: 8,
            icon: <a-icon type="dislike" theme="filled" style="color: #c0392b"/>,
            description: description,
            onClick: () => {
                console.log('Notification unsuccess');
            },
        });
      }
    }
  },
};
</script>