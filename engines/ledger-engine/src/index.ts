export type LedgerEntry={id:string;caseId:string;eventType:string;actorId:string;description:string;previousEntryId?:string;correctionOf?:string;createdAt:string};
export function appendLedgerEntry(input:LedgerEntry){return Object.freeze({...input});}
export function correctionEntry(original:LedgerEntry,next:Omit<LedgerEntry,'correctionOf'>):LedgerEntry{return Object.freeze({...next,correctionOf:original.id});}
