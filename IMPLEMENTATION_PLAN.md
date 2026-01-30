# Implementation Plan: LingoCalm

> Generated on: 2026-01-30
> Estimated Tasks: 8
> Estimated Completion: 2-3 Days

---

## 📋 Pre-Implementation Checklist

- [x] Signup redirect issue fixed
- [x] Firebase Authentication working
- [x] Firestore connected
- [x] PRD analyzed and understood
- [ ] This plan reviewed and approved by student

---

## 🎯 Project Overview

**Application:** LingoCalm
**Type:** Educational / Language Learning
**Description:** A gentle, low-pressure language learning app focusing on vocabulary and calm progress tracking without gamification anxiety.

---

## 👥 User Roles & Permissions

### Role 1: User (Learner)
- **Description:** Standard user learning a language.
- **Can Access:** Dashboard, Lessons, Profile, Progress Stats.
- **Cannot Access:** Admin panels, Global content management.

### Role 2: Admin (Optional/Workshop Requirement)
- **Description:** System administrator (demonstration role).
- **Can Access:** System stats, Content overrides.
- **Cannot Access:** Personal progress of others (privacy perspective).

---

## 🗃️ Database Schema

### Collection: `users`
```javascript
{
  uid: string,
  email: string,
  name: string,
  role: string,             // 'user' | 'admin'
  language: string,         // Current target language
  createdAt: timestamp,
  updatedAt: timestamp,
  // Educational stats
  streak: number,
  totalLessonsCompleted: number,
  totalWordsLearned: number,
  lastVisit: string
}
```

### Collection: `lessonHistory` (Subcollection of users)
```javascript
{
  lessonId: string,
  language: string,
  words: array,
  completedAt: timestamp
}
```

---

## 🚀 Implementation Tasks

### Phase A: Foundation (Auth & Roles)

#### Task A1: User Collection Enhancement (Completed)
- **Priority:** HIGH
- **Description:** Setup basic user document structure with Firestore.
- **Status:** ✅ Complete

#### Task A2: Role-Based Access Setup
- **Priority:** HIGH
- **Estimated Time:** 20 minutes
- **Description:** Implement role-based routing and access control (Workshop Requirement).
- **Files to Create:**
  - `src/components/RoleBasedRoute.tsx`
- **Files to Modify:**
  - `src/App.tsx`
  - `src/context/AuthContext.tsx`
- **Acceptance Criteria:**
  - [x] Users have a 'role' field (default 'user')
  - [x] Admin route created (placeholder)
  - [x] Unauthorized access blocked
- **Status:** ✅ Complete

---

### Phase B: Core Learning Features

#### Task B1: Dashboard & Daily Lesson (Completed)
- **Priority:** HIGH
- **Description:** Main learning interface with vocabulary cards and AI integration.
- **Status:** ✅ Complete

#### Task B2: Progress Visualization (Completed)
- **Priority:** MEDIUM
- **Description:** Visual bars and stats for tracking progress calmly.
- **Status:** ✅ Complete

#### Task B3: Mock Data Fallback (Completed)
- **Priority:** HIGH
- **Description:** Robust fallback system for when AI quota is exceeded.
- **Status:** ✅ Complete

---

### Phase C: Polish & Security

#### Task C1: Security Rules Implementation
- **Priority:** HIGH
- **Description:** Implement Firestore security rules for user data protection.
- **Acceptance Criteria:**
  - [ ] Users can only read/write their own progress
  - [ ] Admin role checks (if A2 implemented)
  - [ ] Public/Private data separation

#### Task C2: Error Handling & Resilience (Completed)
- **Priority:** MEDIUM
- **Description:** Handle permissions errors and API failures gracefully.
- **Status:** ✅ Complete

---

## ⚠️ AI Features (Requires Explicit Approval)

The following AI features were identified in the PRD:

| Feature | Description | Implementation Complexity | Approved? |
|---------|-------------|---------------------------|-----------|
| AI Lesson Generation | Generate daily vocabulary using Gemini | Medium | ✅ Implemented |
| TTS Pronunciation | Text-to-Speech for words | Low | ✅ Implemented |

---

## 📊 Progress Tracker

| Task | Status | Committed | Notes |
|------|--------|-----------|-------|
| A1 | ✅ Complete | - | Basic Auth & Firestore done |
| A2 | ✅ Complete | - | Role handling Implemented |
| B1 | ✅ Complete | - | Core loop working |
| B2 | ✅ Complete | - | UI polished |
| B3 | ✅ Complete | - | Mock data active |
| C1 | ⏳ Pending | - | File created, rules need deployment check |
| C2 | ✅ Complete | - | improved resilience |

**Legend:** ⏳ Pending | 🔄 In Progress | ✅ Complete | ❌ Blocked

---

## ✅ Final Checklist

- [ ] All tasks completed
- [ ] All tests passing
- [ ] Security rules implemented
- [ ] Error handling complete
- [ ] Code committed and pushed
- [ ] Documentation updated
