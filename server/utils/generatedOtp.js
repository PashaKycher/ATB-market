
const generatedOtp = () => {
    return Math.floor(Math.random() * 900000) + 100000; // generate random 6 digit number from 100000 to 999999
}

export default generatedOtp