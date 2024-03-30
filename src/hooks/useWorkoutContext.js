import { useContext } from "react";
import { WorkoutContext } from "../contexts/workoutContext";

export const useWorkoutsContext = () => {
    const context = useContext(WorkoutContext)
    if (!context) {
        throw Error('hook must be in the correct scope')
    }
    return context
}
