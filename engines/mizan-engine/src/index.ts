export type MizanInput = {
  jurisdictionValid: boolean;
  plausibleLegalBasis: boolean;
  evidenceThresholdMet: boolean;
  conflictResolved: boolean;
  redLineClear: boolean;
  rightsReviewComplete: boolean;
  m1Truth: number;
  m3Intent: number;
  m4Impact: number;
  m5Proportionality: number;
  m6MercyCorrection: number;
  m7Accountability: number;
};

export type MizanOutcome='READY'|'CONDITIONAL'|'NOT_READY'|'UNRESOLVED'|'REVIEW_REQUIRED';

export function evaluateMizan(i:MizanInput){
  const hardGates={jurisdiction:i.jurisdictionValid,legalBasis:i.plausibleLegalBasis,evidence:i.evidenceThresholdMet,conflict:i.conflictResolved,redLines:i.redLineClear,rights:i.rightsReviewComplete};
  if(Object.values(hardGates).some(v=>!v)) return {outcome:'NOT_READY' as MizanOutcome,score:null,hardGates,legalFinding:null,advisoryOnly:true as const};
  const score=0.20*i.m1Truth+0.10*i.m3Intent+0.15*i.m4Impact+0.20*i.m5Proportionality+0.15*i.m6MercyCorrection+0.20*i.m7Accountability;
  const outcome:MizanOutcome=score>=85?'READY':score>=75?'CONDITIONAL':score>=60?'REVIEW_REQUIRED':'NOT_READY';
  return {outcome,score:Math.round(score*100)/100,hardGates,legalFinding:null,advisoryOnly:true as const};
}
