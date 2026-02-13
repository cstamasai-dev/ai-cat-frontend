export interface Cat {
    weight?: {
        imperial?: string;
        metric?: string;
    };
    id: number;
    name?: string;
    temperament?: string[];
    origin?: string;
    description?: string;
    life_span?: string;
    indoor?: number;
    lap?: number;
    child_friendly?: number;
    dog_friendly?: number;
    energy_level?: number;
    grooming?: number;
    health_issues?: number;
    intelligence?: number;
    stranger_friendly?: number;
    hairless?: number;
    rare?: number;
    short_legs?: number;
    hypoallergenic?: number;
    reference_image_id?: string;
}