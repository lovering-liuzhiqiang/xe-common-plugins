/**
 * Created by lovering on 2017/10/13.
 */
var mixins = {
    methods: {
        initFixedHeader(tableClass = '.el-table') {
            this.$nextTick(() => {
                this.routerContent = document.querySelector('.main-01-router');
                this.elTable = document.querySelector(tableClass);
                this.tableHeader = document.querySelector(tableClass + ' .el-table__header-wrapper');
                this.fixedArray = document.querySelectorAll(tableClass + ' .el-table__fixed-header-wrapper');
                this.tableHeader.style.position = 'relative';
                this.tableHeader.style.zIndex = '1';
                this.fixedArray.forEach(item => {
                    item.style.zIndex = '4';
                });
                this.fixedHeaderHeight();
                this.routerContent.addEventListener('scroll', this.fixedHeaderHeight);
            });
        },

        desFixedHeader() {
            this.routerContent.removeEventListener('scroll', this.fixedHeaderHeight);
        },

        fixedHeaderHeight() {
            if (this.routerContent.scrollTop >= this.elTable.offsetTop) {
                this.tableHeader.style.top = this.routerContent.scrollTop - this.elTable.offsetTop - 1 + 'px';
                this.fixedArray.forEach(item => {
                    item.style.top = this.routerContent.scrollTop - this.elTable.offsetTop - 1 + 'px';
                });
            } else {
                this.tableHeader.style.top = '0px';
                this.fixedArray.forEach(item => {
                    item.style.top = '0px';
                });
            }
        }
    }
};

export { mixins };