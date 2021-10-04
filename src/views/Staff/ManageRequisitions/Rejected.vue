<template>
  <div class="container">
    <!--page header-->
    <h2>Rejected Requisitions</h2>
    <h3 style="color: #888; line-height: 10px">{{ new Date() | moment("dddd, MMMM Do YYYY") }}</h3>

    <!--search and filter options-->
    <div class="row px-3 my-4">
        <!--search bar-->
        <a-input-search 
            placeholder="Search by Requisition ID" 
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
        :key="requisition_id"
    >
    </a-table>

        <!--when 1 row selected-> Model view including it's title-->
    <div>
        <a-modal v-model="visible" :title="'Requisition - '+ model.requisition_id" on-ok="handleOk">
            <!--model view content-->
            <div class="row"><div class="col-4"><b>Requisitions ID: </b></div><div class="col-8"><p>{{model.requisition_id}}</p></div></div>
            <div class="row"><div class="col-4"><b>Good Type: </b></div><div class="col-8"><p>{{model.good_type}}</p></div></div>
            <div class="row"><div class="col-4"><b>Quantity: </b></div><div class="col-8"><p>{{model.quantity}}</p></div></div>
            <div class="row"><div class="col-4"><b>Estimated Budget: </b></div><div class="col-8"><p>{{model.estimated_budget}}</p></div></div>
            <div class="row"><div class="col-4"><b>Construction Site Name: </b></div><div class="col-8"><p>{{model.site_name}}</p></div></div>
            <div class="row"><div class="col-4"><b>Approval Status: </b></div><div class="col-8"><p>{{model.approval_status}}</p></div></div>
       
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
            title: 'Requisition ID',
            dataIndex: 'requisition_id',
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
            title: 'Approval Status',
            dataIndex: 'approval_status',
        },
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
                    quantity: '',
                    estimated_budget: '',
                    site_name: '',
                    approval_status: '',
                } //**this model is useful when displaying DB retrieved data in our Modal windows */
            }
        },
        created(){
            /**
             * get all nurse details from the Backend and store in the data array
             * using API request
             */
            console.log("inside created method");
            axios.get("http://127.0.0.1:8001/api/staff/requisitions/get/rejected").then((response) => {
                    this.requiData = response.data.requisitions;
                    console.log("response: ");
                    console.log(response);
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
        },
        computed: {
                searchResult: function(){
                    return this.requiData.filter((item) => {
                        //dropdown selcted value or the searched value will be matched with the respective data in DB table
                        // return (item.requisition_id.toLowerCase().match(this.requisition_id.toLowerCase())) &&(item.good_type.toLowerCase().match(this.good_type.toLowerCase())) && (item.estimated_budget.toLowerCase().match(this.estimated_budget.toLowerCase())) && (item.site_name.toLowerCase().match(this.site_name.toLowerCase()));
                        return (item.requisition_id.toLowerCase().match(this.search) );
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