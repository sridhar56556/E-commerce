const U = 'https://images.unsplash.com/photo-'
const img = (id, w = 800) =>
  `${U}${id}?auto=format&fit=crop&w=${w}&h=${Math.round(w * 1.25)}&q=80`

export const CATEGORIES = [
  { id: 'women', name: 'Women', image: 'https://res.cloudinary.com/dgaqfgszr/image/upload/v1781949555/WhatsApp_Image_2026-06-20_at_3.25.32_PM_-_Copy_ucgoyp.jpg' },
  { id: 'men', name: 'Men', image: img('1488161628813-04466f872be2', 700) },
  { id: 'shoes', name: 'Shoes', image: img('1549298916-b41d501d3772', 700) },
  { id: 'accessories', name: 'Accessories', image: img('1611085583191-a3b181a88401', 700) },
]

const SIZES_APPAREL = ['XS', 'S', 'M', 'L', 'XL']
const SIZES_SHOES = ['38', '39', '40', '41', '42', '43', '44']
const SIZE_ONE = ['One Size']

// eslint-disable-next-line
const A = '1469334031218-e382a71b716b'
const B = '1473966968600-fa801b869a1a'
const C = '1483985988355-763728e1935b'
const D = '1485968579580-b6d095142e6e'
const E = '1487412720507-e7ab37603c6f'
const F = '1488161628813-04466f872be2'
const G = '1490114538077-0a7f8cb49891'
const H = '1490481651871-ab68de25d43d'
const I = '1496747611176-843222e1e57c'
const J = '1509631179647-0177331693ae'
const K = '1521572163474-6864f9cf17ab'
const L = '1525507119028-ed4c629a60a3'
const M = '1539109136881-3be0616acf4b'
const N = '1539533018447-63fcce2678e3'
const O = '1542272604-787c3835535d'
const P = '1542291026-7eec264c27ff'
const Q = '1543163521-1bf539c55dd2'
const R = '1547949003-9792a18a2601'
const S = '1549298916-b41d501d3772'
const T = '1553062407-98eeb64c6a62'
const U1 = '1554568218-0f1715e72254'
const V = '1556905055-8f358a7a47b2'
const W = '1560769629-975ec94e6a86'
const X = '1564584217132-2271feaeb3c5'
const Y = '1576566588028-4147f3842f27'
const Z = '1584917865442-de89df76afd3'
const AA = '1593030761757-71fae45fa0e7'
const BB = '1606107557195-0e29a4b5b4aa'
const CC = '1611085583191-a3b181a88401'
const DD = '1515377199347-b20cb7e78a36'
const EE = '1539001571731-214b8c159bba'
const FF = '1554568218-0f1715e72254'
const GG = '1490114538077-0a7f8cb49891'
const HH = '1584917865442-de89df76afd3'
const II = '1593030761757-71fae45fa0e7'
const JJ = '1606107557195-0e29a4b5b4aa'
const KK = '1611085583191-a3b181a88401'

const IMG_LABELS = ['Front View', 'Back View', 'Side View', 'Close-Up', 'Lifestyle', 'Detail', 'Model Shot', 'Alternate Angle', 'Packaging', '360\xb0 View', 'Styled Look', 'Flat Lay']

const VIDEOS = [
  { url: 'https://www.w3schools.com/html/mov_bbb.mp4', type: 'Product Overview' },
  { url: 'https://www.w3schools.com/html/mov_bbb.mp4', type: 'Style Guide' },
]

const REVIEW_TEMPLATES = [
  { rating: 5, title: 'Absolutely love it!', comment: 'The quality is outstanding. Worth every penny.' },
  { rating: 4, title: 'Great purchase', comment: 'Really happy with this. The fit and finish are excellent.' },
  { rating: 5, title: 'Exceeded expectations', comment: 'Even better in person. The craftsmanship is impeccable.' },
  { rating: 3, title: 'Good but overpriced', comment: 'Nice product but I expected a bit more for the price.' },
  { rating: 4, title: 'Highly recommend', comment: 'Beautiful design and very fast shipping. Will buy again.' },
]

const REVIEW_USERS = ['Priya S.', 'Aarav M.', 'Neha K.', 'Rohan V.', 'Ananya P.']
const REVIEW_DATES = ['2026-02-15', '2026-03-02', '2026-01-20', '2026-03-14', '2026-02-28']
const REVIEW_IMG_IDS = [C, D, H, AA, G]

function shuffleArr(arr, offset) {
  return [...arr.slice(offset), ...arr.slice(0, offset)]
}

function buildColorImages(images, colors) {
  const result = {}
  const step = Math.floor(12 / colors.length)
  colors.forEach((c, i) => {
    result[c.name] = shuffleArr(images, i * step)
  })
  return result
}

function buildReviews(productId) {
  return REVIEW_TEMPLATES.map((t, i) => ({
    id: `${productId}-r${i + 1}`,
    user: REVIEW_USERS[i],
    rating: t.rating,
    date: REVIEW_DATES[i],
    title: t.title,
    comment: t.comment,
    verified: true,
    images: [`https://images.unsplash.com/photo-${REVIEW_IMG_IDS[i]}?w=200&h=250&fit=crop&q=60`],
  }))
}

export const PRODUCTS = [
  // --- WOMEN (16) ---
  {
    id: 'w-kurta-set',
    name: 'Chodidar Kurta Set',
    category: 'women',
    price: 4999,
    originalPrice: null,
    rating: 4.8,
    reviews: 12,
    isNew: true,
    featured: true,
    colors: [{ name: 'Golden', hex: '#d4a853' }],
    sizes: SIZES_APPAREL,
    images: new Array(12).fill('https://res.cloudinary.com/dgaqfgszr/image/upload/v1781949555/WhatsApp_Image_2026-06-20_at_3.25.43_PM_-_Copy_tthupx.jpg'),
    imageLabels: IMG_LABELS,
    videos: VIDEOS,
    warranty: '2 Year Brand Warranty',
    material: 'Premium Quality',
    brand: 'Lumi\xe8re',
    sku: 'W-KURTA-SET',
    inStock: true,
    stockCount: Math.floor(Math.random() * 50) + 5,
    colorImages: (() => {
      const url = 'https://res.cloudinary.com/dgaqfgszr/image/upload/v1781949555/WhatsApp_Image_2026-06-20_at_3.25.43_PM_-_Copy_tthupx.jpg'
      return { 'Golden': new Array(12).fill(url) }
    })(),
    reviews: buildReviews('w-kurta-set'),
    description: 'A beautifully crafted chodidar kurta set in rich golden tones, perfect for festive occasions.',
    details: ['Premium fabric', 'Regular fit', 'Dry clean only'],
  },
  {
    id: 'w-pink-saree',
    name: 'Light Pink Saree',
    category: 'women',
    price: 6999,
    originalPrice: null,
    rating: 4.9,
    reviews: 8,
    isNew: true,
    featured: true,
    colors: [{ name: 'Pink', hex: '#f4c2c2' }],
    sizes: SIZES_APPAREL,
    images: new Array(12).fill('https://res.cloudinary.com/dgaqfgszr/image/upload/v1781949555/WhatsApp_Image_2026-06-20_at_3.25.32_PM_-_Copy_ucgoyp.jpg'),
    imageLabels: IMG_LABELS,
    videos: VIDEOS,
    warranty: '2 Year Brand Warranty',
    material: 'Premium Quality',
    brand: 'Lumi\xe8re',
    sku: 'W-PINK-SAREE',
    inStock: true,
    stockCount: Math.floor(Math.random() * 50) + 5,
    colorImages: (() => {
      const url = 'https://res.cloudinary.com/dgaqfgszr/image/upload/v1781949555/WhatsApp_Image_2026-06-20_at_3.25.32_PM_-_Copy_ucgoyp.jpg'
      return { 'Pink': new Array(12).fill(url) }
    })(),
    reviews: buildReviews('w-pink-saree'),
    description: 'An elegant light pink saree with a delicate drape, ideal for weddings and celebrations.',
    details: ['Premium fabric', 'Ready to wear', 'Dry clean only'],
  },
  {
    id: 'w-casual',
    name: 'Jeans & Shirt',
    category: 'women',
    price: 3999,
    originalPrice: null,
    rating: 4.7,
    reviews: 15,
    isNew: true,
    featured: false,
    colors: [{ name: 'Blue', hex: '#4a6fa5' }],
    sizes: SIZES_APPAREL,
    images: new Array(12).fill('https://res.cloudinary.com/dgaqfgszr/image/upload/v1781949553/WhatsApp_Image_2026-06-20_at_3.25.35_PM_sh8yw8.jpg'),
    imageLabels: IMG_LABELS,
    videos: VIDEOS,
    warranty: '2 Year Brand Warranty',
    material: 'Premium Quality',
    brand: 'Lumi\xe8re',
    sku: 'W-CASUAL',
    inStock: true,
    stockCount: Math.floor(Math.random() * 50) + 5,
    colorImages: (() => {
      const url = 'https://res.cloudinary.com/dgaqfgszr/image/upload/v1781949553/WhatsApp_Image_2026-06-20_at_3.25.35_PM_sh8yw8.jpg'
      return { 'Blue': new Array(12).fill(url) }
    })(),
    reviews: buildReviews('w-casual'),
    description: 'A stylish jeans and shirt combo for a chic, casual everyday look.',
    details: ['Cotton blend', 'Regular fit', 'Machine wash'],
  },

  // --- WOMEN PERSONAL (13) ---
  {
    id: 'w-personal-1',
    name: 'Floral Anarkali Kurti',
    category: 'women',
    price: 3499,
    originalPrice: null,
    rating: 4.7,
    reviews: 9,
    isNew: true,
    featured: true,
    colors: [{ name: 'Multicolor', hex: '#c4906a' }],
    sizes: SIZES_APPAREL,
    images: new Array(12).fill('https://res.cloudinary.com/dgaqfgszr/image/upload/v1781950894/WhatsApp_Image_2026-06-20_at_3.50.21_PM_bq39bh.jpg'),
    imageLabels: IMG_LABELS,
    videos: VIDEOS,
    warranty: '2 Year Brand Warranty',
    material: 'Premium Quality',
    brand: 'Lumi\xe8re',
    sku: 'W-PERSONAL-1',
    inStock: true,
    stockCount: Math.floor(Math.random() * 50) + 5,
    colorImages: (() => {
      const url = 'https://res.cloudinary.com/dgaqfgszr/image/upload/v1781950894/WhatsApp_Image_2026-06-20_at_3.50.21_PM_bq39bh.jpg'
      return { 'Multicolor': new Array(12).fill(url) }
    })(),
    reviews: buildReviews('w-personal-1'),
    description: 'A vibrant floral anarkali kurti in soft georgette, perfect for festive gatherings.',
    details: ['Premium georgette', 'Anarkali cut', 'Machine wash'],
  },
  {
    id: 'w-personal-2',
    name: 'Embroidered Lehenga Set',
    category: 'women',
    price: 8499,
    originalPrice: null,
    rating: 4.8,
    reviews: 6,
    isNew: true,
    featured: true,
    colors: [{ name: 'Teal', hex: '#2a6b6e' }],
    sizes: SIZES_APPAREL,
    images: new Array(12).fill('https://res.cloudinary.com/dgaqfgszr/image/upload/v1781950894/WhatsApp_Image_2026-06-20_at_3.50.22_PM_1_nz6dtw.jpg'),
    imageLabels: IMG_LABELS,
    videos: VIDEOS,
    warranty: '2 Year Brand Warranty',
    material: 'Premium Quality',
    brand: 'Lumi\xe8re',
    sku: 'W-PERSONAL-2',
    inStock: true,
    stockCount: Math.floor(Math.random() * 50) + 5,
    colorImages: (() => {
      const url = 'https://res.cloudinary.com/dgaqfgszr/image/upload/v1781950894/WhatsApp_Image_2026-06-20_at_3.50.22_PM_1_nz6dtw.jpg'
      return { 'Teal': new Array(12).fill(url) }
    })(),
    reviews: buildReviews('w-personal-2'),
    description: 'An intricately embroidered lehenga set for special occasions.',
    details: ['Embroidered fabric', 'Full set', 'Dry clean only'],
  },
  {
    id: 'w-personal-3',
    name: 'Printed A-Line Dress',
    category: 'women',
    price: 2999,
    originalPrice: null,
    rating: 4.6,
    reviews: 11,
    isNew: true,
    featured: false,
    colors: [{ name: 'Maroon', hex: '#6e1a1a' }],
    sizes: SIZES_APPAREL,
    images: new Array(12).fill('https://res.cloudinary.com/dgaqfgszr/image/upload/v1781950893/WhatsApp_Image_2026-06-20_at_3.50.21_PM_1_zavnw5.jpg'),
    imageLabels: IMG_LABELS,
    videos: VIDEOS,
    warranty: '2 Year Brand Warranty',
    material: 'Premium Quality',
    brand: 'Lumi\xe8re',
    sku: 'W-PERSONAL-3',
    inStock: true,
    stockCount: Math.floor(Math.random() * 50) + 5,
    colorImages: (() => {
      const url = 'https://res.cloudinary.com/dgaqfgszr/image/upload/v1781950893/WhatsApp_Image_2026-06-20_at_3.50.21_PM_1_zavnw5.jpg'
      return { 'Maroon': new Array(12).fill(url) }
    })(),
    reviews: buildReviews('w-personal-3'),
    description: 'A chic printed A-line dress with a flattering silhouette for everyday elegance.',
    details: ['Cotton blend', 'A-line cut', 'Machine wash'],
  },
  {
    id: 'w-personal-4',
    name: 'Designer Palazzo Set',
    category: 'women',
    price: 4499,
    originalPrice: null,
    rating: 4.7,
    reviews: 7,
    isNew: true,
    featured: false,
    colors: [{ name: 'Mustard', hex: '#c9a84c' }],
    sizes: SIZES_APPAREL,
    images: new Array(12).fill('https://res.cloudinary.com/dgaqfgszr/image/upload/v1781950894/WhatsApp_Image_2026-06-20_at_3.50.22_PM_2_kwvnl4.jpg'),
    imageLabels: IMG_LABELS,
    videos: VIDEOS,
    warranty: '2 Year Brand Warranty',
    material: 'Premium Quality',
    brand: 'Lumi\xe8re',
    sku: 'W-PERSONAL-4',
    inStock: true,
    stockCount: Math.floor(Math.random() * 50) + 5,
    colorImages: (() => {
      const url = 'https://res.cloudinary.com/dgaqfgszr/image/upload/v1781950894/WhatsApp_Image_2026-06-20_at_3.50.22_PM_2_kwvnl4.jpg'
      return { 'Mustard': new Array(12).fill(url) }
    })(),
    reviews: buildReviews('w-personal-4'),
    description: 'A stylish palazzo set with contemporary prints for a modern look.',
    details: ['Premium viscose', 'Palazzo cut', 'Machine wash'],
  },
  {
    id: 'w-personal-5',
    name: 'Layered Gown',
    category: 'women',
    price: 9999,
    originalPrice: null,
    rating: 4.9,
    reviews: 4,
    isNew: true,
    featured: true,
    colors: [{ name: 'Burgundy', hex: '#5c1a1b' }],
    sizes: SIZES_APPAREL,
    images: new Array(12).fill('https://res.cloudinary.com/dgaqfgszr/image/upload/v1781950895/WhatsApp_Image_2026-06-20_at_3.50.22_PM_3_ylxwgb.jpg'),
    imageLabels: IMG_LABELS,
    videos: VIDEOS,
    warranty: '2 Year Brand Warranty',
    material: 'Premium Quality',
    brand: 'Lumi\xe8re',
    sku: 'W-PERSONAL-5',
    inStock: true,
    stockCount: Math.floor(Math.random() * 50) + 5,
    colorImages: (() => {
      const url = 'https://res.cloudinary.com/dgaqfgszr/image/upload/v1781950895/WhatsApp_Image_2026-06-20_at_3.50.22_PM_3_ylxwgb.jpg'
      return { 'Burgundy': new Array(12).fill(url) }
    })(),
    reviews: buildReviews('w-personal-5'),
    description: 'A stunning layered gown with intricate detailing, made for grand celebrations.',
    details: ['Premium fabric', 'Layered design', 'Dry clean only'],
  },
  {
    id: 'w-personal-6',
    name: 'Straight Kurta Set',
    category: 'women',
    price: 3299,
    originalPrice: null,
    rating: 4.6,
    reviews: 13,
    isNew: true,
    featured: false,
    colors: [{ name: 'Blue', hex: '#4a6fa5' }],
    sizes: SIZES_APPAREL,
    images: new Array(12).fill('https://res.cloudinary.com/dgaqfgszr/image/upload/v1781950893/WhatsApp_Image_2026-06-20_at_3.50.19_PM_rxncr9.jpg'),
    imageLabels: IMG_LABELS,
    videos: VIDEOS,
    warranty: '2 Year Brand Warranty',
    material: 'Premium Quality',
    brand: 'Lumi\xe8re',
    sku: 'W-PERSONAL-6',
    inStock: true,
    stockCount: Math.floor(Math.random() * 50) + 5,
    colorImages: (() => {
      const url = 'https://res.cloudinary.com/dgaqfgszr/image/upload/v1781950893/WhatsApp_Image_2026-06-20_at_3.50.19_PM_rxncr9.jpg'
      return { 'Blue': new Array(12).fill(url) }
    })(),
    reviews: buildReviews('w-personal-6'),
    description: 'A clean straight-cut kurta set with subtle detailing for everyday wear.',
    details: ['Cotton blend', 'Straight cut', 'Machine wash'],
  },
  {
    id: 'w-personal-7',
    name: 'Embellished Crop Top Set',
    category: 'women',
    price: 5499,
    originalPrice: null,
    rating: 4.7,
    reviews: 5,
    isNew: true,
    featured: true,
    colors: [{ name: 'Gold', hex: '#d4a017' }],
    sizes: SIZES_APPAREL,
    images: new Array(12).fill('https://res.cloudinary.com/dgaqfgszr/image/upload/v1781950893/WhatsApp_Image_2026-06-20_at_3.50.20_PM_o5el3a.jpg'),
    imageLabels: IMG_LABELS,
    videos: VIDEOS,
    warranty: '2 Year Brand Warranty',
    material: 'Premium Quality',
    brand: 'Lumi\xe8re',
    sku: 'W-PERSONAL-7',
    inStock: true,
    stockCount: Math.floor(Math.random() * 50) + 5,
    colorImages: (() => {
      const url = 'https://res.cloudinary.com/dgaqfgszr/image/upload/v1781950893/WhatsApp_Image_2026-06-20_at_3.50.20_PM_o5el3a.jpg'
      return { 'Gold': new Array(12).fill(url) }
    })(),
    reviews: buildReviews('w-personal-7'),
    description: 'An embellished crop top set that brings party-ready glamour.',
    details: ['Embellished fabric', 'Crop top style', 'Dry clean only'],
  },
  {
    id: 'w-personal-8',
    name: 'Indo-Western Dress',
    category: 'women',
    price: 6499,
    originalPrice: null,
    rating: 4.8,
    reviews: 8,
    isNew: true,
    featured: false,
    colors: [{ name: 'Green', hex: '#2d6b3f' }],
    sizes: SIZES_APPAREL,
    images: new Array(12).fill('https://res.cloudinary.com/dgaqfgszr/image/upload/v1781950893/WhatsApp_Image_2026-06-20_at_3.50.21_PM_2_t3wmod.jpg'),
    imageLabels: IMG_LABELS,
    videos: VIDEOS,
    warranty: '2 Year Brand Warranty',
    material: 'Premium Quality',
    brand: 'Lumi\xe8re',
    sku: 'W-PERSONAL-8',
    inStock: true,
    stockCount: Math.floor(Math.random() * 50) + 5,
    colorImages: (() => {
      const url = 'https://res.cloudinary.com/dgaqfgszr/image/upload/v1781950893/WhatsApp_Image_2026-06-20_at_3.50.21_PM_2_t3wmod.jpg'
      return { 'Green': new Array(12).fill(url) }
    })(),
    reviews: buildReviews('w-personal-8'),
    description: 'An Indo-western fusion dress that blends tradition with contemporary style.',
    details: ['Premium fabric', 'Fusion design', 'Dry clean only'],
  },
  {
    id: 'w-personal-9',
    name: 'Sequined Evening Top',
    category: 'women',
    price: 2799,
    originalPrice: null,
    rating: 4.5,
    reviews: 10,
    isNew: true,
    featured: false,
    colors: [{ name: 'Silver', hex: '#c0c0c0' }],
    sizes: SIZES_APPAREL,
    images: new Array(12).fill('https://res.cloudinary.com/dgaqfgszr/image/upload/v1781950896/WhatsApp_Image_2026-06-20_at_3.50.23_PM_1_dijtzu.jpg'),
    imageLabels: IMG_LABELS,
    videos: VIDEOS,
    warranty: '2 Year Brand Warranty',
    material: 'Premium Quality',
    brand: 'Lumi\xe8re',
    sku: 'W-PERSONAL-9',
    inStock: true,
    stockCount: Math.floor(Math.random() * 50) + 5,
    colorImages: (() => {
      const url = 'https://res.cloudinary.com/dgaqfgszr/image/upload/v1781950896/WhatsApp_Image_2026-06-20_at_3.50.23_PM_1_dijtzu.jpg'
      return { 'Silver': new Array(12).fill(url) }
    })(),
    reviews: buildReviews('w-personal-9'),
    description: 'A sequined evening top that sparkles at every party.',
    details: ['Sequined fabric', 'Regular fit', 'Hand wash'],
  },
  {
    id: 'w-personal-10',
    name: 'Chikankari Kurti',
    category: 'women',
    price: 2699,
    originalPrice: null,
    rating: 4.6,
    reviews: 14,
    isNew: true,
    featured: false,
    colors: [{ name: 'White', hex: '#f4f1ea' }],
    sizes: SIZES_APPAREL,
    images: new Array(12).fill('https://res.cloudinary.com/dgaqfgszr/image/upload/v1781950896/WhatsApp_Image_2026-06-20_at_3.50.22_PM_k2yehe.jpg'),
    imageLabels: IMG_LABELS,
    videos: VIDEOS,
    warranty: '2 Year Brand Warranty',
    material: 'Premium Quality',
    brand: 'Lumi\xe8re',
    sku: 'W-PERSONAL-10',
    inStock: true,
    stockCount: Math.floor(Math.random() * 50) + 5,
    colorImages: (() => {
      const url = 'https://res.cloudinary.com/dgaqfgszr/image/upload/v1781950896/WhatsApp_Image_2026-06-20_at_3.50.22_PM_k2yehe.jpg'
      return { 'White': new Array(12).fill(url) }
    })(),
    reviews: buildReviews('w-personal-10'),
    description: 'A hand-embroidered chikankari kurti with timeless elegance.',
    details: ['Cotton chikankari', 'Regular fit', 'Machine wash'],
  },
  {
    id: 'w-personal-11',
    name: 'Velvet Lehenga',
    category: 'women',
    price: 12499,
    originalPrice: null,
    rating: 4.9,
    reviews: 3,
    isNew: true,
    featured: true,
    colors: [{ name: 'Black', hex: '#1c1a17' }],
    sizes: SIZES_APPAREL,
    images: new Array(12).fill('https://res.cloudinary.com/dgaqfgszr/image/upload/v1781950896/WhatsApp_Image_2026-06-20_at_3.50.24_PM_rijbex.jpg'),
    imageLabels: IMG_LABELS,
    videos: VIDEOS,
    warranty: '2 Year Brand Warranty',
    material: 'Premium Quality',
    brand: 'Lumi\xe8re',
    sku: 'W-PERSONAL-11',
    inStock: true,
    stockCount: Math.floor(Math.random() * 50) + 5,
    colorImages: (() => {
      const url = 'https://res.cloudinary.com/dgaqfgszr/image/upload/v1781950896/WhatsApp_Image_2026-06-20_at_3.50.24_PM_rijbex.jpg'
      return { 'Black': new Array(12).fill(url) }
    })(),
    reviews: buildReviews('w-personal-11'),
    description: 'A rich velvet lehenga with regal appeal for grand occasions.',
    details: ['Velvet fabric', 'Full lehenga set', 'Dry clean only'],
  },
  {
    id: 'w-personal-12',
    name: 'Patiala Suit Set',
    category: 'women',
    price: 3899,
    originalPrice: null,
    rating: 4.7,
    reviews: 11,
    isNew: true,
    featured: false,
    colors: [{ name: 'Purple', hex: '#6b3a7a' }],
    sizes: SIZES_APPAREL,
    images: new Array(12).fill('https://res.cloudinary.com/dgaqfgszr/image/upload/v1781950896/WhatsApp_Image_2026-06-20_at_3.50.23_PM_usxexv.jpg'),
    imageLabels: IMG_LABELS,
    videos: VIDEOS,
    warranty: '2 Year Brand Warranty',
    material: 'Premium Quality',
    brand: 'Lumi\xe8re',
    sku: 'W-PERSONAL-12',
    inStock: true,
    stockCount: Math.floor(Math.random() * 50) + 5,
    colorImages: (() => {
      const url = 'https://res.cloudinary.com/dgaqfgszr/image/upload/v1781950896/WhatsApp_Image_2026-06-20_at_3.50.23_PM_usxexv.jpg'
      return { 'Purple': new Array(12).fill(url) }
    })(),
    reviews: buildReviews('w-personal-12'),
    description: 'A vibrant Patiala suit set with a comfortable, stylish drape.',
    details: ['Cotton blend', 'Patiala style', 'Machine wash'],
  },
  {
    id: 'w-personal-13',
    name: 'Designer Saree',
    category: 'women',
    price: 7999,
    originalPrice: null,
    rating: 4.8,
    reviews: 7,
    isNew: true,
    featured: true,
    colors: [{ name: 'Orange', hex: '#d46a28' }],
    sizes: SIZES_APPAREL,
    images: new Array(12).fill('https://res.cloudinary.com/dgaqfgszr/image/upload/v1781950896/WhatsApp_Image_2026-06-20_at_3.50.23_PM_2_fsxwvn.jpg'),
    imageLabels: IMG_LABELS,
    videos: VIDEOS,
    warranty: '2 Year Brand Warranty',
    material: 'Premium Quality',
    brand: 'Lumi\xe8re',
    sku: 'W-PERSONAL-13',
    inStock: true,
    stockCount: Math.floor(Math.random() * 50) + 5,
    colorImages: (() => {
      const url = 'https://res.cloudinary.com/dgaqfgszr/image/upload/v1781950896/WhatsApp_Image_2026-06-20_at_3.50.23_PM_2_fsxwvn.jpg'
      return { 'Orange': new Array(12).fill(url) }
    })(),
    reviews: buildReviews('w-personal-13'),
    description: 'A designer saree with a contemporary print for a standout look.',
    details: ['Premium fabric', 'Ready to wear', 'Dry clean only'],
  },

  // --- MEN (10) ---
  {
    id: 'm-overcoat',
    name: 'Hudson Tailored Overcoat',
    category: 'men',
    price: 23840,
    originalPrice: 28800,
    rating: 4.8,
    reviews: 73,
    isNew: false,
    featured: true,
    colors: [
      { name: 'Stone', hex: '#b8ad99' },
      { name: 'Navy', hex: '#2a3140' },
    ],
    sizes: SIZES_APPAREL,
    images: [img(F), img(I), img(K), img(A), img(U1), img(J), img(Q), img(Y), img(D), img(E), img(C), img(H)],
    imageLabels: IMG_LABELS,
    videos: VIDEOS,
    warranty: '2 Year Brand Warranty',
    material: 'Premium Quality',
    brand: 'Lumi\xe8re',
    sku: 'M-OVERCOAT',
    inStock: true,
    stockCount: Math.floor(Math.random() * 50) + 5,
    colorImages: (() => {
      const imgs = [img(F), img(I), img(K), img(A), img(U1), img(J), img(Q), img(Y), img(D), img(E), img(C), img(H)]
      return { 'Stone': imgs, 'Navy': [...imgs.slice(6), ...imgs.slice(0, 6)] }
    })(),
    reviews: buildReviews('m-overcoat'),
    description:
      'A sharp single-breasted overcoat cut from brushed wool, structured at the shoulder and clean through the body.',
    details: ['Brushed wool blend', 'Notch lapel', 'Interior pockets', 'Dry clean only'],
  },
  {
    id: 'm-denim-jacket',
    name: 'Rourke Denim Jacket',
    category: 'men',
    price: 10240,
    originalPrice: null,
    rating: 4.6,
    reviews: 97,
    isNew: true,
    featured: true,
    colors: [
      { name: 'Indigo', hex: '#34465e' },
      { name: 'Washed', hex: '#8aa0b4' },
    ],
    sizes: SIZES_APPAREL,
    images: [img(Y), img(Q), img(F), img(I), img(K), img(A), img(U1), img(J), img(X), img(S), img(W), img(P)],
    imageLabels: IMG_LABELS,
    videos: VIDEOS,
    warranty: '2 Year Brand Warranty',
    material: 'Premium Quality',
    brand: 'Lumi\xe8re',
    sku: 'M-DENIM-JACKET',
    inStock: true,
    stockCount: Math.floor(Math.random() * 50) + 5,
    colorImages: (() => {
      const imgs = [img(Y), img(Q), img(F), img(I), img(K), img(A), img(U1), img(J), img(X), img(S), img(W), img(P)]
      return { 'Indigo': imgs, 'Washed': [...imgs.slice(6), ...imgs.slice(0, 6)] }
    })(),
    reviews: buildReviews('m-denim-jacket'),
    description:
      'A heavyweight denim trucker with a lived-in wash, antique buttons and just the right amount of structure.',
    details: ['14oz cotton denim', 'Antique brass buttons', 'Machine wash cold'],
  },
  {
    id: 'm-tee',
    name: 'Basis Heavyweight Tee',
    category: 'men',
    price: 3040,
    originalPrice: 4160,
    rating: 4.5,
    reviews: 309,
    isNew: false,
    featured: false,
    colors: [
      { name: 'White', hex: '#f3f0e9' },
      { name: 'Black', hex: '#1c1a17' },
      { name: 'Clay', hex: '#b27a5e' },
    ],
    sizes: SIZES_APPAREL,
    images: [img(K), img(A), img(U1), img(Q), img(I), img(F), img(Y), img(J), img(D), img(E), img(C), img(H)],
    imageLabels: IMG_LABELS,
    videos: VIDEOS,
    warranty: '2 Year Brand Warranty',
    material: 'Premium Quality',
    brand: 'Lumi\xe8re',
    sku: 'M-TEE',
    inStock: true,
    stockCount: Math.floor(Math.random() * 50) + 5,
    colorImages: (() => {
      const imgs = [img(K), img(A), img(U1), img(Q), img(I), img(F), img(Y), img(J), img(D), img(E), img(C), img(H)]
      return { 'White': imgs, 'Black': [...imgs.slice(4), ...imgs.slice(0, 4)], 'Clay': [...imgs.slice(8), ...imgs.slice(0, 8)] }
    })(),
    reviews: buildReviews('m-tee'),
    description:
      'A boxy, heavyweight tee in dense organic jersey that holds its shape wash after wash.',
    details: ['240gsm organic cotton', 'Boxy fit', 'Machine wash'],
  },
  {
    id: 'm-bomber',
    name: 'Reed Bomber Jacket',
    category: 'men',
    price: 15680,
    originalPrice: 19200,
    rating: 4.7,
    reviews: 81,
    isNew: true,
    featured: true,
    colors: [
      { name: 'Sage', hex: '#9aa78c' },
      { name: 'Black', hex: '#1c1a17' },
    ],
    sizes: SIZES_APPAREL,
    images: [img(K), img(I), img(Q), img(F), img(A), img(U1), img(Y), img(J), img(P), img(X), img(S), img(W)],
    imageLabels: IMG_LABELS,
    videos: VIDEOS,
    warranty: '2 Year Brand Warranty',
    material: 'Premium Quality',
    brand: 'Lumi\xe8re',
    sku: 'M-BOMBER',
    inStock: true,
    stockCount: Math.floor(Math.random() * 50) + 5,
    colorImages: (() => {
      const imgs = [img(K), img(I), img(Q), img(F), img(A), img(U1), img(Y), img(J), img(P), img(X), img(S), img(W)]
      return { 'Sage': imgs, 'Black': [...imgs.slice(6), ...imgs.slice(0, 6)] }
    })(),
    reviews: buildReviews('m-bomber'),
    description:
      'A military-inspired bomber in premium cotton-nylon with a matte finish, rib-knit collar and a contrast lining.',
    details: ['Cotton-nylon shell', 'Rib-knit collar & cuffs', 'Two-way zip', 'Spot clean'],
  },
  {
    id: 'm-suit-jacket',
    name: 'Mercer Unstructured Blazer',
    category: 'men',
    price: 20800,
    originalPrice: 25600,
    rating: 4.9,
    reviews: 47,
    isNew: false,
    featured: false,
    colors: [
      { name: 'Navy', hex: '#2a3140' },
      { name: 'Grey', hex: '#8a8a88' },
    ],
    sizes: SIZES_APPAREL,
    images: [img(F), img(I), img(A), img(K), img(U1), img(Q), img(Y), img(J), img(D), img(E), img(C), img(H)],
    imageLabels: IMG_LABELS,
    videos: VIDEOS,
    warranty: '2 Year Brand Warranty',
    material: 'Premium Quality',
    brand: 'Lumi\xe8re',
    sku: 'M-SUIT-JACKET',
    inStock: true,
    stockCount: Math.floor(Math.random() * 50) + 5,
    colorImages: (() => {
      const imgs = [img(F), img(I), img(A), img(K), img(U1), img(Q), img(Y), img(J), img(D), img(E), img(C), img(H)]
      return { 'Navy': imgs, 'Grey': [...imgs.slice(6), ...imgs.slice(0, 6)] }
    })(),
    reviews: buildReviews('m-suit-jacket'),
    description:
      'An unstructured Italian-milled blazer with a soft shoulder and patch pockets \u2014 tailoring that feels like a sweater.',
    details: ['Italian wool-mohair blend', 'Patch pockets', 'Unstructured construction', 'Dry clean'],
  },

  // --- MEN EXTRA ---
  {
    id: 'm-suit',
    name: 'Tailored Black Suit',
    category: 'men',
    price: 31200,
    originalPrice: 38400,
    rating: 4.9,
    reviews: 56,
    isNew: true,
    featured: true,
    colors: [
      { name: 'Black', hex: '#1c1a17' },
      { name: 'Charcoal', hex: '#3a3833' },
    ],
    sizes: SIZES_APPAREL,
    images: new Array(12).fill('https://res.cloudinary.com/dgaqfgszr/image/upload/v1779265230/linkdin_pic_cfbnyp.jpg'),
    imageLabels: ['Front View', 'Side View', 'Back View', 'Close-Up', 'Lifestyle', 'Detail', 'Model Shot', 'Alternate Angle', 'Packaging', '360° View', 'Styled Look', 'Flat Lay'],
    videos: VIDEOS,
    warranty: '2 Year Brand Warranty',
    material: 'Premium Wool Blend',
    brand: 'Lumière',
    sku: 'M-TAILORED-SUIT',
    inStock: true,
    stockCount: 15,
    colorImages: (() => {
      const imgs = new Array(12).fill('https://res.cloudinary.com/dgaqfgszr/image/upload/v1779265230/linkdin_pic_cfbnyp.jpg')
      return { 'Black': imgs, 'Charcoal': [...imgs.slice(6), ...imgs.slice(0, 6)] }
    })(),
    reviews: buildReviews('m-suit'),
    description:
      'A sharply tailored two-piece suit in luxurious wool blend with a modern slim fit. The single-breasted jacket features a notched lapel, flap pockets, and a four-button closure. Trousers are flat-front with a tapered leg and finished hem.',
    details: ['Premium wool blend', 'Notched lapel', 'Two-button closure', 'Flat-front trousers', 'Dry clean only'],
  },

  // --- MEN PERSONAL COLLECTION ---
  {
    id: 'm-personal-1',
    name: 'Classic Navy Blazer',
    category: 'men',
    price: 24800,
    originalPrice: 32000,
    rating: 4.8,
    reviews: 42,
    isNew: true,
    featured: true,
    colors: [
      { name: 'Navy', hex: '#2a3140' },
      { name: 'Black', hex: '#1c1a17' },
    ],
    sizes: SIZES_APPAREL,
    images: new Array(12).fill('https://res.cloudinary.com/dgaqfgszr/image/upload/v1761138495/IMG-20250719-WA0022_qbfwwb.jpg'),
    imageLabels: IMG_LABELS,
    videos: VIDEOS,
    warranty: '2 Year Brand Warranty',
    material: 'Premium Wool Blend',
    brand: 'Lumière',
    sku: 'M-PERSONAL-1',
    inStock: true,
    stockCount: 10,
    colorImages: (() => {
      const imgs = new Array(12).fill('https://res.cloudinary.com/dgaqfgszr/image/upload/v1761138495/IMG-20250719-WA0022_qbfwwb.jpg')
      return { 'Navy': imgs, 'Black': [...imgs.slice(6), ...imgs.slice(0, 6)] }
    })(),
    reviews: buildReviews('m-personal-1'),
    description:
      'A sharply tailored classic navy blazer crafted from premium wool blend. Features notched lapels, a two-button closure, and flap pockets — perfect for both formal occasions and smart-casual styling.',
    details: ['Premium wool blend', 'Notched lapel', 'Two-button closure', 'Flap pockets', 'Dry clean only'],
  },
  {
    id: 'm-personal-2',
    name: 'Premium Casual Shirt',
    category: 'men',
    price: 7200,
    originalPrice: 9600,
    rating: 4.6,
    reviews: 38,
    isNew: true,
    featured: true,
    colors: [
      { name: 'White', hex: '#f4f1ea' },
      { name: 'Blue', hex: '#7d9cc0' },
    ],
    sizes: SIZES_APPAREL,
    images: new Array(12).fill('https://res.cloudinary.com/dgaqfgszr/image/upload/v1761138457/IMG-20250719-WA0026_gzpc3k.jpg'),
    imageLabels: IMG_LABELS,
    videos: VIDEOS,
    warranty: '2 Year Brand Warranty',
    material: 'Premium Cotton',
    brand: 'Lumière',
    sku: 'M-PERSONAL-2',
    inStock: true,
    stockCount: 18,
    colorImages: (() => {
      const imgs = new Array(12).fill('https://res.cloudinary.com/dgaqfgszr/image/upload/v1761138457/IMG-20250719-WA0026_gzpc3k.jpg')
      return { 'White': imgs, 'Blue': [...imgs.slice(6), ...imgs.slice(0, 6)] }
    })(),
    reviews: buildReviews('m-personal-2'),
    description:
      'A crisp premium cotton shirt with a modern tailored fit. Features a classic spread collar, button cuffs, and a comfortable yet sharp silhouette that transitions effortlessly from office to evening.',
    details: ['Premium cotton', 'Spread collar', 'Button cuffs', 'Tailored fit', 'Machine wash'],
  },
  {
    id: 'm-personal-3',
    name: 'Remo Urban Jacket',
    category: 'men',
    price: 18400,
    originalPrice: 22400,
    rating: 4.7,
    reviews: 29,
    isNew: true,
    featured: true,
    colors: [
      { name: 'Black', hex: '#1c1a17' },
      { name: 'Olive', hex: '#6f7355' },
    ],
    sizes: SIZES_APPAREL,
    images: new Array(12).fill('https://res.cloudinary.com/dgaqfgszr/image/upload/v1761137686/remo5_j8nzze.jpg'),
    imageLabels: IMG_LABELS,
    videos: VIDEOS,
    warranty: '2 Year Brand Warranty',
    material: 'Premium Cotton-Nylon',
    brand: 'Lumière',
    sku: 'M-PERSONAL-3',
    inStock: true,
    stockCount: 12,
    colorImages: (() => {
      const imgs = new Array(12).fill('https://res.cloudinary.com/dgaqfgszr/image/upload/v1761137686/remo5_j8nzze.jpg')
      return { 'Black': imgs, 'Olive': [...imgs.slice(6), ...imgs.slice(0, 6)] }
    })(),
    reviews: buildReviews('m-personal-3'),
    description:
      'A versatile urban jacket in premium cotton-nylon blend with a modern slim cut. Features a stand collar, zip-front closure, and multiple pockets — built for city life and weekend escapes.',
    details: ['Cotton-nylon blend', 'Stand collar', 'Zip-front closure', 'Multiple pockets', 'Spot clean'],
  },
  {
    id: 'm-personal-4',
    name: 'Boss Executive Blazer',
    category: 'men',
    price: 28800,
    originalPrice: 36800,
    rating: 4.9,
    reviews: 35,
    isNew: true,
    featured: true,
    colors: [
      { name: 'Charcoal', hex: '#3a3833' },
      { name: 'Navy', hex: '#2a3140' },
    ],
    sizes: SIZES_APPAREL,
    images: new Array(12).fill('https://res.cloudinary.com/dgaqfgszr/image/upload/v1761137541/boss_mrdqnt.jpg'),
    imageLabels: IMG_LABELS,
    videos: VIDEOS,
    warranty: '2 Year Brand Warranty',
    material: 'Premium Wool Blend',
    brand: 'Lumière',
    sku: 'M-PERSONAL-4',
    inStock: true,
    stockCount: 8,
    colorImages: (() => {
      const imgs = new Array(12).fill('https://res.cloudinary.com/dgaqfgszr/image/upload/v1761137541/boss_mrdqnt.jpg')
      return { 'Charcoal': imgs, 'Navy': [...imgs.slice(6), ...imgs.slice(0, 6)] }
    })(),
    reviews: buildReviews('m-personal-4'),
    description:
      'An executive-grade blazer in premium wool blend with a structured fit. Features peak lapels, a two-button closure, and a sleek silhouette that commands respect in any boardroom.',
    details: ['Premium wool blend', 'Peak lapel', 'Two-button closure', 'Structured fit', 'Dry clean only'],
  },
  {
    id: 'm-personal-5',
    name: 'Signature Leather Jacket',
    category: 'men',
    price: 35200,
    originalPrice: 44800,
    rating: 4.8,
    reviews: 47,
    isNew: true,
    featured: true,
    colors: [
      { name: 'Black', hex: '#1c1a17' },
      { name: 'Brown', hex: '#6b3a2a' },
    ],
    sizes: SIZES_APPAREL,
    images: new Array(12).fill('https://res.cloudinary.com/dgaqfgszr/image/upload/v1761127777/h_sbeg1k.jpg'),
    imageLabels: IMG_LABELS,
    videos: VIDEOS,
    warranty: '2 Year Brand Warranty',
    material: 'Premium Leather',
    brand: 'Lumière',
    sku: 'M-PERSONAL-5',
    inStock: true,
    stockCount: 6,
    colorImages: (() => {
      const imgs = new Array(12).fill('https://res.cloudinary.com/dgaqfgszr/image/upload/v1761127777/h_sbeg1k.jpg')
      return { 'Black': imgs, 'Brown': [...imgs.slice(6), ...imgs.slice(0, 6)] }
    })(),
    reviews: buildReviews('m-personal-5'),
    description:
      'A premium leather jacket with a classic biker silhouette. Crafted from supple full-grain leather with a matte finish, featuring a YKK zip-front closure, snap lapels, and quilted shoulder panels.',
    details: ['Full-grain leather', 'YKK zip closure', 'Snap lapels', 'Quilted shoulders', 'Spot clean'],
  },
  {
    id: 'm-personal-6',
    name: 'Modern Fit Sport Coat',
    category: 'men',
    price: 21600,
    originalPrice: 28000,
    rating: 4.7,
    reviews: 33,
    isNew: true,
    featured: true,
    colors: [
      { name: 'Charcoal', hex: '#3a3833' },
      { name: 'Navy', hex: '#2a3140' },
    ],
    sizes: SIZES_APPAREL,
    images: new Array(12).fill('https://res.cloudinary.com/dgaqfgszr/image/upload/v1761138156/pic3_t4eyqi.jpg'),
    imageLabels: IMG_LABELS,
    videos: VIDEOS,
    warranty: '2 Year Brand Warranty',
    material: 'Premium Wool Blend',
    brand: 'Lumière',
    sku: 'M-PERSONAL-6',
    inStock: true,
    stockCount: 9,
    colorImages: (() => {
      const imgs = new Array(12).fill('https://res.cloudinary.com/dgaqfgszr/image/upload/v1761138156/pic3_t4eyqi.jpg')
      return { 'Charcoal': imgs, 'Navy': [...imgs.slice(6), ...imgs.slice(0, 6)] }
    })(),
    reviews: buildReviews('m-personal-6'),
    description:
      'A modern-fit sport coat crafted from premium wool blend with a soft construction. Features notched lapels, patch pockets, and a natural shoulder — perfect for both dressed-up and dressed-down occasions.',
    details: ['Premium wool blend', 'Notched lapel', 'Patch pockets', 'Soft construction', 'Dry clean only'],
  },
  {
    id: 'm-personal-7',
    name: 'Premium Formal Blazer',
    category: 'men',
    price: 26400,
    originalPrice: 33600,
    rating: 4.8,
    reviews: 28,
    isNew: true,
    featured: true,
    colors: [
      { name: 'Black', hex: '#1c1a17' },
      { name: 'Charcoal', hex: '#3a3833' },
    ],
    sizes: SIZES_APPAREL,
    images: new Array(12).fill('https://res.cloudinary.com/dgaqfgszr/image/upload/v1781948810/IMG-20250719-WA0004_jc3vtk.jpg'),
    imageLabels: IMG_LABELS,
    videos: VIDEOS,
    warranty: '2 Year Brand Warranty',
    material: 'Premium Wool Blend',
    brand: 'Lumière',
    sku: 'M-PERSONAL-7',
    inStock: true,
    stockCount: 7,
    colorImages: (() => {
      const imgs = new Array(12).fill('https://res.cloudinary.com/dgaqfgszr/image/upload/v1781948810/IMG-20250719-WA0004_jc3vtk.jpg')
      return { 'Black': imgs, 'Charcoal': [...imgs.slice(6), ...imgs.slice(0, 6)] }
    })(),
    reviews: buildReviews('m-personal-7'),
    description:
      'A premium formal blazer in luxurious wool blend with a sharp tailored fit. Features peak lapels, a two-button closure, and interior pockets — the perfect choice for formal occasions and business meetings.',
    details: ['Premium wool blend', 'Peak lapel', 'Two-button closure', 'Interior pockets', 'Dry clean only'],
  },
  {
    id: 'm-personal-8',
    name: 'Classic Evening Blazer',
    category: 'men',
    price: 24000,
    originalPrice: 30400,
    rating: 4.7,
    reviews: 31,
    isNew: true,
    featured: true,
    colors: [
      { name: 'Charcoal', hex: '#3a3833' },
      { name: 'Navy', hex: '#2a3140' },
    ],
    sizes: SIZES_APPAREL,
    images: new Array(12).fill('https://res.cloudinary.com/dgaqfgszr/image/upload/v1781948811/IMG-20250719-WA0027_aahy1m.jpg'),
    imageLabels: IMG_LABELS,
    videos: VIDEOS,
    warranty: '2 Year Brand Warranty',
    material: 'Premium Wool Blend',
    brand: 'Lumière',
    sku: 'M-PERSONAL-8',
    inStock: true,
    stockCount: 11,
    colorImages: (() => {
      const imgs = new Array(12).fill('https://res.cloudinary.com/dgaqfgszr/image/upload/v1781948811/IMG-20250719-WA0027_aahy1m.jpg')
      return { 'Charcoal': imgs, 'Navy': [...imgs.slice(6), ...imgs.slice(0, 6)] }
    })(),
    reviews: buildReviews('m-personal-8'),
    description:
      'A classic evening blazer crafted from premium wool blend with a sophisticated silhouette. Features notched lapels, flap pockets, and a comfortable modern fit — ideal for dinners, events, and formal gatherings.',
    details: ['Premium wool blend', 'Notched lapel', 'Flap pockets', 'Modern fit', 'Dry clean only'],
  },
  {
    id: 'm-personal-9',
    name: 'Premium Navy Blazer',
    category: 'men',
    price: 27200,
    originalPrice: 34400,
    rating: 4.7,
    reviews: 26,
    isNew: true,
    featured: true,
    colors: [
      { name: 'Navy', hex: '#2a3140' },
      { name: 'Black', hex: '#1c1a17' },
    ],
    sizes: SIZES_APPAREL,
    images: new Array(12).fill('https://res.cloudinary.com/dgaqfgszr/image/upload/v1781949555/WhatsApp_Image_2026-06-20_at_3.25.33_PM_-_Copy_b2211j.jpg'),
    imageLabels: IMG_LABELS,
    videos: VIDEOS,
    warranty: '2 Year Brand Warranty',
    material: 'Premium Wool Blend',
    brand: 'Lumière',
    sku: 'M-PERSONAL-9',
    inStock: true,
    stockCount: 8,
    colorImages: (() => {
      const imgs = new Array(12).fill('https://res.cloudinary.com/dgaqfgszr/image/upload/v1781949555/WhatsApp_Image_2026-06-20_at_3.25.33_PM_-_Copy_b2211j.jpg')
      return { 'Navy': imgs, 'Black': [...imgs.slice(6), ...imgs.slice(0, 6)] }
    })(),
    reviews: buildReviews('m-personal-9'),
    description:
      'A premium navy blazer in luxurious wool blend with a modern tailored fit. Features notched lapels, flap pockets, and a sleek silhouette for any formal occasion.',
    details: ['Premium wool blend', 'Notched lapel', 'Flap pockets', 'Tailored fit', 'Dry clean only'],
  },
  {
    id: 'm-personal-10',
    name: 'Charcoal Executive Blazer',
    category: 'men',
    price: 28000,
    originalPrice: 36000,
    rating: 4.8,
    reviews: 22,
    isNew: true,
    featured: true,
    colors: [
      { name: 'Charcoal', hex: '#3a3833' },
      { name: 'Black', hex: '#1c1a17' },
    ],
    sizes: SIZES_APPAREL,
    images: new Array(12).fill('https://res.cloudinary.com/dgaqfgszr/image/upload/v1781949557/WhatsApp_Image_2026-06-20_at_3.26.09_PM_-_Copy_-_Copy_hk9df3.jpg'),
    imageLabels: IMG_LABELS,
    videos: VIDEOS,
    warranty: '2 Year Brand Warranty',
    material: 'Premium Wool Blend',
    brand: 'Lumière',
    sku: 'M-PERSONAL-10',
    inStock: true,
    stockCount: 6,
    colorImages: (() => {
      const imgs = new Array(12).fill('https://res.cloudinary.com/dgaqfgszr/image/upload/v1781949557/WhatsApp_Image_2026-06-20_at_3.26.09_PM_-_Copy_-_Copy_hk9df3.jpg')
      return { 'Charcoal': imgs, 'Black': [...imgs.slice(6), ...imgs.slice(0, 6)] }
    })(),
    reviews: buildReviews('m-personal-10'),
    description:
      'A sophisticated charcoal blazer in premium wool blend with a sharp executive fit. Peak lapels and a structured shoulder create a commanding boardroom presence.',
    details: ['Premium wool blend', 'Peak lapel', 'Structured shoulder', 'Executive fit', 'Dry clean only'],
  },
  {
    id: 'm-personal-11',
    name: 'Stylish Casual Blazer',
    category: 'men',
    price: 22400,
    originalPrice: 28800,
    rating: 4.6,
    reviews: 19,
    isNew: true,
    featured: true,
    colors: [
      { name: 'Black', hex: '#1c1a17' },
      { name: 'Charcoal', hex: '#3a3833' },
    ],
    sizes: SIZES_APPAREL,
    images: new Array(12).fill('https://res.cloudinary.com/dgaqfgszr/image/upload/v1781949557/WhatsApp_Image_2026-06-20_at_3.25.50_PM_-_Copy_-_Copy_opeqi4.jpg'),
    imageLabels: IMG_LABELS,
    videos: VIDEOS,
    warranty: '2 Year Brand Warranty',
    material: 'Premium Wool Blend',
    brand: 'Lumière',
    sku: 'M-PERSONAL-11',
    inStock: true,
    stockCount: 10,
    colorImages: (() => {
      const imgs = new Array(12).fill('https://res.cloudinary.com/dgaqfgszr/image/upload/v1781949557/WhatsApp_Image_2026-06-20_at_3.25.50_PM_-_Copy_-_Copy_opeqi4.jpg')
      return { 'Black': imgs, 'Charcoal': [...imgs.slice(6), ...imgs.slice(0, 6)] }
    })(),
    reviews: buildReviews('m-personal-11'),
    description:
      'A stylish casual blazer perfect for smart-casual occasions. Crafted from premium wool blend with a comfortable soft construction and notched lapels.',
    details: ['Premium wool blend', 'Notched lapel', 'Soft construction', 'Smart-casual fit', 'Dry clean only'],
  },
  {
    id: 'm-personal-12',
    name: 'Elegant Formal Blazer',
    category: 'men',
    price: 29600,
    originalPrice: 37600,
    rating: 4.9,
    reviews: 30,
    isNew: true,
    featured: true,
    colors: [
      { name: 'Charcoal', hex: '#3a3833' },
      { name: 'Navy', hex: '#2a3140' },
    ],
    sizes: SIZES_APPAREL,
    images: new Array(12).fill('https://res.cloudinary.com/dgaqfgszr/image/upload/v1781949557/WhatsApp_Image_2026-06-20_at_3.25.48_PM_-_Copy_-_Copy_bhrbk6.jpg'),
    imageLabels: IMG_LABELS,
    videos: VIDEOS,
    warranty: '2 Year Brand Warranty',
    material: 'Premium Wool Blend',
    brand: 'Lumière',
    sku: 'M-PERSONAL-12',
    inStock: true,
    stockCount: 7,
    colorImages: (() => {
      const imgs = new Array(12).fill('https://res.cloudinary.com/dgaqfgszr/image/upload/v1781949557/WhatsApp_Image_2026-06-20_at_3.25.48_PM_-_Copy_-_Copy_bhrbk6.jpg')
      return { 'Charcoal': imgs, 'Navy': [...imgs.slice(6), ...imgs.slice(0, 6)] }
    })(),
    reviews: buildReviews('m-personal-12'),
    description:
      'An elegant formal blazer in premium wool blend with a sophisticated fit. Features peak lapels, flap pockets, and a refined silhouette for special occasions.',
    details: ['Premium wool blend', 'Peak lapel', 'Flap pockets', 'Refined fit', 'Dry clean only'],
  },
  {
    id: 'm-personal-13',
    name: 'Modern Business Blazer',
    category: 'men',
    price: 25600,
    originalPrice: 32800,
    rating: 4.7,
    reviews: 24,
    isNew: true,
    featured: true,
    colors: [
      { name: 'Black', hex: '#1c1a17' },
      { name: 'Charcoal', hex: '#3a3833' },
    ],
    sizes: SIZES_APPAREL,
    images: new Array(12).fill('https://res.cloudinary.com/dgaqfgszr/image/upload/v1781949556/WhatsApp_Image_2026-06-20_at_3.25.46_PM_-_Copy_-_Copy_axqh4r.jpg'),
    imageLabels: IMG_LABELS,
    videos: VIDEOS,
    warranty: '2 Year Brand Warranty',
    material: 'Premium Wool Blend',
    brand: 'Lumière',
    sku: 'M-PERSONAL-13',
    inStock: true,
    stockCount: 9,
    colorImages: (() => {
      const imgs = new Array(12).fill('https://res.cloudinary.com/dgaqfgszr/image/upload/v1781949556/WhatsApp_Image_2026-06-20_at_3.25.46_PM_-_Copy_-_Copy_axqh4r.jpg')
      return { 'Black': imgs, 'Charcoal': [...imgs.slice(6), ...imgs.slice(0, 6)] }
    })(),
    reviews: buildReviews('m-personal-13'),
    description:
      'A modern business blazer crafted from premium wool blend with a versatile design. Notched lapels and a two-button closure make it perfect for the office and beyond.',
    details: ['Premium wool blend', 'Notched lapel', 'Two-button closure', 'Versatile fit', 'Dry clean only'],
  },
  {
    id: 'm-personal-14',
    name: 'Classic Wool Blazer',
    category: 'men',
    price: 24000,
    originalPrice: 30400,
    rating: 4.8,
    reviews: 35,
    isNew: true,
    featured: true,
    colors: [
      { name: 'Charcoal', hex: '#3a3833' },
      { name: 'Navy', hex: '#2a3140' },
    ],
    sizes: SIZES_APPAREL,
    images: new Array(12).fill('https://res.cloudinary.com/dgaqfgszr/image/upload/v1781949555/WhatsApp_Image_2026-06-20_at_3.25.39_PM_cqw5hj.jpg'),
    imageLabels: IMG_LABELS,
    videos: VIDEOS,
    warranty: '2 Year Brand Warranty',
    material: 'Premium Wool Blend',
    brand: 'Lumière',
    sku: 'M-PERSONAL-14',
    inStock: true,
    stockCount: 12,
    colorImages: (() => {
      const imgs = new Array(12).fill('https://res.cloudinary.com/dgaqfgszr/image/upload/v1781949555/WhatsApp_Image_2026-06-20_at_3.25.39_PM_cqw5hj.jpg')
      return { 'Charcoal': imgs, 'Navy': [...imgs.slice(6), ...imgs.slice(0, 6)] }
    })(),
    reviews: buildReviews('m-personal-14'),
    description:
      'A classic wool blazer with timeless appeal. Crafted from premium materials with a comfortable fit, notched lapels, and flap pockets for enduring style.',
    details: ['Premium wool blend', 'Notched lapel', 'Flap pockets', 'Classic fit', 'Dry clean only'],
  },
  {
    id: 'm-personal-15',
    name: 'Premium Tailored Blazer',
    category: 'men',
    price: 26400,
    originalPrice: 33600,
    rating: 4.8,
    reviews: 27,
    isNew: true,
    featured: true,
    colors: [
      { name: 'Charcoal', hex: '#3a3833' },
      { name: 'Black', hex: '#1c1a17' },
    ],
    sizes: SIZES_APPAREL,
    images: new Array(12).fill('https://res.cloudinary.com/dgaqfgszr/image/upload/v1781949923/WhatsApp_Image_2026-06-20_at_3.25.30_PM_iehvco.jpg'),
    imageLabels: IMG_LABELS,
    videos: VIDEOS,
    warranty: '2 Year Brand Warranty',
    material: 'Premium Wool Blend',
    brand: 'Lumière',
    sku: 'M-PERSONAL-15',
    inStock: true,
    stockCount: 8,
    colorImages: (() => {
      const imgs = new Array(12).fill('https://res.cloudinary.com/dgaqfgszr/image/upload/v1781949923/WhatsApp_Image_2026-06-20_at_3.25.30_PM_iehvco.jpg')
      return { 'Charcoal': imgs, 'Black': [...imgs.slice(6), ...imgs.slice(0, 6)] }
    })(),
    reviews: buildReviews('m-personal-15'),
    description:
      'A premium tailored blazer crafted from luxurious wool blend with a sharp modern fit. Features notched lapels, flap pockets, and a refined silhouette for any formal occasion.',
    details: ['Premium wool blend', 'Notched lapel', 'Flap pockets', 'Tailored fit', 'Dry clean only'],
  },

  // --- SHOES (10) ---
  {
    id: 's-runner',
    name: 'Vela Low Runner',
    category: 'shoes',
    price: 11600,
    originalPrice: null,
    rating: 4.7,
    reviews: 188,
    isNew: true,
    featured: true,
    colors: [
      { name: 'Off-White', hex: '#ece7dc' },
      { name: 'Black', hex: '#1c1a17' },
    ],
    sizes: SIZES_SHOES,
    images: [img(S), img(W), img(J), img(X), img(P), img(U1), img(Q), img(Y), img(K), img(A), img(D), img(E)],
    imageLabels: IMG_LABELS,
    videos: VIDEOS,
    warranty: '2 Year Brand Warranty',
    material: 'Premium Quality',
    brand: 'Lumi\xe8re',
    sku: 'S-RUNNER',
    inStock: true,
    stockCount: Math.floor(Math.random() * 50) + 5,
    colorImages: (() => {
      const imgs = [img(S), img(W), img(J), img(X), img(P), img(U1), img(Q), img(Y), img(K), img(A), img(D), img(E)]
      return { 'Off-White': imgs, 'Black': [...imgs.slice(6), ...imgs.slice(0, 6)] }
    })(),
    reviews: buildReviews('s-runner'),
    description:
      'A minimal low-top runner on a cushioned cup-sole. Soft nappa upper, breathable lining, all-day comfort.',
    details: ['Nappa leather upper', 'Cushioned cup-sole', 'Removable insole'],
  },
  {
    id: 's-sneaker',
    name: 'Astra Court Sneaker',
    category: 'shoes',
    price: 10560,
    originalPrice: 13440,
    rating: 4.6,
    reviews: 142,
    isNew: false,
    featured: false,
    colors: [
      { name: 'White', hex: '#f0ece2' },
      { name: 'Sand', hex: '#cdba9b' },
    ],
    sizes: SIZES_SHOES,
    images: [img(J), img(X), img(S), img(W), img(P), img(U1), img(Q), img(Y), img(K), img(A), img(D), img(E)],
    imageLabels: IMG_LABELS,
    videos: VIDEOS,
    warranty: '2 Year Brand Warranty',
    material: 'Premium Quality',
    brand: 'Lumi\xe8re',
    sku: 'S-SNEAKER',
    inStock: true,
    stockCount: Math.floor(Math.random() * 50) + 5,
    colorImages: (() => {
      const imgs = [img(J), img(X), img(S), img(W), img(P), img(U1), img(Q), img(Y), img(K), img(A), img(D), img(E)]
      return { 'White': imgs, 'Sand': [...imgs.slice(6), ...imgs.slice(0, 6)] }
    })(),
    reviews: buildReviews('s-sneaker'),
    description:
      'A clean court silhouette with tonal stitching and a slim profile that pairs with everything.',
    details: ['Full-grain leather', 'Rubber outsole', 'Padded collar'],
  },
  {
    id: 's-red-trainer',
    name: 'Pulse Sport Trainer',
    category: 'shoes',
    price: 9440,
    originalPrice: null,
    rating: 4.4,
    reviews: 76,
    isNew: true,
    featured: false,
    colors: [
      { name: 'Crimson', hex: '#c0392b' },
      { name: 'Slate', hex: '#54606b' },
    ],
    sizes: SIZES_SHOES,
    images: [img(P), img(W), img(S), img(J), img(X), img(U1), img(Q), img(Y), img(K), img(A), img(D), img(E)],
    imageLabels: IMG_LABELS,
    videos: VIDEOS,
    warranty: '2 Year Brand Warranty',
    material: 'Premium Quality',
    brand: 'Lumi\xe8re',
    sku: 'S-RED-TRAINER',
    inStock: true,
    stockCount: Math.floor(Math.random() * 50) + 5,
    colorImages: (() => {
      const imgs = [img(P), img(W), img(S), img(J), img(X), img(U1), img(Q), img(Y), img(K), img(A), img(D), img(E)]
      return { 'Crimson': imgs, 'Slate': [...imgs.slice(6), ...imgs.slice(0, 6)] }
    })(),
    reviews: buildReviews('s-red-trainer'),
    description:
      'A lightweight performance trainer with a responsive foam midsole and breathable engineered mesh.',
    details: ['Engineered mesh', 'Responsive foam midsole', 'Reflective heel'],
  },
  {
    id: 's-loafers',
    name: 'Dune Leather Loafers',
    category: 'shoes',
    price: 10880,
    originalPrice: null,
    rating: 4.6,
    reviews: 64,
    isNew: false,
    featured: true,
    colors: [
      { name: 'Tan', hex: '#b98a5b' },
      { name: 'Black', hex: '#1c1a17' },
    ],
    sizes: SIZES_SHOES,
    images: [img(J), img(X), img(W), img(S), img(P), img(U1), img(Q), img(Y), img(K), img(A), img(D), img(E)],
    imageLabels: IMG_LABELS,
    videos: VIDEOS,
    warranty: '2 Year Brand Warranty',
    material: 'Premium Quality',
    brand: 'Lumi\xe8re',
    sku: 'S-LOAFERS',
    inStock: true,
    stockCount: Math.floor(Math.random() * 50) + 5,
    colorImages: (() => {
      const imgs = [img(J), img(X), img(W), img(S), img(P), img(U1), img(Q), img(Y), img(K), img(A), img(D), img(E)]
      return { 'Tan': imgs, 'Black': [...imgs.slice(6), ...imgs.slice(0, 6)] }
    })(),
    reviews: buildReviews('s-loafers'),
    description:
      'A streamlined penny loafer in polished calf leather with a leather sole and a bit of brass. From desk to dinner.',
    details: ['Polished calf leather', 'Leather sole', 'Brass bit detail', 'Leather lined'],
  },
  {
    id: 's-boots',
    name: 'Nomad Chelsea Boot',
    category: 'shoes',
    price: 14400,
    originalPrice: 17600,
    rating: 4.8,
    reviews: 103,
    isNew: true,
    featured: true,
    colors: [
      { name: 'Chestnut', hex: '#854d2b' },
      { name: 'Black', hex: '#1c1a17' },
    ],
    sizes: SIZES_SHOES,
    images: [img(X), img(J), img(W), img(S), img(P), img(U1), img(Q), img(Y), img(K), img(A), img(D), img(E)],
    imageLabels: IMG_LABELS,
    videos: VIDEOS,
    warranty: '2 Year Brand Warranty',
    material: 'Premium Quality',
    brand: 'Lumi\xe8re',
    sku: 'S-BOOTS',
    inStock: true,
    stockCount: Math.floor(Math.random() * 50) + 5,
    colorImages: (() => {
      const imgs = [img(X), img(J), img(W), img(S), img(P), img(U1), img(Q), img(Y), img(K), img(A), img(D), img(E)]
      return { 'Chestnut': imgs, 'Black': [...imgs.slice(6), ...imgs.slice(0, 6)] }
    })(),
    reviews: buildReviews('s-boots'),
    description:
      'A sleek Chelsea boot in pull-up leather with an elastic gusset and chunky commando sole. All-weather style.',
    details: ['Pull-up leather', 'Elastic gusset', 'Commando sole', 'Leather lined'],
  },
  {
    id: 's-sandals',
    name: 'Costa Leather Sandals',
    category: 'shoes',
    price: 4320,
    originalPrice: null,
    rating: 4.3,
    reviews: 129,
    isNew: false,
    featured: false,
    colors: [
      { name: 'Cognac', hex: '#8a5a32' },
      { name: 'Black', hex: '#1c1a17' },
    ],
    sizes: SIZES_SHOES,
    images: [img(S), img(W), img(J), img(X), img(P), img(U1), img(Q), img(Y), img(K), img(A), img(D), img(E)],
    imageLabels: IMG_LABELS,
    videos: VIDEOS,
    warranty: '2 Year Brand Warranty',
    material: 'Premium Quality',
    brand: 'Lumi\xe8re',
    sku: 'S-SANDALS',
    inStock: true,
    stockCount: Math.floor(Math.random() * 50) + 5,
    colorImages: (() => {
      const imgs = [img(S), img(W), img(J), img(X), img(P), img(U1), img(Q), img(Y), img(K), img(A), img(D), img(E)]
      return { 'Cognac': imgs, 'Black': [...imgs.slice(6), ...imgs.slice(0, 6)] }
    })(),
    reviews: buildReviews('s-sandals'),
    description:
      'A simple two-strap sandal in soft Italian leather with a contoured footbed. Summer perfected.',
    details: ['Italian leather', 'Contoured footbed', 'Rubber outsole'],
  },
  {
    id: 's-espadrilles',
    name: 'Soleil Woven Espadrille',
    category: 'shoes',
    price: 5280,
    originalPrice: null,
    rating: 4.4,
    reviews: 88,
    isNew: true,
    featured: false,
    colors: [
      { name: 'Natural', hex: '#d4c9a8' },
      { name: 'Navy', hex: '#2a3140' },
    ],
    sizes: SIZES_SHOES,
    images: [img(W), img(J), img(X), img(S), img(P), img(U1), img(Q), img(Y), img(K), img(A), img(D), img(E)],
    imageLabels: IMG_LABELS,
    videos: VIDEOS,
    warranty: '2 Year Brand Warranty',
    material: 'Premium Quality',
    brand: 'Lumi\xe8re',
    sku: 'S-ESPADRILLES',
    inStock: true,
    stockCount: Math.floor(Math.random() * 50) + 5,
    colorImages: (() => {
      const imgs = [img(W), img(J), img(X), img(S), img(P), img(U1), img(Q), img(Y), img(K), img(A), img(D), img(E)]
      return { 'Natural': imgs, 'Navy': [...imgs.slice(6), ...imgs.slice(0, 6)] }
    })(),
    reviews: buildReviews('s-espadrilles'),
    description:
      'An artisanal espadrille with a jute-wrapped wedge and cotton canvas upper. Effortless coastal energy.',
    details: ['Jute wedge sole', 'Cotton canvas upper', 'Cushioned insole'],
  },
  {
    id: 's-oxfords',
    name: 'Arthur Cap-Toe Oxford',
    category: 'shoes',
    price: 16800,
    originalPrice: 20800,
    rating: 4.9,
    reviews: 56,
    isNew: false,
    featured: false,
    colors: [
      { name: 'Black', hex: '#1c1a17' },
      { name: 'Walnut', hex: '#7a4e2d' },
    ],
    sizes: SIZES_SHOES,
    images: [img(J), img(X), img(W), img(S), img(P), img(U1), img(Q), img(Y), img(K), img(A), img(D), img(E)],
    imageLabels: IMG_LABELS,
    videos: VIDEOS,
    warranty: '2 Year Brand Warranty',
    material: 'Premium Quality',
    brand: 'Lumi\xe8re',
    sku: 'S-OXFORD',
    inStock: true,
    stockCount: Math.floor(Math.random() * 50) + 5,
    colorImages: (() => {
      const imgs = [img(J), img(X), img(W), img(S), img(P), img(U1), img(Q), img(Y), img(K), img(A), img(D), img(E)]
      return { 'Black': imgs, 'Walnut': [...imgs.slice(6), ...imgs.slice(0, 6)] }
    })(),
    reviews: buildReviews('s-oxfords'),
    description:
      'A Goodyear-welted cap-toe oxford in museum calf leather. The dress shoe that commands respect.',
    details: ['Museum calf leather', 'Goodyear welted', 'Leather sole', 'Blake stitched'],
  },
  {
    id: 's-heels',
    name: 'Stella Pointed Mule',
    category: 'shoes',
    price: 9600,
    originalPrice: null,
    rating: 4.6,
    reviews: 71,
    isNew: true,
    featured: false,
    colors: [
      { name: 'Nude', hex: '#d6bca3' },
      { name: 'Black Suede', hex: '#2a2420' },
    ],
    sizes: SIZES_SHOES,
    images: [img(X), img(S), img(J), img(W), img(P), img(U1), img(Q), img(Y), img(K), img(A), img(D), img(E)],
    imageLabels: IMG_LABELS,
    videos: VIDEOS,
    warranty: '2 Year Brand Warranty',
    material: 'Premium Quality',
    brand: 'Lumi\xe8re',
    sku: 'S-HEELS',
    inStock: true,
    stockCount: Math.floor(Math.random() * 50) + 5,
    colorImages: (() => {
      const imgs = [img(X), img(S), img(J), img(W), img(P), img(U1), img(Q), img(Y), img(K), img(A), img(D), img(E)]
      return { 'Nude': imgs, 'Black Suede': [...imgs.slice(6), ...imgs.slice(0, 6)] }
    })(),
    reviews: buildReviews('s-heels'),
    description:
      'A pointed kitten-heel mule in suede with a delicate ankle strap. The shoe that does the talking for you.',
    details: ['Italian suede', 'Kitten heel (60mm)', 'Ankle strap', 'Leather lining'],
  },
  {
    id: 's-slip-ons',
    name: 'Haven Slip-On Sneaker',
    category: 'shoes',
    price: 7520,
    originalPrice: null,
    rating: 4.4,
    reviews: 153,
    isNew: false,
    featured: false,
    colors: [
      { name: 'White', hex: '#f0ece2' },
      { name: 'Grey', hex: '#8a8a88' },
    ],
    sizes: SIZES_SHOES,
    images: [img(W), img(S), img(J), img(X), img(P), img(U1), img(Q), img(Y), img(K), img(A), img(D), img(E)],
    imageLabels: IMG_LABELS,
    videos: VIDEOS,
    warranty: '2 Year Brand Warranty',
    material: 'Premium Quality',
    brand: 'Lumi\xe8re',
    sku: 'S-SLIP-ONS',
    inStock: true,
    stockCount: Math.floor(Math.random() * 50) + 5,
    colorImages: (() => {
      const imgs = [img(W), img(S), img(J), img(X), img(P), img(U1), img(Q), img(Y), img(K), img(A), img(D), img(E)]
      return { 'White': imgs, 'Grey': [...imgs.slice(6), ...imgs.slice(0, 6)] }
    })(),
    reviews: buildReviews('s-slip-ons'),
    description:
      'A sock-like slip-on sneaker with a knit upper and a flexible rubber sole. Step in and go.',
    details: ['Knit textile upper', 'Rubber outsole', 'Padded heel', 'Machine washable'],
  },

  // --- ACCESSORIES (10) ---
  {
    id: 'a-leather-bag',
    name: 'Margaux Leather Tote',
    category: 'accessories',
    price: 19200,
    originalPrice: 23600,
    rating: 4.9,
    reviews: 113,
    isNew: false,
    featured: true,
    colors: [
      { name: 'Cognac', hex: '#8a5a32' },
      { name: 'Black', hex: '#1c1a17' },
    ],
    sizes: SIZE_ONE,
    images: [img(CC), img(R), img(Z), img(B), img(BB), img(T), img(G), img(DD), img(EE), img(C), img(A), img(K)],
    imageLabels: IMG_LABELS,
    videos: VIDEOS,
    warranty: '2 Year Brand Warranty',
    material: 'Premium Quality',
    brand: 'Lumi\xe8re',
    sku: 'A-LEATHER-BAG',
    inStock: true,
    stockCount: Math.floor(Math.random() * 50) + 5,
    colorImages: (() => {
      const imgs = [img(CC), img(R), img(Z), img(B), img(BB), img(T), img(G), img(DD), img(EE), img(C), img(A), img(K)]
      return { 'Cognac': imgs, 'Black': [...imgs.slice(6), ...imgs.slice(0, 6)] }
    })(),
    reviews: buildReviews('a-leather-bag'),
    description:
      'A structured everyday tote in full-grain vegetable-tanned leather that ages to a rich patina.',
    details: ['Vegetable-tanned leather', 'Suede-lined interior', 'Fits a 14" laptop'],
  },
  {
    id: 'a-sunglasses',
    name: 'Riviera Acetate Sunglasses',
    category: 'accessories',
    price: 6880,
    originalPrice: null,
    rating: 4.5,
    reviews: 201,
    isNew: true,
    featured: false,
    colors: [
      { name: 'Amber', hex: '#b07d3a' },
      { name: 'Onyx', hex: '#23211d' },
    ],
    sizes: SIZE_ONE,
    images: [img(BB), img(B), img(CC), img(G), img(R), img(Z), img(T), img(DD), img(EE), img(C), img(A), img(K)],
    imageLabels: IMG_LABELS,
    videos: VIDEOS,
    warranty: '2 Year Brand Warranty',
    material: 'Premium Quality',
    brand: 'Lumi\xe8re',
    sku: 'A-SUNGLASSES',
    inStock: true,
    stockCount: Math.floor(Math.random() * 50) + 5,
    colorImages: (() => {
      const imgs = [img(BB), img(B), img(CC), img(G), img(R), img(Z), img(T), img(DD), img(EE), img(C), img(A), img(K)]
      return { 'Amber': imgs, 'Onyx': [...imgs.slice(6), ...imgs.slice(0, 6)] }
    })(),
    reviews: buildReviews('a-sunglasses'),
    description:
      'Hand-polished acetate frames with UV400 lenses and a timeless silhouette that flatters every face.',
    details: ['Italian acetate', 'UV400 polarised lenses', 'Includes leather case'],
  },
  {
    id: 'a-watch',
    name: 'Atelier Minimalist Watch',
    category: 'accessories',
    price: 14000,
    originalPrice: 16800,
    rating: 4.8,
    reviews: 98,
    isNew: false,
    featured: true,
    colors: [
      { name: 'Tan', hex: '#b98a5b' },
      { name: 'Black', hex: '#1c1a17' },
    ],
    sizes: SIZE_ONE,
    images: [img(Z), img(R), img(BB), img(T), img(G), img(B), img(CC), img(DD), img(EE), img(C), img(A), img(K)],
    imageLabels: IMG_LABELS,
    videos: VIDEOS,
    warranty: '2 Year Brand Warranty',
    material: 'Premium Quality',
    brand: 'Lumi\xe8re',
    sku: 'A-WATCH',
    inStock: true,
    stockCount: Math.floor(Math.random() * 50) + 5,
    colorImages: (() => {
      const imgs = [img(Z), img(R), img(BB), img(T), img(G), img(B), img(CC), img(DD), img(EE), img(C), img(A), img(K)]
      return { 'Tan': imgs, 'Black': [...imgs.slice(6), ...imgs.slice(0, 6)] }
    })(),
    reviews: buildReviews('a-watch'),
    description:
      'A refined 38mm watch with a sapphire crystal, sunray dial and an interchangeable Italian leather strap.',
    details: ['38mm stainless case', 'Sapphire crystal', 'Italian leather strap', '5 ATM water resistant'],
  },
  {
    id: 'a-backpack',
    name: 'Voyage Canvas Backpack',
    category: 'accessories',
    price: 8960,
    originalPrice: null,
    rating: 4.6,
    reviews: 67,
    isNew: false,
    featured: false,
    colors: [
      { name: 'Olive', hex: '#6f7355' },
      { name: 'Stone', hex: '#bdb29c' },
    ],
    sizes: SIZE_ONE,
    images: [img(G), img(T), img(R), img(Z), img(B), img(CC), img(BB), img(DD), img(EE), img(C), img(A), img(K)],
    imageLabels: IMG_LABELS,
    videos: VIDEOS,
    warranty: '2 Year Brand Warranty',
    material: 'Premium Quality',
    brand: 'Lumi\xe8re',
    sku: 'A-BACKPACK',
    inStock: true,
    stockCount: Math.floor(Math.random() * 50) + 5,
    colorImages: (() => {
      const imgs = [img(G), img(T), img(R), img(Z), img(B), img(CC), img(BB), img(DD), img(EE), img(C), img(A), img(K)]
      return { 'Olive': imgs, 'Stone': [...imgs.slice(6), ...imgs.slice(0, 6)] }
    })(),
    reviews: buildReviews('a-backpack'),
    description:
      'A roll-top canvas backpack with leather trim and a padded sleeve \u2014 built for the commute and the weekend alike.',
    details: ['Water-resistant canvas', 'Leather trim', 'Padded 15" sleeve'],
  },
  {
    id: 'a-silk-scarf',
    name: 'Sabine Silk Scarf',
    category: 'accessories',
    price: 4800,
    originalPrice: null,
    rating: 4.7,
    reviews: 43,
    isNew: true,
    featured: false,
    colors: [
      { name: 'Twill', hex: '#d4c9a8' },
      { name: 'Indigo', hex: '#34465e' },
    ],
    sizes: SIZE_ONE,
    images: [img(B), img(CC), img(G), img(R), img(Z), img(T), img(BB), img(DD), img(EE), img(C), img(A), img(K)],
    imageLabels: IMG_LABELS,
    videos: VIDEOS,
    warranty: '2 Year Brand Warranty',
    material: 'Premium Quality',
    brand: 'Lumi\xe8re',
    sku: 'A-SILK-SCARF',
    inStock: true,
    stockCount: Math.floor(Math.random() * 50) + 5,
    colorImages: (() => {
      const imgs = [img(B), img(CC), img(G), img(R), img(Z), img(T), img(BB), img(DD), img(EE), img(C), img(A), img(K)]
      return { 'Twill': imgs, 'Indigo': [...imgs.slice(6), ...imgs.slice(0, 6)] }
    })(),
    reviews: buildReviews('a-silk-scarf'),
    description:
      'A hand-rolled silk twill scarf printed in Como. Wear it around your neck, your bag, or your waist.',
    details: ['100% silk twill', 'Hand-rolled edges', '90 x 90 cm', 'Dry clean'],
  },
  {
    id: 'a-leather-belt',
    name: 'Sloane Leather Belt',
    category: 'accessories',
    price: 3520,
    originalPrice: null,
    rating: 4.5,
    reviews: 189,
    isNew: false,
    featured: false,
    colors: [
      { name: 'Tan', hex: '#b98a5b' },
      { name: 'Black', hex: '#1c1a17' },
    ],
    sizes: SIZE_ONE,
    images: [img(R), img(Z), img(CC), img(B), img(BB), img(T), img(G), img(DD), img(EE), img(C), img(A), img(K)],
    imageLabels: IMG_LABELS,
    videos: VIDEOS,
    warranty: '2 Year Brand Warranty',
    material: 'Premium Quality',
    brand: 'Lumi\xe8re',
    sku: 'A-LEATHER-BELT',
    inStock: true,
    stockCount: Math.floor(Math.random() * 50) + 5,
    colorImages: (() => {
      const imgs = [img(R), img(Z), img(CC), img(B), img(BB), img(T), img(G), img(DD), img(EE), img(C), img(A), img(K)]
      return { 'Tan': imgs, 'Black': [...imgs.slice(6), ...imgs.slice(0, 6)] }
    })(),
    reviews: buildReviews('a-leather-belt'),
    description:
      'A 35mm Italian leather belt with a solid brass buckle. Simple, essential, built to last.',
    details: ['Italian calf leather', 'Solid brass buckle', '35mm width', 'Hand-finished edges'],
  },
  {
    id: 'a-beanie',
    name: 'Noor Cashmere Beanie',
    category: 'accessories',
    price: 4160,
    originalPrice: null,
    rating: 4.6,
    reviews: 55,
    isNew: true,
    featured: false,
    colors: [
      { name: 'Stone', hex: '#bdb29c' },
      { name: 'Burgundy', hex: '#5c1a1b' },
    ],
    sizes: SIZE_ONE,
    images: [img(E), img(V), img(D), img(C), img(H), img(M), img(L), img(AA), img(A), img(B), img(G), img(I)],
    imageLabels: IMG_LABELS,
    videos: VIDEOS,
    warranty: '2 Year Brand Warranty',
    material: 'Premium Quality',
    brand: 'Lumi\xe8re',
    sku: 'A-BEANIE',
    inStock: true,
    stockCount: Math.floor(Math.random() * 50) + 5,
    colorImages: (() => {
      const imgs = [img(E), img(V), img(D), img(C), img(H), img(M), img(L), img(AA), img(A), img(B), img(G), img(I)]
      return { 'Stone': imgs, 'Burgundy': [...imgs.slice(6), ...imgs.slice(0, 6)] }
    })(),
    reviews: buildReviews('a-beanie'),
    description:
      'A fine-gauge cashmere beanie with a deep ribbed cuff. Warmth without the bulk.',
    details: ['100% cashmere', 'Ribbed cuff', 'One size', 'Hand wash cold'],
  },
  {
    id: 'a-bracelet',
    name: 'Talus Beaded Bracelet',
    category: 'accessories',
    price: 2400,
    originalPrice: null,
    rating: 4.4,
    reviews: 134,
    isNew: false,
    featured: false,
    colors: [
      { name: 'Lapis', hex: '#26619c' },
      { name: 'Onyx', hex: '#23211d' },
      { name: 'Tiger', hex: '#b87a32' },
    ],
    sizes: SIZE_ONE,
    images: [img(T), img(G), img(Z), img(BB), img(R), img(B), img(CC), img(DD), img(EE), img(C), img(A), img(K)],
    imageLabels: IMG_LABELS,
    videos: VIDEOS,
    warranty: '2 Year Brand Warranty',
    material: 'Premium Quality',
    brand: 'Lumi\xe8re',
    sku: 'A-BRACELET',
    inStock: true,
    stockCount: Math.floor(Math.random() * 50) + 5,
    colorImages: (() => {
      const imgs = [img(T), img(G), img(Z), img(BB), img(R), img(B), img(CC), img(DD), img(EE), img(C), img(A), img(K)]
      return { 'Lapis': imgs, 'Onyx': [...imgs.slice(4), ...imgs.slice(0, 4)], 'Tiger': [...imgs.slice(8), ...imgs.slice(0, 8)] }
    })(),
    reviews: buildReviews('a-bracelet'),
    description:
      'Hand-strung semi-precious stones with a gold-filled clasp. Stack them or wear alone.',
    details: ['Semi-precious stones', 'Gold-filled clasp', 'Adjustable 16-20 cm'],
  },
  {
    id: 'a-wallet',
    name: 'Cardan Card Holder',
    category: 'accessories',
    price: 2800,
    originalPrice: null,
    rating: 4.6,
    reviews: 217,
    isNew: false,
    featured: false,
    colors: [
      { name: 'Cognac', hex: '#8a5a32' },
      { name: 'Black', hex: '#1c1a17' },
    ],
    sizes: SIZE_ONE,
    images: [img(Z), img(R), img(CC), img(T), img(G), img(B), img(BB), img(DD), img(EE), img(C), img(A), img(K)],
    imageLabels: IMG_LABELS,
    videos: VIDEOS,
    warranty: '2 Year Brand Warranty',
    material: 'Premium Quality',
    brand: 'Lumi\xe8re',
    sku: 'A-WALLET',
    inStock: true,
    stockCount: Math.floor(Math.random() * 50) + 5,
    colorImages: (() => {
      const imgs = [img(Z), img(R), img(CC), img(T), img(G), img(B), img(BB), img(DD), img(EE), img(C), img(A), img(K)]
      return { 'Cognac': imgs, 'Black': [...imgs.slice(6), ...imgs.slice(0, 6)] }
    })(),
    reviews: buildReviews('a-wallet'),
    description:
      'A slim Italian leather card case with four slots and a central pocket. Minimal carry, maximum quality.',
    details: ['Italian calf leather', 'Four card slots', 'Central pocket', 'Hand-stitched'],
  },
  {
    id: 'a-earrings',
    name: 'Luna Hoop Earrings',
    category: 'accessories',
    price: 3360,
    originalPrice: null,
    rating: 4.7,
    reviews: 96,
    isNew: true,
    featured: false,
    colors: [
      { name: 'Gold', hex: '#d4a940' },
      { name: 'Silver', hex: '#b0b5b9' },
    ],
    sizes: SIZE_ONE,
    images: [img(B), img(CC), img(BB), img(T), img(R), img(Z), img(G), img(DD), img(EE), img(C), img(A), img(K)],
    imageLabels: IMG_LABELS,
    videos: VIDEOS,
    warranty: '2 Year Brand Warranty',
    material: 'Premium Quality',
    brand: 'Lumi\xe8re',
    sku: 'A-EARRINGS',
    inStock: true,
    stockCount: Math.floor(Math.random() * 50) + 5,
    colorImages: (() => {
      const imgs = [img(B), img(CC), img(BB), img(T), img(R), img(Z), img(G), img(DD), img(EE), img(C), img(A), img(K)]
      return { 'Gold': imgs, 'Silver': [...imgs.slice(6), ...imgs.slice(0, 6)] }
    })(),
    reviews: buildReviews('a-earrings'),
    description:
      'Sculptural hoop earrings in polished gold-vermeil with a brushed flat face. Modern heirlooms.',
    details: ['Gold-vermeil on sterling', 'Brushed finish', 'Nickel-free', '40mm diameter'],
  },
]

export const getProduct = (id) => PRODUCTS.find((p) => p.id === id)

export const getRelated = (product, count = 4) =>
  PRODUCTS.filter(
    (p) => p.category === product.category && p.id !== product.id
  ).slice(0, count)

export const formatPrice = (value) =>
  new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(value)

export const getFrequentlyBought = (product) =>
  PRODUCTS.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 3)

export const getBestSellers = () =>
  PRODUCTS.filter((p) => p.rating >= 4.7).slice(0, 4)
