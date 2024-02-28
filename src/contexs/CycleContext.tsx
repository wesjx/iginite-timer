import { ReactNode, createContext, useEffect, useReducer, useState } from "react";
import { cycleReducer } from "../Reducers/cycles/reducers";
import { addNewCycleAction, interruptCurrentCycleAction, markCurrentCycleAsFinishedAction } from "../Reducers/cycles/actions";
import { differenceInSeconds } from "date-fns";

interface Cycle {
    id: string;
    task: string;
    minutesAmount: number
    startDate: Date
    interruptedDate?: Date
    finishedDate?: Date
}

interface CreateNewCycleData {
    task: string;
    minutesAmount: number;
}

interface CycleContextType {
    cycles: Cycle[];
    activeCycle: Cycle | undefined;
    activeCycleId: string | null;
    markCurrentCycleAsFinished: () => void;
    amountSecondsPassed: number;
    markCurrentSeconds: (secondsDifference: number) => void;
    createNewcycle: (data: CreateNewCycleData) => void;
    interruptCurrentCycle: () => void;
}

export const CycleContext = createContext({} as CycleContextType)

interface CyclesContextProviderProps {
    children: ReactNode;
}


export function CycleContextProvider({ children }: CyclesContextProviderProps) {
    const [cyclesState, dispatch] = useReducer(cycleReducer, {
        cycles: [],
        activeCycleId: null,
    }, 
    (initialState) => {
        const storageStateJSON = localStorage.getItem('@ignite-Timer:cycles-state-1.0.0');

        if (storageStateJSON) {
            return JSON.parse(storageStateJSON)
        }

        return initialState

    })


    const { cycles, activeCycleId } = cyclesState;
    const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)

    const [amountSecondsPassed, setamountSecondsPassed] = useState(() => {
        if (activeCycle) {
            return differenceInSeconds(
                new Date(),
                new Date(activeCycle.startDate)
            )
        }

        return 0
    })

    useEffect(() => {
        const stateJSON = JSON.stringify(cyclesState)

        localStorage.setItem('@ignite-Timer:cycles-state-1.0.0', stateJSON)
    }, [cyclesState])




    function createNewcycle(data: CreateNewCycleData) {

        const id = String(new Date().getTime())

        const newCycle: Cycle = {
            id,
            task: data.task,
            minutesAmount: data.minutesAmount,
            startDate: new Date()
        }

        dispatch(addNewCycleAction(newCycle))

        setamountSecondsPassed(0)
    }

    function interruptCurrentCycle() {
        dispatch(interruptCurrentCycleAction())
    }

    function markCurrentCycleAsFinished() {
        dispatch(markCurrentCycleAsFinishedAction())
    }

    function markCurrentSeconds(secondsDifference: number) {
        setamountSecondsPassed(secondsDifference)
    }

    return (
        <CycleContext.Provider
            value={{
                cycles,
                activeCycle,
                activeCycleId,
                markCurrentCycleAsFinished,
                amountSecondsPassed,
                markCurrentSeconds,
                createNewcycle,
                interruptCurrentCycle,

            }}>
            {children}
        </CycleContext.Provider>
    )
}
