import { useContext, useEffect } from "react";
import { CountdownContainer, Separator } from "./styles";
import { differenceInSeconds } from "date-fns";
import { CycleContext } from "../../../../contexs/CycleContext";


export function CountDown() {

    const { 
        activeCycle,
        activeCycleId,
        markCurrentCycleAsFinished,
        amountSecondsPassed,
        markCurrentSeconds
    } = useContext(CycleContext)


    const totalSeconds = activeCycle ? activeCycle.minutesAmount * 60 : 0;

    useEffect(() => {
        let interval: number

        if (activeCycle) {
            interval = setInterval(() => {
                const secondsDifference = differenceInSeconds(
                    new Date(), 
                    new Date(activeCycle.startDate)
                )

                if (secondsDifference >= totalSeconds) {
                    markCurrentCycleAsFinished()
                    markCurrentSeconds(totalSeconds)
                    clearInterval(interval)
                } else {
                    markCurrentSeconds(secondsDifference)
                }
            }, 1000)
        }

        return () => {
            clearInterval(interval)
        }
    }, [activeCycle, activeCycleId, markCurrentCycleAsFinished, markCurrentSeconds, totalSeconds])


    const currentSeconds = activeCycle ? totalSeconds - amountSecondsPassed : 0;

    const minutesAmountTimerView = Math.floor(currentSeconds / 60);
    const secondsAmountTimerView = currentSeconds % 60;

    const minutes = String(minutesAmountTimerView).padStart(2, '0')
    const seconds = String(secondsAmountTimerView).padStart(2, '0')
    //padStart e um metodo que preenche uma string ate um tamanho especifico que definimos.
    //primeiro parametro aso quantos caracteres queremos no caso do timer 2 digitos

    useEffect(() => {
        if (activeCycle) {
            document.title = `${minutes} : ${seconds}`
        }
    }, [activeCycle, minutes, seconds])

    
    return (
        <CountdownContainer>
                    <span>
                        {minutes[0]}
                        {/* estamos pegando a primeira letra do string que esta na lista
                         que o zero significa o primeiro item da lista */}
                    </span>
                    <span>
                        {minutes[1]}
                    </span>
                    <Separator>
                        :
                    </Separator>
                    <span>
                        {seconds[0]}
                    </span>
                    <span>
                        {seconds[1]}
                    </span>
                </CountdownContainer>
    )
}