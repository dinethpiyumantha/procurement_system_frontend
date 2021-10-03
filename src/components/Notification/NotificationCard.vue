<template>
    
        <a-row :gutter="[16,16]">
        <a-col>
            <a-alert
            message="Warning Text Warning Text Warning TextW arning Text Warning Text Warning TextWarning Text"
            type="warning"
            closable
            @close="onClose"
            />
        </a-col>
        <a-col>
            <a-alert
            message="Error Text"
            description="Error Description Error Description Error Description Error Description Error Description Error Description"
            type="error"
            closable
            @close="onClose"
            />
        </a-col>
        </a-row>

</template>

<script>
export default {

}
</script>

<style>

</style>