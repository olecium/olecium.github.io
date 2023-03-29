
export const validateEmail = (mail: string): boolean => {
    if (mail.length > 256) {
        return false;    
    }
    if (/^\w+(?:[.-]\w+)*@\w+(?:[.-]\w+)*(?:\.\w{2,8})+$/.test(mail)) {
        return true;
    }
    return false;
};