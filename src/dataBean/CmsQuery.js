class CmsQuery {
    constructor(data) {
        this.contractId = data.contractId;
        this.orgName = data.orgName;
        this.resourceName = data.resourceName;
        this.resourceSpec = data.resourceSpec;
        this.editType = data.editType;
        this.resourceDateStart = data.resourceDateStart;
        this.resourceDateEnd = data.resourceDateEnd;
        this.data = data;
    }


}

export default {
    CmsQuery
}