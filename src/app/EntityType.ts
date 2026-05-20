export interface EntityType {
    state: 'new' | 'persisted'
}

export function NewEntity(): EntityType {
    return {
        state: 'new'
    }
}

export function PersistedEntity(): EntityType {
    return {
        state: 'persisted'
    }
}
