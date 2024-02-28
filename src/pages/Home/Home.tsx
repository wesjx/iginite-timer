import { HandPalm, Play } from "phosphor-react";
import { HomeContainer, StartCountdownButton, StopCountdownButton } from "./styles";
import { useContext} from "react";
import { FormProvider, useForm} from "react-hook-form"
import { NewCycleForm } from "./components/NewCycleForm";
import { CountDown } from "./components/CountDown";
import { CycleContext } from "../../contexs/CycleContext";


interface NewCycleFormData {
    task: string
    minutesAmount: number
}


export function Home() {

    const { createNewcycle, interruptCurrentCycle, activeCycle } = useContext(CycleContext)

    const newCycleForm = useForm<NewCycleFormData>({
        defaultValues: {
            task: '',
            minutesAmount: 0,
        },
    })

    const { handleSubmit, watch, reset } = newCycleForm

    function handleCreateNewCycle(data: NewCycleFormData) {
        createNewcycle(data)
        reset()
    }

    const task = watch('task')
    const isSubmitDisabled = !task;

    return (

        <HomeContainer>
            <form onSubmit={handleSubmit(handleCreateNewCycle)} action="">
                <FormProvider {...newCycleForm}>
                    <NewCycleForm />
                </FormProvider>
                <CountDown />
                {activeCycle ? (
                    <StopCountdownButton onClick={interruptCurrentCycle} type="button">
                        <HandPalm size={24} />
                        Interrupt
                    </StopCountdownButton>
                ) : (
                    <StartCountdownButton disabled={isSubmitDisabled} type="submit">
                        <Play size={24} />
                        Play
                    </StartCountdownButton>)}
            </form>
        </HomeContainer>
    )
}