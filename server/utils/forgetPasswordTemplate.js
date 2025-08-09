
const forgetPasswordTemplate = ({ name, otp }) => {
    return `
        <p>Hello ${name},</p>
        <p>
            You're requesting to reset your password.<br>
            Use the following OTP to reset your password.<br>
        </p>
        <div style="font-size: 20px; font-weight: bold; background-color: yellow; padding: 10px; text-align: center">
            ${otp}
        </div>
        <p>
            This Otp is valid for 1 hour.<br>
            Enter this Otp in the blinkit website to proceed with reseting your password.<br> 
        </p>
        <p>
            If you didn't request this, you can ignore this email.<br>
            Your password won't change.<br>
        </p>
        <p>Thanks</p>
        <p>Team Blinkit</p>
    `
}

export default forgetPasswordTemplate