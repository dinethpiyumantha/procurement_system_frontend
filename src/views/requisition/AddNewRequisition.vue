<template>
<div>
  <h4 class="mb-4">Add New Requisition</h4>
  
  <a-form-model ref="ruleForm" :model="form" :label-col="labelCol" :wrapper-col="wrapperCol" :rules="rules">
    
    <a-form-model-item label="Requisition ID" ref="requisition_id" prop="requisition_id">
      <a-input v-model="form.requisition_id"/>
    </a-form-model-item>

    <a-form-model-item label="Product" ref="good_type" prop="good_type">
      <a-select v-model="form.good_type" placeholder="Please select product">
        <a-select-option value="cement">
          Cement
        </a-select-option>
        <a-select-option value="sand">
          Sand
        </a-select-option>
        <a-select-option value="big black stones">
          Big Black Stones
        </a-select-option>
        <a-select-option value="cement bricks">
          Cement Bricks
        </a-select-option>
        <a-select-option value="red bricks">
          Red Bricks
        </a-select-option>
        <a-select-option value="gravel">
          Gravel
        </a-select-option>
        <a-select-option value="steel rods">
          Steel Rods
        </a-select-option>
        <a-select-option value="roofing sheets">
          Roofing Sheets
        </a-select-option>
        <a-select-option value="nails">
          Nails
        </a-select-option>
        <a-select-option value="timber parala">
          Timber Parala
        </a-select-option>
      </a-select>
    </a-form-model-item>

    <a-form-model-item label="Estimated Budget" ref="estimated_budget" prop="estimated_budget">
      <a-input v-model="form.estimated_budget"/>
    </a-form-model-item>

    <a-form-model-item label="Site Name" ref="site_name" prop="site_name">
      <a-input v-model="form.site_name"/>
    </a-form-model-item>

     <a-form-model-item label="Date Created">
      <a-date-picker  v-model="form.dateCreated" @change="onChange" />
    </a-form-model-item>

    <a-form-model-item :wrapper-col="{ span: 14, offset: 4 }">
      <a-button type="primary" @click="onSubmit()">
       Save
      </a-button>
      <a-button style="margin-left: 10px;" @click="clearForm()">
        Cancel
      </a-button>
    </a-form-model-item>
  </a-form-model>
</div>
</template>


<script>
export default {
  data() {
    return {
      labelCol: { span: 4 },
      wrapperCol: { span: 14 },
      updatable: false,
      form: {
        requisition_id: '',
        good_type: undefined,
        estimated_budget: '',
        site_name: '',
        dateCreated: undefined,

      },
      rules: {
        requisition_id: [{required: true, message: 'Please insert requisition ID', trigger: 'blur',},],
        good_type:  [{required: true, message: 'Please select product', trigger: 'blur',},],
        estimated_budget: [{required: true, message: 'Please insert estimated budget', trigger: 'blur',},],
        site_name: [{required: true, message: 'Please insert site name', trigger: 'blur',},],
        dateCreated: [{required: true, message: 'Please insert the date ', trigger: 'blur',},],

      }
    };
  },
  methods: {
    onSubmit() {
       this.$refs.ruleForm.validate(valid => {
        if (valid) {
          this.$http.post('http://localhost:8000/api/requisition/add', this.form).then(function (response) { 
        this.openNotificationSuccess("Successfully Added !", "Entry added");
        console.log(response);
      }, (error) => {
        this.openNotificationUnsuccess("Unsuccess !", "Server error : "+ error.status + "  " + error.statusText);
        console.log(error);
      });
        } else {
          this.openNotificationUnsuccess("Unsuccess !", "Validation Error");
          console.log('error submit!!');
          return false;
        }
      });
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
      this.clearForm();
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
   clearForm() {
      /**
       * Clear form
       */
      Object.assign(this.$data, this.$options.data.call(this));
    },
  },
  computed: {
    
  }
};
</script>