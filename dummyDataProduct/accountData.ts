import { ImageSourcePropType } from 'react-native';

interface AccountData {
    id: number;
    name: string;
    email: string;
    phone: string;
    address: string;
    profilePicture: ImageSourcePropType;
    backgroundImage: ImageSourcePropType;
    sections: {
        title: string;
        data: { id: number; name: string; icon: string }[];
    }[];
}

export const accountData: AccountData[] = [
    { id: 1, name: "Muhammad Rifqi Hamza", email: "example@gmail.com", phone: "+62 812 345 678", address: "Jl. Raya No. 123, Jakarta", profilePicture: require('../assets/images/avatar.jpg'), backgroundImage: require('../assets/images/mitraLogo.png'), sections: [] },
]