/* eslint-disable react/prop-types */
export default function NoTasksFound({message}) {
    return(
        <p className="text-center text-3xl">
            {message}. Please Add One.
        </p>
    )
}