# 前端下载表格 # 

1. 前端请求头要修改成 "Content-type": "application/vnd.ms-excel;"
2. 请求到参数后 要进行格式处理
    * 
    ```
    async downLoad() {
        try {
            let downLoadNotGoodData = await this.$net.downloadFile({
            url: this.$url.downLoadNotGoodData,
            data: {
                mbmc: 'wjjlcx.xls',     //模板名称
                requestWjjlcx: {          // 页面查询条件
                cbrh:this.FilterValue.PatientID, //病人号
                cflbm: this.FilterValue.CriticValue, // 危急值分类
                cksbqbm:this.FilterValue.MZKS, // 门诊科室/住院病区
                ssbmc: this.FilterValue.MachineName, // 设备名称
                cxm: this.FilterValue.PatientName, // 病人姓名
                cysclzt: this.FilterValue.HandleStatus, // 处理状态
                djlsj: this.$date.dataFormat(this.FilterValue.StartEndDateTime), //  登记时间区间
                ibrlx: this.FilterValue.PatientType, // 病人类型
                ilcysbj: this.FilterValue.NoticeDoc, // 通知结果(医护人员)
                ilxbrbj: this.FilterValue.NoticePatient, // 通知结果(病人)
                number: this.number,// 数据总数
                pageIndex: this.pageIndex, // 当前页面
                yjks:this.FilterValue.MedicalTech, // 医技科室
                }
            }
            })
            let _fileName = "危急值信息"+new Date().toLocaleString();
            let url = window.URL.createObjectURL(new Blob([downLoadNotGoodData.data], { type: 'applicationnd.ms-excel;' }));
            // 生成一个a标签
            let link = document.createElement("a");
            link.style.display = "none";
            link.href = url;
            // 生成时间戳
            link.download = decodeURIComponent(_fileName) + ".xls";
            document.body.appendChild(link);
            link.click();
        } catch (e) {
            console.log(e);
        }
    }  
    ```    

   
