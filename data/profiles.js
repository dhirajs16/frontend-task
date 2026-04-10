const { faker } = require('@faker-js/faker');

const profiles = [];

for (let i = 1; i <= 100; i++) {
  profiles.push({
    id: i,
    name: faker.person.fullName(),
    email: faker.internet.email(),
    phone: faker.phone.number(),
    address: faker.location.streetAddress(),
    dob: faker.date.birthdate().toISOString().split('T')[0],
  });
}

module.exports = profiles;