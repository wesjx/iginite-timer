import { Cycle } from "./reducers";

export enum ActionTypes {
    CREATE_NEW_CYCLE = 'CREATE_NEW_CYCLE',
    MARK_CURRENT_AS_FINISHED = 'MARK_CURRENT_AS_FINISHED',
    INTERRUPT_CURRENT_CYCLE = 'INTERRUPT_CURRENT_CYCLE'
}

export function addNewCycleAction(newCycle: Cycle) {
    return {
        type: ActionTypes.CREATE_NEW_CYCLE,
        payload: {
            newCycle,
        },
    }
}
export function markCurrentCycleAsFinishedAction() {
    return {
        type: ActionTypes.MARK_CURRENT_AS_FINISHED,
    }
}

export function interruptCurrentCycleAction() {
    return {
        type: ActionTypes.INTERRUPT_CURRENT_CYCLE,
    }
}
