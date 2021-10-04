<template>
  <div class="container">
    <!--page header-->
    <h2>Approved Orders</h2>
    <h3 style="color: #888; line-height: 10px">{{ new Date() | moment("dddd, MMMM Do YYYY") }}</h3>

    <!--search and filter options-->
    <div class="row px-3 my-4">
        <!--search bar-->
        <a-input-search 
            placeholder="Search by Order ID" 
            style="margin: 20px 0px;"
            size="large"
            v-model="search" 
            @search="onSearch" 
        />
    </div>

    <!--table structure-->
    <a-table
        :columns="columns"
        :data-source="searchResult"
        :loading="loading"
        @change="handleTableChange"
        style="padding: 0px"
        :customRow = "customRow" 
    >
    </a-table>

        <!--when 1 row selected-> Model view including it's title-->
    <div>
        <a-modal v-model="visible" :title="'Procurement Order - '+ model.order_id" on-ok="handleOk">
            <!--model view content-->
            <div class="row"><div class="col-4"><b>Order ID: </b></div><div class="col-8"><p>{{model.order_id}}</p></div></div>
            <div class="row"><div class="col-4"><b>requisition_id: </b></div><div class="col-8"><p>{{model.requisition_id}}</p></div></div>
            <div class="row"><div class="col-4"><b>good_type: </b></div><div class="col-8"><p>{{model.good_type}}</p></div></div>
            <div class="row"><div class="col-4"><b>Quantity: </b></div><div class="col-8"><p>{{model.quantity}}</p></div></div>
            <div class="row"><div class="col-4"><b>estimated_budget: </b></div><div class="col-8"><p>{{model.amount}}</p></div></div>
            <div class="row"><div class="col-4"><b>site_name: </b></div><div class="col-8"><p>{{model.site_name}}</p></div></div>
            <div class="row"><div class="col-4"><b>Supplier: </b></div><div class="col-8"><p>{{model.supplier_id}}</p></div></div>
            <div class="row"><div class="col-4"><b>Delivery Address: </b></div><div class="col-8"><p>{{model.delivery_address}}</p></div></div>
            <div class="row"><div class="col-4"><b>Order created Date: </b></div><div class="col-8"><p>{{model.date_created}}</p></div></div>
       
            <!--model view footer-->  
            <template slot="footer">
                <!--cancel button-->
                <a-button key="back" @click="handleCancel">Cancel</a-button>
            </template>
        </a-modal>
    </div>


  </div>
</template>

<script>
    //import libraries used to catch the JSON type data which are retrieved from the backend
    import axios from "axios";
    import 'vue-resource';
    //import local data files ?????

    //get all column fields with their Sort & filter options into one Const Array variable (Title: frontend columnName, dataIndex: DB columnName)
    const columns = [
        {
            title: 'Order_id',
            dataIndex: 'order_id',
        },
        {
            title: 'Requisition ID',
            dataIndex: 'requisition_id',
        },
        {
            title: 'Good_Type',
            dataIndex: 'good_type',
        },
        {
            title: 'Quantity',
            dataIndex: 'quantity',
        },
        {
            title: 'Amount',
            dataIndex: 'amount',

        },
        {
            title: 'Site',
            dataIndex: 'site_name',
        },
        {
            title: 'Supplier',
            dataIndex: 'supplier_id',

        },
        {
            title: 'Date_created',
            dataIndex: 'date_created',
        },
    ];

    export default {
        data() {
            
            return {
                //return requiData[] array which contains backend data
                orderData: [],

                buttonWidth: 70,
                pagination: { },
                loading: false, //this is a must 
                visible: false, //this is a must
                //return column variable
                columns,
                //return the values to v-model attributes that we've set in Search, Filter functions
                search: '',
                good_type: '', 
                quantity: '', //user selecting option of Filter dropdown will be assigned to this attribute
                site_name: '',
                //return model object(which contains all DB retrieved data as an obj)
                model: { 
                    order_id: '',
                    requisition_id: '',
                    // date: '',
                    good_type: '',
                    quantity: '',
                    amount: '',
                    site_name: '',
                    supplier_id: '',
                    delivery_address: '',
                    date_created: '',
                } //**this model is useful when displaying DB retrieved data in our Modal windows */
            }
        },
        created(){
            /**
             * get all nurse details from the Backend and store in the data array
             * using API request
             */
            console.log("inside created method");
            axios.get("http://127.0.0.1:8001/api/staff/order/get/all").then((response) => {
                    this.orderData = response.data.results;
                    console.log("response: ");
                    console.log(response);
                    console.log("orderData: ");
                    console.log(this.orderData);
                }
            );
        },
        methods: {
            //handleTableChange() method
            handleTableChange(pagination, filters, sorter) {
                console.log("params", pagination, filters, sorter);
            },
                        //show Modal view method
            showModal(){
                this.visible = true;
            },
            //what is handleOk() method ???? - this will be called when user click a row in the table
            handleOk() {
            this.loading = true;
            setTimeout(() => {
                this.visible = false;
                this.loading = false;
                }, 
                2000);
            },

            //handleCancel in modal window method
            handleCancel(){
                this.visible = false;
            },

            //customRow method
            customRow(recordObj){ //this is an in-built method which pass the record of clicked row in the table
                return{
                    //if user click on a particlular table row;
                    on: {
                        click: event => {
                            this.model = recordObj; //assign the data record of clicked row to this.model object
                            this.showModal();
                            console.log(event);
                        }
                    }
                }
            },
            //search function
            onSearch(value){
                console.log(value);
            },
        },
        computed: {
                searchResult: function(){
                    return this.orderData.filter((order) => {
                        //dropdown selcted value or the searched value will be matched with the respective data in DB table
                        return (order.order_id.toLowerCase().match(this.search));
                    });
                }
            }

    }
</script>

<style scoped>
    /*styles for Tool tip*/
    .components-a-tooltip-demo-placement .ant-btn {
        width: 70px;
        text-align: center;
        padding: 0;
        margin-right: 8px;
        margin-bottom: 8px;
    }

    .container {
    background: #fff;
    padding: 20px;
}
</style>