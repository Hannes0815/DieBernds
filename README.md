# BerndsBlog
Repo für Web Engineering

---

## Dev

### Installation (dev, unter Windows)
 * `PS> npm install` -> Pakete installieren
 * `PS> start nodemon` -> Server starten, nodemon lädt automatisch neu wenn Dateien geändert wurden
 
### Testen

Entweder mit [Postman](https://www.getpostman.com/), oder mit der PowerShell: `PS> curl http://localhost:8082/api/V1/<...>`

## API Dokumentation

### Allgemein
* Die einzelnen Endpoints werden mit dem Pfadpräfix `/api/V1` angesprochen.
* Der Header `Content-Type` ist anzugeben wenn Parameter im Request Body übertragen werden. Parameter können als JSON (`application/json`) oder als Key/Value (`application/x-www-form-urlencoded`) übertragen werden.
* Soll der Request authentifiiziert sein, muss das Token im Header `x-bernd-token` angegeben werden. Das Token wird über den Endpunkt `/login` geliefert.

### Endpoints

#### User

##### Login
* Endpoint: `PUT /login`
* Parameter:
  * `username`
  * `password`

 
 ##### Passwort ändern
 * Endpoint: `PUT /passwordRecovery`
 * __Authentifiziert__
 * Parameter:
   * `password`
   * `newPassword`
  
#### Blog

TBD
