// // eslint-disable-next-line no-undef
// const {faker} = require('@faker-js/faker');
// // eslint-disable-next-line no-undef
// module.exports = () => {
//   // eslint-disable-next-line no-undef
//   const {faker} = require('@faker-js/faker');
//
//   const CATEGORIES_COUNT = 10;
//   const ADVERTS_COUNT = 30;
//
//   return ({
//     name: {
//       name: faker.name.firstName(),
//       avatar: faker.image.avatar()
//     },
//     categories: Array.from(Array(CATEGORIES_COUNT).keys()).map((i) => ({
//       id: i,
//       title: faker.commerce.department(),
//     })),
//     adverts: Array.from(Array(ADVERTS_COUNT).keys()).map((i) => ({
//       id: i,
//       title: faker.commerce.productName(),
//       price: faker.commerce.price(),
//       description: faker.commerce.productDescription(),
//       seller: faker.name.firstName(),
//       image: `${faker.image.business(400, 400)}?i=${i}`,
//       sellerPhone: faker.phone.phoneNumber('+48 ### ### ###'),
//       canNegotiate: faker.datatype.boolean(),
//       createdOn: faker.date.recent(),
//       categoryId: faker.datatype.number(CATEGORIES_COUNT - 1)
//     }))
//   })
// }
