# Contributing to Heritage

Thanks for taking the time to contribute — it means a lot for a project like this.

## Bug Fixes

If you want to fix a bug or improve the codebase:

- Fork the repository
- Create a new branch:
```bash
  git checkout -b fix/your-fix-name
```
- Make your changes
- Commit clearly:
```bash
  git commit -m "fix: short description"
```
- Push and open a Pull Request

Read the existing code before making changes and keep fixes focused.

## Guidelines

- Keep changes small and on-topic
- Do not break existing features
- Follow the existing code style

## Reporting Issues

If you find a bug but can't fix it:

- Open an issue
- Describe the problem clearly
- Include steps to reproduce it if possible

## Conventions

### Grade calculator

Data files live in `src/lib/data/{university}/{major}.ts` and are registered in `src/lib/data/index.ts`.
#### File structure 


```typescript
export const data = {
  "l1": {
    s1: [
      {
        id: "l1s1_1",
        name: "Analysis 1",
        td: true,
        exam: true,
        result: 0,
        examRatio: 0.6,
        coefficient: 4,
        credit: 4,
      },
      // ...more modules
    ],
    s2: [
      // ...
    ],
  },
  // ...more levels
};
```

check `src/lib/data/tebessa/cs.ts` for an example

| Key | Format | Examples |
|---|---|---|
| University folder | lowercase, no spaces | `tebessa`, `constantine1`, `usthb` |
| Major file | lowercase, no spaces | `cs.ts`, `math.ts` |
| Academic level | `l{n}` for licence, `m{n}-{spec}` for master | `l1`, `l2`, `m1-si`, `m2-rsd` |
| Module id | `{level}{semester}_{index}` | `l1s1_1`, `m1s2_4` |


#### Module fields

| Field | Type | Description |
|---|---|---|
| `id` | `string` | Unique across the entire file — never reuse |
| `name` | `string` | Display name shown in the UI |
| `td` | `boolean` | Whether a TD grade input exists |
| `exam` | `boolean` | Whether an exam grade input exists |
| `examRatio` | `number` | Exam weight between 0 and 1 — e.g. `0.6` means 60% exam, 40% TD |
| `coefficient` | `number` | Module weight in the semester average |
| `credit` | `number` | ECTS credits |
| `result` | `number` | Always `0` — computed at runtime, do not change |
---


`td: true, exam: false` → TD grade only  
`td: false, exam: true` → exam grade only  
`td: true, exam: true` → both, weighted by `examRatio`


#### Registering the file

Once the data file is ready, add an entry to `src/lib/data/index.ts`:

```typescript
export const dataRegistry: Record<string, () => Promise> = {
  'tebessa/cs': () => import('$lib/data/tebessa/cs'),
  'yourcity/yourmajor': () => import('$lib/data/yourcity/yourmajor'), // add this
};
```

The key must match the URL pattern `/calc/{university}/{major}/`.


### Archive

Files are stored in `static/univs/` and served statically — no configuration needed beyond following the folder structure and naming rules.

#### Folder structure

`static/univs/{university}/{major}/{year}/{level}/{semester}/{module}/{category}/files...`

Example:

`static/univs/tebessa/cs/25-26/l1/s1/algo1/course/chapter1-introduction.pdf`

#### Folder naming

| Segment | Format | Examples |
|---|---|---|
| University | lowercase, no spaces | `tebessa`, `constantine` |
| Major | lowercase, no spaces | `cs`, `math`, `law` |
| Year | `YY-YY` | `25-26`, `24-25` |
| Academic level | same as calculator | `l1`, `l2`, `m1-si` |
| Semester | `s1` or `s2` | `s1` |
| Module | lowercase, no spaces, commonly recognized name | `algo1`, `analysis1`, `english` |
| Category | see table below | `course`, `tds` |

#### Categories

| Folder | Contents |
|---|---|
| `course` | Lecture notes and course documents |
| `tds` | TD sheets and solutions |
| `tps` | TP sheets and lab work |
| `presentations` | Slides |
| `exams` | Past exams and corrections |


Add other folders if genuinely needed — keep the name self-explanatory.

#### File naming

`chapter{n}-{title}.pdf`

`td{n}.pdf`

`td{n}-correction.pdf`

`exam.pdf`

`exam-correction.pdf`

**Rules:**
- **Professor contact details** — name and university affiliation are fine to keep. Remove all contact details including institutional email addresses, phone numbers, and office information.
- **Student information** — remove any document that contains student names, ID numbers, or grades. Corrected exams with student work on them do not belong here.
- Lowercase, hyphens instead of spaces — no underscores, no camelCase
- No numbering padding needed (`chapter1` not `chapter01`)
- Title is optional but encouraged when it adds clarity — `chapter3-recursion.pdf` is better than `chapter3.pdf`
- Files must be unlocked — no passwords, no restrictions
- PDFs are preferred, though other formats are accepted .