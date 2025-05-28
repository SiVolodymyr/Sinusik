import img from './error.jpg'

const ErrorMessage = () => {
    return (
        <img alt='errorImg' style={{ display: 'block', width: '250px', objectFit: 'contain', margin: '50px auto' }} src={img} />
    )
}

export default ErrorMessage;