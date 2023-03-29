export const secureMathRandom = (): number => {
    return window.crypto.getRandomValues(new Uint32Array(1))[0] / 1e+10
}

export const getUid = (length: number = 20): string => {
    const chars: string = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let str: string = '';
    for (let i = 0; i < length; i++) {
        str += chars.charAt(Math.floor(secureMathRandom()*(chars.length)));
    }
	return str;
}; 
 
