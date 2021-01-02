# Mittaukset-projekti

Projekti on jaettu kahteen kilkkeeseen: rajapinta & käyttöliittymä.

# rajapinta(api)
API on perus express-kilkkeellä tehty ratkaisu. Tietokannaaksi valitsin Postgresin, koska se on viimeaikoina ollut itselle eniten käytetty, joskin tässä projektissa ei kannalla juuri väliä ole. Melkein mikä tahansa peruskanta jota TypeOrm tukee, voi käyttää.

Stäkkinä on express.js serveriksi, typeorm kantakerrokseksi, yup validointiin ja supertest expressin testaamiseen.

Yleisistä patterneista jätin käyttämättä Service Patternin(esim. measurementService.create(dto)) ja Data Mapperin(request <-> dto <-> entity), jotka olisivat seuraavia askeleita jos ohjelmaa pitää alkaa laajentaa enemmän ja haluaa pitää laajentamisen helposti hallittavana.

Jotta rajapinnan saa pyörimään, tarvitset kannan taustalle(testikanta testaamiseen + kanta itse pyörittämistä varten).

Asennus:
```
cd api
npm run install
```

Kanta:
```
docker-compose up -d
```

Testit:
```
npm test
```

Käynnistys
```
npm run start
```

# käyttöliittymä(ui)
Käyttöliittymä on alustettu create-react-apilla ja siinä on pääkilkkeinä lisäksi

```
- styled-components tyyleihin
- react-hook-form lomakkeen hanskaamiseen
- yup lomakkeen validaatioon
- react-testing-library testaamiseen
```

Jätin käyttämättä redux & redux-saga-komboa koska mielestäni siitä ei tämän kokoisessa projektissa juuri hyötyä. Tavaraa ei juuri tarvitse liikuttaa eri komponenttien välillä syvässä puussa.

Asennus: 
```
cd ui
npm run install
```

Testit:
```
npm test
```

Käynnistys:
```
npm start
```