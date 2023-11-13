import {ElMessageBox} from "element-plus";

function resultNotice(response) {
    const code = response.code;
    if (code === 200){
        ElMessageBox.alert("操作成功", "提示", {
            confirmButtonText: "确定"
        }).then(r  => {return r;})
    }else {
        ElMessageBox.alert("操作失败", "提示", {
            confirmButtonText: "确定"
        })
    }
}

export default {
    resultNotice,
}