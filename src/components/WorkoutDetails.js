import { formatDistanceToNow } from 'date-fns'
import { useWorkoutsContext } from '../hooks/useWorkoutContext'
import { useAuthContext } from '../hooks/useAuthContext'


const WorkoutDetails = ({ workout }) => {
    const { dispatch } = useWorkoutsContext()
    const { user } = useAuthContext()

    const handleClick = async () => {
        if (!user) {
            return
        }
        const response = await fetch('https://exercizer-api.onrender.com/api/workouts/' + workout._id, {
            method: 'DELETE',
            headers: {'Authorization':`Bearer ${user.token}`}
        })
        const json = await response.json()
        if (response.ok) {
            dispatch({ type: 'DELETE_WORKOUT', payload: json })
        }
        console.log(json)
    }
    
    return (  
        <div className="workout-details">
            <h3>{workout.title}</h3>
            <p><strong>Reps: </strong>{workout.reps}</p>
            <p><strong>Load: </strong>{workout.load}</p>
            <p>{formatDistanceToNow(new Date(workout.createdAt), { addSuffix: true })}</p>
            <span className='material-symbols-outlined' onClick={handleClick}>delete</span>
        </div>
    );
}
 
export default WorkoutDetails;