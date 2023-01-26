export class Photo {
    
    constructor (
        private photo: string,
        private showId: string
    ) {}

    public getPhoto = (): string => {
        return this.photo
    }

    public getShowId = (): string => {
        return this.showId
    }

    static toPhotoModel = (photo: any): Photo => {
        return new Photo (
            photo.photo,
            photo.show_id
        )
    }
}