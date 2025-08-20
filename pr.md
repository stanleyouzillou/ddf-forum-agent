## Summary

Implements create post and upvote flow with in-memory repository, Next.js API handlers, and Popular page UI.
Adds unit + E2E tests. Stabilizes in-memory repo across HMR via globalThis.

## Gherkin (Acceptance contract)

Feature: Upvote post

Background:
Given an existing member "alice" is signed in
And the popular page is visible

Scenario: Member upvotes a post and the score increases by 1
Given a post titled "Awesome tool" exists with score 0
When alice upvotes the post titled "Awesome tool"
Then I should see the post titled "Awesome tool" on the popular page
And its score should be 1

Scenario: Member cannot upvote the same post twice (idempotent)
Given a post titled "Awesome tool" exists with score 1
And alice has already upvoted the post titled "Awesome tool"
When alice upvotes the post titled "Awesome tool" again
Then I should see the post titled "Awesome tool" on the popular page
And its score should be 1

## Changes

- API routes: [src/pages/api/posts/index.ts](cci:7://file:///c:/Users/colp2/OneDrive/Documents/projects-coding/dddf-forum-agent/src/pages/api/posts/index.ts:0:0-0:0), `src/pages/api/posts/[id]/upvote.ts`
- Handlers: [src/modules/api/createPostHandler.ts](cci:7://file:///c:/Users/colp2/OneDrive/Documents/projects-coding/dddf-forum-agent/src/modules/api/createPostHandler.ts:0:0-0:0), [src/modules/api/upvotePostHandler.ts](cci:7://file:///c:/Users/colp2/OneDrive/Documents/projects-coding/dddf-forum-agent/src/modules/api/upvotePostHandler.ts:0:0-0:0)
- Domain/Use-cases: [Post](cci:2://file:///c:/Users/colp2/OneDrive/Documents/projects-coding/dddf-forum-agent/src/modules/posts/domain/Post.ts:9:0-32:1), [CreatePostUseCase](cci:2://file:///c:/Users/colp2/OneDrive/Documents/projects-coding/dddf-forum-agent/src/modules/posts/app/CreatePostUseCase.ts:9:0-20:1), [UpvotePostUseCase](cci:2://file:///c:/Users/colp2/OneDrive/Documents/projects-coding/dddf-forum-agent/src/modules/posts/app/UpvotePostUseCase.ts:7:0-19:1)
- Infra: [InMemoryPostRepo](cci:2://file:///c:/Users/colp2/OneDrive/Documents/projects-coding/dddf-forum-agent/src/modules/posts/infra/InMemoryPostRepo.ts:9:0-28:1) persisted on `globalThis` (HMR-safe)
- UI: [src/pages/popular.tsx](cci:7://file:///c:/Users/colp2/OneDrive/Documents/projects-coding/dddf-forum-agent/src/pages/popular.tsx:0:0-0:0)
- Tests:
  - Unit: `tests/unit/posts/*.spec.ts`
  - E2E API: [tests/e2e/create-post.spec.ts](cci:7://file:///c:/Users/colp2/OneDrive/Documents/projects-coding/dddf-forum-agent/tests/e2e/create-post.spec.ts:0:0-0:0), [tests/e2e/upvote-post.spec.ts](cci:7://file:///c:/Users/colp2/OneDrive/Documents/projects-coding/dddf-forum-agent/tests/e2e/upvote-post.spec.ts:0:0-0:0)
  - E2E UI: `tests/e2e/popular-ui.spec.ts`

## How to test locally

- pnpm dev, then open http://localhost:3000/popular
- Or run E2E: pnpm test:e2e

## Notes

- Next.js dev HMR can cause dynamic API routes to 404 on first hit; tests warm the route and repo is a stable singleton.
