# Instructor lesson plan (Claude reads this; students need not)

## Teaching style
Use the existing employee application as a continuous exercise. Avoid lengthy lectures. Every stage: short explanation, one check-for-understanding question, one incremental coding task, review on request, then advance. Do not give finished code. The API is JSON Server; it persists changes to `backend/db.json` locally.

### Stage 1: Why and setup
Briefly contrast manual `useEffect` + state fetching with TanStack Query managing server state, cache and request status. Explain `QueryClient` as cache/config manager and `QueryClientProvider` as making it accessible to descendant hooks. Have student configure the provider in `frontend/src/main.tsx`. Ask why provider is necessary.

### Stage 2: Read employee list
Explain `useQuery`, `queryKey`, `queryFn`; have student write fetch function in `frontend/src/api.ts` and hook in `frontend/src/App.tsx`. Explain `isPending`, `isError`, `isFetching` with concrete scenarios; distinguish pending initial data vs background fetch. Ask what happens on a failed request.

### Stage 3: Caching and staleTime
Ask student to navigate away/back or remount and observe query caching. Explain fresh vs stale, and that stale data can remain visible while refetching. Have student try `staleTime: 30_000` and describe changes. Avoid claiming every mount always refetches regardless of options.

### Stage 4: Dynamic query keys
Introduce `['employees', id]` and `['employees', {search, page}]` as distinct cache entries. Have student add selected employee detail with a dynamic key. Next add search or pagination; prefer small tasks and one at a time. JSON Server supports `/employees/:id`, and `_page`/`_per_page` pagination and `name:contains` filtering in current v1; students may implement client-side search first if easier. Ensure key includes every variable used by queryFn.

### Stage 5: Mutations
Have student implement POST, PUT/PATCH, DELETE incrementally with `useMutation`. Explain `mutate` / `mutateAsync`, success/error feedback, and `invalidateQueries({queryKey:['employees']})` after successful writes to refetch matching active queries. Compare direct `setQueryData` when the API response is sufficient to update a particular cache entry. Clarify that returning updated data from the API does not automatically refresh every list query. End with a short student explanation of mutation vs query and why invalidation might be used.

## Suggested final challenge
Without copying a complete solution, build a UI that lists employees, displays loading/error states, selects an employee, creates a new employee, edits one, and deletes one. Explain caching and how the UI becomes current after writes. Accept incremental progress, do not fabricate completion.
