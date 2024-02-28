import { ActionTypes } from "./actions";
import { produce } from "immer";

export interface Cycle {
    id: string;
    task: string;
    minutesAmount: number
    startDate: Date
    interruptedDate?: Date
    finishedDate?: Date
}

interface CyclesState {
    cycles: Cycle[]
    activeCycleId: string | null
}

export function cycleReducer(state: CyclesState, action: any) {

    switch (action.type) {
        case ActionTypes.CREATE_NEW_CYCLE:
            // return {
            //     ...state,
            //     cycles: [...state.cycles, action.payload.newCycle],
            //     activeCycleId: action.payload.newCycle.id
            // };

            return produce(state, draft => {
                draft.cycles.push(action.payload.newCycle)
                draft.activeCycleId = action.payload.newCycle.id;
            })
            
        case ActionTypes.INTERRUPT_CURRENT_CYCLE: {
            // return {
            //     ...state,
            //     cycles: state.cycles.map(cycle =>
            //         cycle.id === state.activeCycleId
            //             ? { ...cycle, interruptedDate: new Date() }
            //             : cycle
            //     ),
            //     activeCycleId: null
            // };
            const currentCycleIndex = state.cycles.findIndex(cycle => {
                return cycle.id === state.activeCycleId
            })

            if (currentCycleIndex < 0) {
                return state
            }
            return produce(state, draft => {
                    draft.activeCycleId = null
                    draft.cycles[currentCycleIndex].interruptedDate = new Date;
                })
            }


        case ActionTypes.MARK_CURRENT_AS_FINISHED:{
        //     return {
        //         ...state,
        //         cycles: state.cycles.map(cycle =>
        //             cycle.id === state.activeCycleId
        //                 ? { ...cycle, finishedDate: new Date() }
        //                 : cycle
        //         ),
        //         activeCycleId: null
        //     };
        // default:
        //     return state
            const currentCycleIndex = state.cycles.findIndex(cycle => {
                return cycle.id === state.activeCycleId
            })

            if (currentCycleIndex < 0) {
                return state
            }
            return produce(state, draft => {
                    draft.activeCycleId = null
                    draft.cycles[currentCycleIndex].finishedDate = new Date;
                })
            }
            default:
                return state
    }

}
export { ActionTypes };
