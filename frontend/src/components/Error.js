
const Error = ({ message }) => {
    if (message === null) {
        return null
    }


    const eStyle = {
        color: "red",
        background: "lightgrey",
        fontSize: "20px",
        borderStyle: "solid",
        borderRadius: "5px",
        padding: "10px",
        marginBottom: "10px"
    }


    return (
        <div style={eStyle}>
            {message}
        </div>
    )
}
export default Error
