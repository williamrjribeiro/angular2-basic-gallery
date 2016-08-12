class Geo {
    lat: number;
    lng: number;
};

class Company {
    catchPhrase: string;
    name: string;
    bs: string;
};

class Adress {
    zipcode: string;
    street: string;
    suite: string;
    city: string;
    geo: Geo;
};

class User {
    username: string;
    address: Adress;
    website: string;
    company: Company;
    email: string;
    phone: string;
    name: string;
    id: number;
};
export { Geo, Company, Adress, User };
