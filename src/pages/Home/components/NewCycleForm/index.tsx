import { useFormContext } from "react-hook-form";
import { FormContainer, MinutesAmountInput, TaskInput } from "./styless";
import { useContext } from "react";
import { CycleContext } from "../../../../contexs/CycleContext";

export function NewCycleForm() {

    const { activeCycle } = useContext(CycleContext)
    const { register } = useFormContext()

    return (

        
        <FormContainer>
                    <label htmlFor="task"> I go to work in</label>

                    <TaskInput
                        id="task"
                        placeholder="Give a name for your project"
                        list="task-suggestions"
                        disabled={!!activeCycle}
                        {...register('task')}
                    />

                    <datalist id="task-suggestions">
                    </datalist>


                    <label htmlFor="">during</label>
                    <MinutesAmountInput
                        type="number"
                        id="minutesAmount"
                        placeholder="00"
                        step={5}
                        min={5}
                        max={60}
                        disabled={!!activeCycle}
                        {...register('minutesAmount', { valueAsNumber: true })}
                    />

                    <span>minutes.</span>

                </FormContainer>
    )
}