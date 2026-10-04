export type EvidenceScoreInput = {
  reliability: number;
  corroboration: number;
  directness: number;
  integrity: number;
  uncertaintyPenalty: number;
};

export type EvidenceLevel = 'E0_UNVERIFIED'|'E1_WEAK'|'E2_SUPPORTED'|'E3_CORROBORATED'|'E4_STRONG';

const clamp = (n:number) => Math.max(0, Math.min(100, n));

export function scoreEvidence(input: EvidenceScoreInput){
  const score = clamp(0.30*input.reliability + 0.30*input.corroboration + 0.20*input.directness + 0.20*input.integrity - 0.20*input.uncertaintyPenalty);
  const level: EvidenceLevel = score < 25 ? 'E0_UNVERIFIED' : score < 45 ? 'E1_WEAK' : score < 65 ? 'E2_SUPPORTED' : score < 80 ? 'E3_CORROBORATED' : 'E4_STRONG';
  return { score: Math.round(score*100)/100, level, advisoryOnly: true as const };
}
