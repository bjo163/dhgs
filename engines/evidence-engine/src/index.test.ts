import { describe, expect, it } from 'vitest';
import { scoreEvidence } from './index';
describe('scoreEvidence',()=>{it('returns an advisory level',()=>{const r=scoreEvidence({reliability:90,corroboration:90,directness:80,integrity:95,uncertaintyPenalty:10});expect(r.level).toBe('E4_STRONG');expect(r.advisoryOnly).toBe(true);});});
