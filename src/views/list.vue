<template>
    <div>
        <el-row>
            <el-button type="primary" @click="openAddModel">添加<i class="el-icon-document-add el-icon--right"></i></el-button>
        </el-row>
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
                    prop="createTime"
                    :formatter="formatTime"
                    label="开始时间">
            </el-table-column>
            <el-table-column
                    label="操作">
                <template slot-scope="scope">
                    <el-button type="primary" icon="el-icon-edit" circle @click="openUpdateModel(scope.row,scope)"></el-button>
                    <el-button type="danger" icon="el-icon-delete" circle></el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination
                background
                layout="prev, pager, next,sizes, total, jumper"
                :page-sizes="[5, 10, 20, 50]"
                :page-size="searchKey.pageSize"
                :total="total"
                @current-change="handleCurrentChange">
        </el-pagination>
        <template>
            <el-dialog
                    title="编辑"
                    :visible.sync="dialogVisible"
                    width="30%"
                    :before-close="handleClose">
                <div>
                    <el-form ref="form" :rules="rules" :model="project" label-width="80px">
                        <el-form-item label="主键">
                            <el-input v-model="project.id" disabled="disabled"></el-input>
                        </el-form-item>
                        <el-form-item label="名称" prop="projectName">
                            <el-input v-model="project.projectName"></el-input>
                        </el-form-item>
                        <el-form-item label="状态" prop="projectStatus">
                            <el-select v-model="project.projectStatus" placeholder="请选择状态">
                                <el-option label="未开始" value="0"></el-option>
                                <el-option label="已开始" value="1"></el-option>
                                <el-option label="已完成" value="2"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="开始时间" prop="startTime">
                            <el-date-picker type="date" placeholder="选择日期" v-model="project.startTime" style="width: 100%;"></el-date-picker>
                        </el-form-item>
                        <el-form-item label="描述">
                            <el-input type="textarea" v-model="project.projectDesc"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button @click="dialogVisible = false">取消</el-button>
                            <el-button type="primary" @click="onSubmit('form')">立即创建</el-button>
                        </el-form-item>
                    </el-form>
                </div>
            </el-dialog>
        </template>
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
                total: null,
                searchKey: {
                    pageNo: 1,
                    pageSize: 5
                },
                dialogVisible: false,
                project: {
                    id: null,
                    projectName: null,
                    projectDesc: null,
                    projectStatus: null,
                    startTime: null
                },
                rules: {
                    projectName: [
                        { required: true, message: '请输入名称', trigger: 'blur' },
                        { min: 3, max: 50, message: '长度在 3 到 5 个字符', trigger: 'blur' }
                    ],
                    projectStatus: [
                        { required: true, message: '请选择状态', trigger: 'change' }
                    ],
                    startTime: [
                        { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
                    ],
                }
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
            formatTime:function (row,column) {
                return row.createTime
            },
            handleClose(done) {
                this.$confirm('确认关闭？')
                    .then(_ => {
                        done();
                    })
                    .catch(_ => {});
            },
            onSubmit(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        console.log(this.project)
                        alert('submit!');
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            openUpdateModel(row,scope){
                this.dialogVisible = true;
                this.project.id=row.id;
                this.project.projectName=row.projectName;
                this.project.projectDesc=row.projectDesc;
                this.project.projectStatus=row.projectStatus;
                this.project.startTime=row.startTime;
                console.log(scope)
            },
            openAddModel(){
                this.dialogVisible = true;
                this.project.id=null;
                this.project.projectName=null;
                this.project.projectDesc=null;
                this.project.projectStatus=null;
                this.project.startTime=null;
            }
        },
//
    }
</script>

<style scoped>

</style>
