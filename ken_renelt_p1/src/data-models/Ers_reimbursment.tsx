export class Ers_reimbursment {
    id: number;
    amount: number;
    submitted: Date;
    resolved: Date;
    description: string;
    author:string;
    typeID:number;
    reciept:string;
    statusId:number;

    static from(obj: ErsRow)
    {
        const ers = new Ers_reimbursment(obj.reimb_id, obj.reimb_amount, obj.reimb_submitted, obj.reimb_resolved, 
                    obj.reimb_description, obj.reimb_author, obj.type_id, obj.reciept, obj.status_id);
        return ers;
    }

    constructor(id:number, amount:number, submitted:Date, resolved:Date, description:string, 
            author:string, typeID:number, reciept:string, statusId:number)
    {
        this.id = id;
        this.amount = amount;
        this.submitted = new Date(submitted);
        this.resolved = resolved;
        this.description = description;
        this.author = author;
        this.typeID = typeID;
        this.reciept = reciept;
        this.statusId = statusId;
    }
}

export interface ErsRow {
    reimb_id:number;
	reimb_amount:number;
	reimb_submitted:Date;
	reimb_resolved:Date;
    reimb_description:string; 
    reimb_author:string;
    type_id:number;
    reciept:string;
    status_id:number;
}