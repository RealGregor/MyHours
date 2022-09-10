# MyHours

## Navodila za namestitev 

**You need to have Node.js along with npm and ng installed!**

1. Clone repository https://github.com/RealGregor/MyHours.git


2. Open **\\MyHours\\MyHoursProject.Web.Angular** folder


3. Install dependencies with the following command in the terminal
 
```bash
npm install --legacy-peer-deps
```

4. Build the angular client using the following command in the terminal

```bash
ng build
```

5. To start the express server that acts as a proxy, run the following command

```bash
npm start
```

  It will try to run on port 3000, if it's already taken change the configuration inside **/MyHoursProject.Web.Angular/index.js**

6. You can also run the angular clientside with the following command

```bash
ng serve
```

  It will try to run on port 4200



## Navodila za uporabo

### Settings view
- Without the token, the app only allows **Settings view** to be used. There, you can input the ClientId and ClientSecret to get the token from allhours.
- Settings view also informs user when the token is valid 
- User can "Logout", which will remove the token from the local storage, redirecting the user back to the original state with only settings functionality

![image](https://user-images.githubusercontent.com/55653561/189497005-74088c42-4346-4455-afa8-9fc7c93df8c0.png)


### Users view
- Requires token to be accessible
- Displays Users' information in a grid, where **columns can be reordered, resized made hidden/visible**
- **Clientside paging** is implemented, however it could be easily swapped for serverside paging using the users/query endpoint instead
- User can **sort the grid** on those columns that sorting is allowed

![Pasted image 20220910195605](https://user-images.githubusercontent.com/55653561/189497095-4aff1bab-46c7-4aba-9af7-83c103112d6e.png)


#### Adding new user
- User can add a new user by clicking on button "Dodaj", where a modal is shown.
- Modal consists of FirstName, LastName and Email input fields
- There is data validation - required and email validation
- User cannot try to add a new user (by using the client) if there are validation errors
- After clicking on button "Save", in the case of success, the modal will close and users grid will refresh. In case of failure, an alert will be shown

![Pasted image 20220910200330](https://user-images.githubusercontent.com/55653561/189497127-336ac76e-f675-4df2-a864-9c527e9294ab.png)

#### Adding absence to an existing user
- User can add an absence to an existing user
- Absences can be selected from the dropdown
- Validation on fields AbsenceDefinition, TImestamp and Origin, Comment is optional
- After clicking on button "Save", in the case of success, the modal will close. In case of failure, an alert will be shown

![Pasted image 20220910202420](https://user-images.githubusercontent.com/55653561/189497140-ebde6877-57d0-44d8-a05c-3e682ec16279.png)


#### DiscardChanges modal
- When trying to close the modal with changes, user is prompted to discard the changes, or keep the modal open and edit them (in case of misclicks)

![Pasted image 20220910202127](https://user-images.githubusercontent.com/55653561/189497134-dfa409d3-dbb0-4247-a3b7-eaee1d812261.png)

### Absences view
- Requires token to be accessible
- Similar to Users view (has the same functionalities - sort, filter, pagination, selecting columns and custom grid functionalities), differs in the date range selection
- User can select dateFrom and dateTo, and then click button "Pridobi podatke" which will only fetch the absences within the given date range.

![Pasted image 20220910202655](https://user-images.githubusercontent.com/55653561/189497145-fe30ca40-5779-41b4-b12e-d2e522df682c.png)
