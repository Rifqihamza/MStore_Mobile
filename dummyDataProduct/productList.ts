import { ImageSourcePropType } from 'react-native';

interface Product {
    id: number;
    uri: ImageSourcePropType;  // ✅ Dapat menampung require() atau URL gambar
    nameProduct: string;
    priceProduct: number;
    stockProduct: number;
}

export const productList: Product[] = [
    { id: 1, uri: require('../assets/images/react-logo.png'), nameProduct: 'Seragam Kemeja Putih', priceProduct: 200000, stockProduct: 25 },
    { id: 2, uri: require('../assets/images/react-logo.png'), nameProduct: 'Seragam Jasket Hitam', priceProduct: 200000, stockProduct: 25 },
    { id: 3, uri: require('../assets/images/react-logo.png'), nameProduct: 'Seragam Rompi Hitam', priceProduct: 200000, stockProduct: 25 },
    { id: 4, uri: require('../assets/images/react-logo.png'), nameProduct: 'Seragam Olahraga', priceProduct: 200000, stockProduct: 25 },
    { id: 5, uri: require('../assets/images/react-logo.png'), nameProduct: 'Celana Abu-abu', priceProduct: 180000, stockProduct: 25 },
    { id: 6, uri: require('../assets/images/react-logo.png'), nameProduct: 'Celana Pramuka', priceProduct: 180000, stockProduct: 25 },
    { id: 7, uri: require('../assets/images/react-logo.png'), nameProduct: 'Celana Hitam', priceProduct: 180000, stockProduct: 25 },
    { id: 8, uri: require('../assets/images/react-logo.png'), nameProduct: 'Wearpack Teknik Elektronika Industri', priceProduct: 275000, stockProduct: 15 },
    { id: 9, uri: require('../assets/images/react-logo.png'), nameProduct: 'Wearpack Teknik Instalasi Tenaga Listrik', priceProduct: 275000, stockProduct: 15 },
    { id: 10, uri: require('../assets/images/react-logo.png'), nameProduct: 'Wearpack Teknik Kendaraan Ringan Otomotif', priceProduct: 275000, stockProduct: 15 },
    { id: 11, uri: require('../assets/images/react-logo.png'), nameProduct: 'Wearpack Teknik Sepeda Motor', priceProduct: 275000, stockProduct: 15 },
    { id: 12, uri: require('../assets/images/react-logo.png'), nameProduct: 'Wearpack Perhotelan', priceProduct: 275000, stockProduct: 15 },
    { id: 13, uri: require('../assets/images/react-logo.png'), nameProduct: 'Wearpack Teknin Permesinan', priceProduct: 275000, stockProduct: 15 },
    { id: 14, uri: require('../assets/images/react-logo.png'), nameProduct: 'Wearpack Teknik Kimia Industri', priceProduct: 275000, stockProduct: 15 },
    { id: 15, uri: require('../assets/images/react-logo.png'), nameProduct: 'Nametag', priceProduct: 5000, stockProduct: 50 },
    { id: 16, uri: require('../assets/images/react-logo.png'), nameProduct: 'ID Card', priceProduct: 18000, stockProduct: 30 },
    { id: 17, uri: require('../assets/images/react-logo.png'), nameProduct: 'Pin Cita-cita', priceProduct: 5000, stockProduct: 100 },
    { id: 18, uri: require('../assets/images/react-logo.png'), nameProduct: 'Ikat Pinggang', priceProduct: 12000, stockProduct: 100 },
    { id: 19, uri: require('../assets/images/react-logo.png'), nameProduct: 'Dasi Merah', priceProduct: 20000, stockProduct: 100 },
    { id: 20, uri: require('../assets/images/react-logo.png'), nameProduct: 'Dasi Abu-abu', priceProduct: 10000, stockProduct: 100 },
]
