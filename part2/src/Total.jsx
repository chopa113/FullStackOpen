export const Total = ({ course }) => {
    const parts = course.parts.map(part => part.exercises)
    return <p><b>total of {parts.reduce((acc, curr) => acc + curr)} exercises</b></p>
}
export default Total;