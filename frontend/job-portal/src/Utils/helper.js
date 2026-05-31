export const validateEmail = (email) =>{
  if(!email.trim())
  return 'Email is required';
  const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
  if(!emailRegex.test(email)) return 'please enter a valid email address';
  return ''};

export const validatePassword = (password) =>{
if(!password)
return 'Please enter password';
return '';
};
export const validatePassword1 = (password) =>{
if(!password)
return 'Please enter password';
if(password.length<8)
return 'password must be atleast 8 characters.';
if(!/(?=.*\d)/.test(password))
return 'password must contain atleast one number';
if(!/(?=.*[A-Z])/.test(password))
return 'password must contain atleast one uppercase letter';
if(!/(?=.*[a-z])/.test(password))
return 'password must contain atleast one lowercase letter';
if(!/(?=.*[\W_])/.test(password))
return 'password must contain atleast one special character';
}

export const validateAvatar = (file) =>{
  if(!file) return "";

  const allowedTypes = ["image/jpeg","image/jpg","image/png"];

  
  if(!allowedTypes.includes(file.type)){
    return 'Avatar must be JPG or PNG file';
  }

  const maxSize = 5*1024*1024;
  if(file.size>maxSize){
    return 'Avatar must be less than 5MB'
  }
  return "";
}

export const validateConfirmPassword = (password,confirmPassword) =>{
  if(password !== confirmPassword)
  return 'Please reenter the password correctly.'
}
