import type { ScreenContract } from './design-contracts';

const COMMON_STATES = ['loading', 'ready', 'empty', 'error', 'forbidden'] as const;
const COMMON_A11Y = ['Keyboard reachable', 'Visible focus', 'Status not conveyed by color alone'] as const;

function screen(input: Omit<ScreenContract, 'states' | 'accessibility_notes'> & Partial<Pick<ScreenContract, 'states' | 'accessibility_notes'>>): ScreenContract {
  return {
    ...input,
    states: input.states ?? COMMON_STATES,
    accessibility_notes: input.accessibility_notes ?? COMMON_A11Y
  };
}

export const CANONICAL_SCREEN_CONTRACTS: readonly ScreenContract[] = [
  screen({ screen_id:'PUB-001', title:'Home', purpose:'Home and orientation', primary_user:'Public', allowed_roles:['PUBLIC'], required_data:['service_status'], primary_actions:['navigate-open-book'], dangerous_actions:[], audit_events:[] }),
  screen({ screen_id:'PUB-010', title:'Open Book Search', purpose:'Search Open Book', primary_user:'Public / media', allowed_roles:['PUBLIC'], required_data:['public_records'], primary_actions:['search-public-records'], dangerous_actions:[], audit_events:[] }),
  screen({ screen_id:'PUB-020', title:'Public Decision Detail', purpose:'Understand a public decision', primary_user:'Public', allowed_roles:['PUBLIC'], required_data:['public_decision'], primary_actions:['read-basis','open-correction-history'], dangerous_actions:[], audit_events:[] }),
  screen({ screen_id:'PUB-030', title:'Correction History', purpose:'Compare correction history', primary_user:'Public', allowed_roles:['PUBLIC'], required_data:['correction_versions'], primary_actions:['compare-versions'], dangerous_actions:[], audit_events:[] }),
  screen({ screen_id:'PUB-040', title:'Public KPI / Data', purpose:'Inspect public KPI and data', primary_user:'Public / researcher', allowed_roles:['PUBLIC'], required_data:['public_metrics'], primary_actions:['inspect-data','open-table-alternative'], dangerous_actions:[], audit_events:[] }),

  screen({ screen_id:'CIT-001', title:'Citizen Dashboard', purpose:'Citizen dashboard', primary_user:'Citizen', allowed_roles:['CITIZEN'], required_data:['owned_cases','notifications'], primary_actions:['open-case','submit-case'], dangerous_actions:[], audit_events:['PORTAL_DASHBOARD_VIEWED'] }),
  screen({ screen_id:'CIT-010', title:'Submit Case', purpose:'Submit a case', primary_user:'Citizen', allowed_roles:['CITIZEN'], required_data:['intake_schema','privacy_notice'], primary_actions:['save-draft','submit-case'], dangerous_actions:[], audit_events:['CASE_SUBMISSION_STARTED','CASE_SUBMITTED'] }),
  screen({ screen_id:'CIT-020', title:'Case Detail', purpose:'Track case', primary_user:'Citizen / representative', allowed_roles:['CITIZEN','AUTHORIZED_REPRESENTATIVE'], required_data:['case_status','case_timeline'], primary_actions:['view-status','view-notices'], dangerous_actions:[], audit_events:['CASE_VIEWED'] }),
  screen({ screen_id:'CIT-030', title:'Evidence Upload', purpose:'Upload evidence', primary_user:'Authorized participant', allowed_roles:['AUTHORIZED_PARTICIPANT'], required_data:['case_ref','upload_policy'], primary_actions:['upload-evidence'], dangerous_actions:[], audit_events:['EVIDENCE_UPLOAD_STARTED','EVIDENCE_UPLOADED'] }),
  screen({ screen_id:'CIT-040', title:'Appeal / Correction Request', purpose:'Request appeal or correction', primary_user:'Eligible party', allowed_roles:['ELIGIBLE_PARTY'], required_data:['appeal_eligibility','deadline'], primary_actions:['submit-appeal','request-correction'], dangerous_actions:[], audit_events:['APPEAL_REQUESTED','CORRECTION_REQUESTED'] }),
  screen({ screen_id:'CIT-050', title:'Notifications', purpose:'Review notifications', primary_user:'Authenticated user', allowed_roles:['AUTHENTICATED_USER'], required_data:['notifications'], primary_actions:['read-notification'], dangerous_actions:[], audit_events:['NOTIFICATION_VIEWED'] }),

  screen({ screen_id:'OPS-001', title:'Operations Dashboard', purpose:'Work dashboard', primary_user:'Reviewer', allowed_roles:['REVIEWER'], required_data:['work_queue'], primary_actions:['open-work-item'], dangerous_actions:[], audit_events:['WORK_QUEUE_VIEWED'] }),
  screen({ screen_id:'OPS-010', title:'Case Workspace', purpose:'Review case material', primary_user:'Reviewer', allowed_roles:['REVIEWER'], required_data:['case','participants','timeline'], primary_actions:['review-case'], dangerous_actions:[], audit_events:['CASE_REVIEWED'] }),
  screen({ screen_id:'OPS-020', title:'Task Workspace', purpose:'Review and complete assigned tasks', primary_user:'Reviewer', allowed_roles:['REVIEWER'], required_data:['task','sla'], primary_actions:['update-task'], dangerous_actions:[], audit_events:['TASK_UPDATED'] }),
  screen({ screen_id:'OPS-030', title:'Evidence Workspace', purpose:'Review evidence safely', primary_user:'Reviewer', allowed_roles:['REVIEWER'], required_data:['evidence','provenance','confidentiality'], primary_actions:['review-evidence'], dangerous_actions:[], audit_events:['EVIDENCE_REVIEWED'] }),
  screen({ screen_id:'OPS-040', title:'Decision Preparation', purpose:'Prepare accountable decision', primary_user:'Decision owner', allowed_roles:['DECISION_OWNER'], required_data:['decision_context','review_outputs'], primary_actions:['prepare-decision'], dangerous_actions:[{ id:'finalize-high-impact-decision', label:'Finalize high-impact decision', requires_confirmation:true, requires_reason:true }], audit_events:['DECISION_PREPARED','DECISION_FINALIZATION_ATTEMPTED'] }),

  screen({ screen_id:'MZN-001', title:'Individual Mizan Review', purpose:'Complete independent Mizan review', primary_user:'Mizan reviewer', allowed_roles:['MIZAN_REVIEWER'], required_data:['mizan_input'], primary_actions:['submit-independent-review'], dangerous_actions:[], audit_events:['MIZAN_REVIEW_SUBMITTED'], accessibility_notes:[...COMMON_A11Y,'Independent review context must not reveal peer scoring before submission'] }),
  screen({ screen_id:'MZN-010', title:'Reviewer Comparison / Consensus', purpose:'Compare independent reviews after permitted reveal', primary_user:'Authorized quorum', allowed_roles:['MIZAN_QUORUM'], required_data:['submitted_reviews'], primary_actions:['compare-reviews'], dangerous_actions:[], audit_events:['MIZAN_COMPARISON_VIEWED'] }),
  screen({ screen_id:'MZN-020', title:'Mizan Summary', purpose:'Review Mizan summary', primary_user:'Reviewer / decision owner', allowed_roles:['MIZAN_REVIEWER','DECISION_OWNER'], required_data:['mizan_summary'], primary_actions:['review-summary'], dangerous_actions:[], audit_events:['MIZAN_SUMMARY_VIEWED'] }),

  screen({ screen_id:'AUD-001', title:'Audit Dashboard', purpose:'Audit material governance activity', primary_user:'Auditor', allowed_roles:['AUDITOR'], required_data:['audit_index'], primary_actions:['inspect-audit-record'], dangerous_actions:[], audit_events:['AUDIT_DASHBOARD_VIEWED'] }),
  screen({ screen_id:'AUD-010', title:'Chronological Audit Timeline', purpose:'Reconstruct chronological activity', primary_user:'Auditor', allowed_roles:['AUDITOR'], required_data:['audit_timeline'], primary_actions:['inspect-event'], dangerous_actions:[], audit_events:['AUDIT_TIMELINE_VIEWED'] }),
  screen({ screen_id:'AUD-020', title:'Decision Context Snapshot', purpose:'Reconstruct a decision context snapshot', primary_user:'Auditor', allowed_roles:['AUDITOR'], required_data:['decision_context_snapshot'], primary_actions:['reconstruct-decision'], dangerous_actions:[], audit_events:['DECISION_CONTEXT_RECONSTRUCTED'] }),

  screen({ screen_id:'SHD-001', title:'Systemic Oversight Dashboard', purpose:'Observe systemic governance risk without adjudicative bypass', primary_user:'Shadow', allowed_roles:['SHADOW_OVERSIGHT'], required_data:['systemic_metrics','control_findings'], primary_actions:['inspect-systemic-risk'], dangerous_actions:[], audit_events:['SHADOW_OVERSIGHT_VIEWED'] }),
  screen({ screen_id:'SHD-010', title:'Systemic Risk / Repeat Failure', purpose:'Inspect repeat and systemic failure patterns', primary_user:'Shadow', allowed_roles:['SHADOW_OVERSIGHT'], required_data:['repeat_failure_patterns'], primary_actions:['open-systemic-finding'], dangerous_actions:[], audit_events:['SYSTEMIC_RISK_VIEWED'] })
] as const;

export function getScreenContract(screenId: string): ScreenContract | undefined {
  return CANONICAL_SCREEN_CONTRACTS.find((contract) => contract.screen_id === screenId);
}
