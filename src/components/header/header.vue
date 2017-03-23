<template>
    <div :class="classes">
        鲜易供应链协同平台
    </div>
</template>
<script type="text/ecmascript-6">
    const prefixCls = 'xcms-header';
    export default {
        name: 'xcmsHeader',
        props: {
            pending: {
                type: Boolean,
                default: false
            }
        },
        computed: {
            classes() {
                return [
                        `${prefixCls}`,
                    {
                        [`${prefixCls}-pending`]: this.pending
                    }
                ];
            }
        }
    };
</script>