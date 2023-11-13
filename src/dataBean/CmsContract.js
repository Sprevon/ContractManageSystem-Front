/**
 * 合同订单数据承接类
 */
class CmsContract{
    constructor(data) {
        this.contractId = data.contractId
        this.orderOrgId = data.orderOrgId
        this.supplyOrgId = data.supplyOrgId
        this.receiveOrgId = data.receiveOrgId
        this.settleOrgId = data.settleOrgId
        this.resourceId = data.resourceId
        this.resourceQuality = data.resourceQuality
        this.contractTerm = data.contractTerm
        this.createPerson = data.createPerson
        this.createDate = data.createDate
        this.lastModifyPerson = data.lastModifyPerson
        this.lastModifyDate = data.lastModifyDate
        this.editType = data.editType
    }
}

export default CmsContract
