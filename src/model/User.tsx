export interface User {
    uuid: string,
    name: string,
    isApproved: Boolean | undefined,
    isActive: Boolean | undefined,
    isAdmin: Boolean | undefined,
    imgUrl: string,
    createdDate: Date,
    lastLoginDate: Date | undefined
}