<template>
    <a-row>
        <a-row :gutter="[16,16]">
            <a-col :span="12">
                <a-card hoverable >
                    <div style="margin-bottom: 10px; display: flex">
                        <h1 style="font-size: 40px; line-height: 0px">
                            <a-icon type="shopping-cart" />
                            <span style="margin-left: 20px">10</span>
                        </h1>
                    </div>
                    <a-card-meta title="Number of Requisitions"></a-card-meta>
                </a-card>
            </a-col>
            <a-col :span="12">
                <a-card hoverable >
                    <div style="margin-bottom: 10px; display: flex">
                        <h1 style="font-size: 40px; line-height: 0px">
                            <a-icon type="safety-certificate" />
                            <span style="margin-left: 20px">10</span>
                        </h1>
                    </div>
                    <a-card-meta title="Completed Requtions"></a-card-meta>
                </a-card>
            </a-col>
        </a-row>
        <a-row :gutter="[16,16]">
            <a-col :span="12">
                <a-card hoverable >
                    <div style="margin-bottom: 10px; display: flex">
                        <h1 style="font-size: 40px; line-height: 0px">
                            <a-icon type="shopping-cart" />
                            <span style="margin-left: 20px">10</span>
                        </h1>
                    </div>
                    <a-card-meta title="To be delivered"></a-card-meta>
                </a-card>
            </a-col>
            <a-col :span="12">
                <a-card hoverable >
                    <div style="margin-bottom: 10px; display: flex">
                        <h1 style="font-size: 40px; line-height: 0px">
                            <a-icon type="safety-certificate" />
                            <span style="margin-left: 20px">10</span>
                        </h1>
                    </div>
                    <a-card-meta title="Pending approvals"></a-card-meta>
                </a-card>
            </a-col>
        </a-row>
    </a-row>

</template>

<script>
export default {

}
</script>

<style>

</style>