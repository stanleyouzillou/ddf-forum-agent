---
trigger: always_on
---

# Recommended file layout (feature-driven)

src/
modules/
posts/
domain/
Post.ts
PostId.ts
app/
CreatePostUseCase.ts
infra/
InMemoryPostRepo.ts
api/
createPostHandler.ts
pages/
popular.tsx
tests/
e2e/
create-post.spec.ts
unit/
posts/
create-post.usecase.spec.ts

Rules:

- Everything belongs to a feature (`modules/<feature>`).
- Shared utilities belong in `src/shared`.
- Resist framework-driven scattering; put feature files together.
