export interface IVehicleDetail
{
    id: string;
    description: string;
    price: string;
    meta: {
        passengers: number;
        drivetrain: string[];
        bodystyles: string[];
        emissions: {
            template: string;
            value: number;
        };
    };
}
