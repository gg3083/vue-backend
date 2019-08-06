<template>
    <div> <!-- .slice((searchKey.pageNo - 1) * searchKey.pagesize, searchKey.pageNo * searchKey.pagesize)-->
        <el-table
                :data="list"
                border
                style="width: 100%">
            <el-table-column
                    prop="id"
                    label="ID"
                    width="180">
            </el-table-column>
            <el-table-column
                    prop="projectName"
                    label="姓名"
                    width="180">
            </el-table-column>
            <el-table-column
                    prop="projectStatus"
                    :formatter="formatRole"
                    label="状态">
            </el-table-column>
            <el-table-column
                    prop="projectDesc"
                    label="描述">
            </el-table-column>
            <el-table-column
                    prop="startTime"
                    label="开始时间">
            </el-table-column>
        </el-table>
        <div class="pagination-container">
            <el-pagination
                    background
                    layout="prev, pager, next,sizes, total, jumper"
                    :page-sizes="[5, 10, 20, 50]"
                    :page-size="searchKey.pageSize"
                    :total="total"
                    @current-change="handleCurrentChange">
            </el-pagination>
        </div>
    </div>


</template>

<script>
    import {getList} from "@/api/list";
    import { Message } from 'element-ui';
    export default {
        name: "list",
        data() {
            return {
                list: null,
                total:null,
                searchKey:{
                    pageNo:1,
                    pageSize:5
                },
            }
        },
        created(){
          this.getListProject();
        },
        methods: {
            getListProject() {
                getList(this.searchKey).then(res => {
                    if (res.data.code === 0) {
                        console.log(res.data)
                        this.list = res.data.obj.data
                        this.total = res.data.obj.count
                    } else {
                        Message({
                            message: res.data.message,
                            type: 'error',
                            duration: 5 * 1000
                        })
                    }
                })
            },
            handleCurrentChange(cpage) {
                this.searchKey.pageNo = cpage;
                this.getListProject();
            },
            formatRole: function(row, column) {
                return row.projectStatus == '0' ? "未开始" : row.projectStatus == '1' ? "开始" : row.projectStatus == '2' ? "已完成" :"未定义";
            },
        },
//
    }
</script>

<style scoped>

</style>
