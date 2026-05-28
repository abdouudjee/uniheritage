export const dataRegistry: Record<string, () => Promise<any>> = {
    'tebessa/cs': () => import('$lib/data/tebessa/cs')
};