import { routerIds } from "../router/routerIds";

export const API = "http://localhost:1337/api";
export const AUTH_TOKEN = "authToken";
export const BEARER = "Bearer";



export const data = [
    {
        id: "02",
        path: routerIds.men,
        src: 'https://assets.vogue.com/photos/61e9c42f201fe8db0bc39899/master/pass/00_promo.jpg',
        category: 'Men',
    },
    {
        id: "03",
        path: routerIds.women,
        src: 'https://www.telegraph.co.uk/content/dam/fashion/2022/10/25/TELEMMGLPICT000313960470_trans_NvBQzQNjv4Bq7Cadr0IoOOfMS5GpRLWfGbVvz_IXZinEqtDTKahtjvc.jpeg',
        category: 'Women',
    },
    {
        id: "04",
        path: routerIds.children,
        src: 'https://bluejay.com.my/wp-content/uploads/2021/12/Kids-clothes-Hong-Kong-seed.jpg',
        category: 'Children',
    },
    {
        id: "01",
        path: routerIds.women,
        src: 'https://cdn.shopify.com/s/files/1/0248/3473/6191/files/womens_tops_2_1800x.jpg?v=1630508297',
        category: 'New Season',
    },
    {
        id: "05",
        path: routerIds.accessories,
        src: 'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/classic-accessories-1516305397.jpg?crop=0.6666666666666666xw:1xh;center,top&resize=1200:*',
        category: 'Accessories',
    },
]