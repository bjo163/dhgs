export type GuardInput={jurisdictionValid:boolean;formalLegalStatus:'PASS'|'REVIEW'|'FAIL';materialConflict:'CLEAR'|'UNRESOLVED';protectedData:boolean};
export type GuardAction='ALLOW'|'DENY'|'HOLD'|'DO_NOT_PUBLISH';
export function evaluateGuards(i:GuardInput):GuardAction[]{const actions:GuardAction[]=[];if(!i.jurisdictionValid||i.formalLegalStatus==='FAIL')actions.push('DENY');if(i.materialConflict==='UNRESOLVED'||i.formalLegalStatus==='REVIEW')actions.push('HOLD');if(i.protectedData)actions.push('DO_NOT_PUBLISH');return actions.length?actions:['ALLOW'];}
