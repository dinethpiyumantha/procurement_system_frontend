<template>
  <div class="container">
    <!--page header-->
    <h2>Approved Requisitions</h2>
    <h3 style="color: #888; line-height: 10px">{{ new Date() | moment("dddd, MMMM Do YYYY") }}</h3>

    <!--search and filter options-->
    <div class="row px-3 my-4">
        <!--search bar-->
        <a-input-search 
            placeholder="Search nurse by name" 
            style="margin: 20px 0px;"
            size="large"
            v-model="search" 
            @search="onSearch" 
        />
    </div>

    <!--table structure-->
    <a-table
        :columns="columns"
        :data-source="requiData"
        :loading="loading"
        @change="handleTableChange"
        style="padding: 0px"
        :customRow = "customRow" 
        :key="requisition_id"
    >
        <!--Approve button-->
        <!-- <a-button slot="action" type="primary" @click="approveRequisition"> </a-button>-->
        <!--Reject button-->
        <!-- <a-button slot="action" type="primary" @click="rejectRequisition"> </a-button> -->

        <a-button slot="action" type="primary" size="small" style="font-size: 15px;">Create Order</a-button>
        <!-- <span style="padding-left: 10px">
            <a-button slot="action2" type="danger" size="small" @click="rejectRequisition">Reject</a-button>
        </span> -->
    </a-table>

        <!--when 1 row selected-> Model view including it's title-->
    <div>
        <a-modal v-model="visible" :title="'Requisition - '+ model.requisition_id" on-ok="handleOk">
            <!--model view content-->
            <span>Want to create an Order for this requisition - </span><span>{{model.requisition_id}}</span><span>?</span>
       
            <!--model view footer-->  
            <template slot="footer">
                <a-button  type="primary" size="large" @click="createOrder" style="font-size: 15px;">Create Order</a-button>
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
            title: 'Requisition ID',
            dataIndex: 'requisition_id',
            width: '25%',
        },
        // {
        //     title: 'Date',
        //     dataIndex: 'date',
        // },
        {
            title: 'Good_Type',
            dataIndex: 'good_type',
        },
        {
            title: 'Quantity',
            dataIndex: 'quantity',
        },
        {
            title: 'Estimated_Budget',
            dataIndex: 'estimated_budget',
        },
        {
            title: 'Construction_Site',
            dataIndex: 'site_name',
        },
        {
            title: "Actions",
            key: "id",
            fixed: "right",
            width: 180,
            scopedSlots: { customRender: "action" },
        },
        // {
        //     title: "",
        //     key: "id",
        //     fixed: "right",
        //     width: 100,
        //     scopedSlots: { customRender: "action2" },
        // },
    ];

    export default {
        data() {
            
            return {
                //return requiData[] array which contains backend data
                requiData: [],

                buttonWidth: 70,
                pagination: { },
                loading: false, //this is a must 
                visible: false, //this is a must
                //return column variable
                columns,
                //return the values to v-model attributes that we've set in Search, Filter functions
                search: '',
                good_type: '', 
                estimated_budget: '', //user selecting option of Filter dropdown will be assigned to this attribute
                site_name: '',
                //return model object(which contains all DB retrieved data as an obj)
                model: { 
                    requisition_id: '',
                    // date: '',
                    good_type: '',
                    estimated_budget: '',
                    site_name: '',
                } //**this model is useful when displaying DB retrieved data in our Modal windows */
            }
        },
        created(){
            /**
             * get all nurse details from the Backend and store in the data array
             * using API request
             */
            console.log("inside created method");
            axios.get("http://127.0.0.1:8001/api/staff/requisitions/get/approved").then((response) => {
                    this.requiData = response.data.requisitions;
                    console.log("response: ");
                    console.log(response.data.requisitions);
                    console.log("requiData: ");
                    console.log(this.requiData);
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

            //update approval status when approved
            createOrder() {
                    console.log("model id: "+ this.model.id); 
                    this.$router.push({path: '/create_order/'+this.model.id});
            },
        },
        computed: {
                searchResult: function(){
                    return this.requiData.filter((item) => {
                        //dropdown selcted value or the searched value will be matched with the respective data in DB table
                        return (item.requisition_id.toLowerCase().match(this.requisition_id.toLowerCase())) &&(item.good_type.toLowerCase().match(this.good_type.toLowerCase())) && (item.estimated_budget.toLowerCase().match(this.estimated_budget.toLowerCase())) && (item.site_name.toLowerCase().match(this.site_name.toLowerCase()));
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