const Notification = ({ message, allOk }) => {
    if (message === null) {
        return null
    }
    let className='error'
    if (!allOk) {
        className='badError'
    }
    return (
        <div className={className}>
            {message}
        </div>
    )
}

export default Notification