export const isNotExpired = (expiryDate) => {
    const currentDate = new Date();
    const expiry = new Date(expiryDate);

    return currentDate < expiry; // Returns true if still valid, false if expired
}