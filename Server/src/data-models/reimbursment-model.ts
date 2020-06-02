export class Reimbursment {
    id:number;
    amount:number;
    submitted:Date;
    resolved:Date;
    description:string;
    author:number;
    resolver:number;
    statusID:number;
    typeID:number;

    static from (obj: ReimbursmentRow)
    {
        const reimb = new Reimbursment(obj.reimb_id, obj.reimb_amount, obj.reimb_submitted, obj.reimb_resolved, obj.reimb_description, obj.reimb_author, obj.reimb_resolver, obj.reimb_status_id, obj.reimb_type_id);

        return reimb;
    }

    constructor(id, amount, submitted, resolved, description, author, resolver, statusID, typeID)
    {
        this.id = id;
        this.amount = amount;
        this.submitted = submitted;
        this.resolved = resolved;
        this.description = description;
        this.author = author;
        this.statusID = statusID;
        this.typeID = typeID;
    }
}




export interface ReimbursmentRow {
    reimb_id:number;
    reimb_amount:number;
    reimb_submitted:Date;
    reimb_resolved:Date;
    reimb_description:string;
    reimb_author:number;
    reimb_resolver:number;
    reimb_status_id:number;
    reimb_type_id:number;
}