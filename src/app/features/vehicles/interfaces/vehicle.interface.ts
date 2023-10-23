export interface IVehicle {
    id: string;
    name: string;
    modelYear: string;
    apiUrl: string;
    media: {
        name: string;
        url: string;
    }[];
}