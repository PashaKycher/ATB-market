
const verifyEmailTemplate = ({ name, url }) => {
    return `
        <p>Hello ${name},</p>
        <p>Thank you for registering on blinkit.</p>
        <a href=${url} style="color:black; 
                                background-color:orange; 
                                margin-top:10px; 
                                padding:20px; 
                                text-decoration:none;">
            Verify Email
        </a>
    `
}

export default verifyEmailTemplate