export class Ers_reimbursment {
    id: number;
    amount: number;
    submitted: Date;
    resolved: Date;
    description: string;

    static from(obj: ErsRow)
    {
        const ers = new Ers_reimbursment(obj.reimb_id, obj.reimb_amount, obj.reimb_submitted, obj.reimb_resolved, obj.reimb_description)
        return ers;
    }

    constructor(id:number, amount:number, submitted:Date, resolved:Date, description:string)
    {
        this.id = id;
        this.amount = amount;
        this.submitted = new Date(submitted);
        this.resolved = resolved;
        this.description = description;
    }
}

export interface ErsRow {
    reimb_id:number;
	reimb_amount:number;
	reimb_submitted:Date;
	reimb_resolved:Date;
	reimb_description:string; 
}