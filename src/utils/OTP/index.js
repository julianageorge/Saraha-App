
/**
 * 
 * @param {*} expiredTime -in milliseconds
 * @returns - object {otp,otpExpired}
 */
export function generateOtp(expiredTime=10*60*1000){
     const otp=Math.floor(100000+Math.random()*900000);
        const otpExpired=new Date(Date.now()+expiredTime);
       return{otp,otpExpired}
    }
