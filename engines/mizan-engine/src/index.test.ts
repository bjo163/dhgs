import { describe, expect, it } from 'vitest';
import { evaluateMizan } from './index';
const base={jurisdictionValid:true,plausibleLegalBasis:true,evidenceThresholdMet:true,conflictResolved:true,redLineClear:true,rightsReviewComplete:true,m1Truth:90,m3Intent:80,m4Impact:85,m5Proportionality:90,m6MercyCorrection:80,m7Accountability:90};
describe('evaluateMizan',()=>{it('never returns legal guilt',()=>{const r=evaluateMizan(base);expect(r.legalFinding).toBeNull();});it('hard-fails readiness when jurisdiction is invalid',()=>{const r=evaluateMizan({...base,jurisdictionValid:false});expect(r.outcome).toBe('NOT_READY');expect(r.score).toBeNull();});});
