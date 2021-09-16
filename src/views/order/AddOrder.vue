<template>
    <div class="container">
        <h3>Add Order</h3>
        <a-form-model :model="form" :label-col="labelCol" :wrapper-col="wrapperCol">
            <a-form-model-item label="Order ID">
            <a-input v-model="form.name" />
            </a-form-model-item>
            <a-form-model-item label="Good Type">
            <a-select v-model="form.region" placeholder="please select your zone">
                <a-select-option value="shanghai">
                Zone one
                </a-select-option>
                <a-select-option value="beijing">
                Zone two
                </a-select-option>
            </a-select>
            </a-form-model-item>
            <a-form-model-item label="Quantity">
            <a-input-number id="inputNumber" v-model="value" :min="1" :max="100" />
            </a-form-model-item>
            <a-form-model-item label="Estimated Budget">
            <a-input suffix="LKR" v-model="form.name" />
            </a-form-model-item>
            <a-form-model-item label="Supplier">
            <a-select v-model="form.region" placeholder="please select your zone">
                <a-select-option value="shanghai">
                Zone one
                </a-select-option>
                <a-select-option value="beijing">
                Zone two
                </a-select-option>
            </a-select>
            </a-form-model-item>
            <a-form-model-item :wrapper-col="{ span: 14, offset: 4 }">
            <a-button type="primary" @click="onSubmit">
                Create
            </a-button>
            <a-button style="margin-left: 10px;">
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
      form: {
        name: '',
        region: undefined,
        date1: undefined,
        delivery: false,
        type: [],
        resource: '',
        desc: '',
      },
    };
  },
  methods: {
    onSubmit() {
      console.log('submit!', this.form);
    },
  },
};
</script>
