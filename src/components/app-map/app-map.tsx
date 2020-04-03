import { Component, h       }   from    '@stencil/core';
import { State              }   from    '@stencil/core';
import * as canteenDB from '../db';

@Component({
    tag: 'app-map',
    styleUrl: 'app-map.css',
    shadow: true,
})
export class AppMap {

    fullList                    =   canteenDB.default;
    initialList                 =   [];

    @State()
    filteredList                =   [];

    @State()
    moreLabel                   =   true;

    componentWillLoad() {
        this.initialList        =   [
            this.fullList[0],       // Thiruvottyur
            this.fullList[1],       // Thiruvottyur
            this.fullList[25],      // Manali
            this.fullList[26],      // Manali
            this.fullList[41],      // Madhavaram
            this.fullList[42],      // Madhavaram
            this.fullList[65],      // Tondiarpet
            this.fullList[66],      // Tondiarpet
            this.fullList[95],      // Royapuram
            this.fullList[96],      // Royapuram
            this.fullList[130],     // Thiruvika Nagar
            this.fullList[131],     // Thiruvika Nagar
            this.fullList[160],     // Ambattur
            this.fullList[161],     // Ambattur
            this.fullList[190],     // Shenoy Nagar
            this.fullList[191],     // Shenoy Nagar
            this.fullList[221],     // Nungambakkam
            this.fullList[222],     // Nungambakkam
            this.fullList[259],     // Kodambakkam
            this.fullList[260],     // Kodambakkam
            this.fullList[291],     // Valasaravakam
            this.fullList[292],     // Valasaravakam
            this.fullList[317],     // Alandur
            this.fullList[318],     // Alandur
            this.fullList[341],     // Perungudi
            this.fullList[342],     // Perungudi
            this.fullList[389],     // Sozhinganallur
            this.fullList[390],     // Sozhinganallur
        ];
        this.filteredList       =   [ ...this.initialList ];
        console.log(this.fullList);
        console.log(this.filteredList);
    }

    searchTermChanged(ev) {
        const searchTerm        =   ev.detail.value.toLowerCase();
        console.log(searchTerm);
        console.log(this);
        if ( searchTerm.length > 2 ) {
            this.filteredList   =   this.fullList.filter(canteen => {
                return canteen.zoneName.toLowerCase().includes(searchTerm) ||
                    canteen.address.toLowerCase().includes(searchTerm);
            });
            this.moreLabel      =   false;
        } else {
            this.filteredList   =   [ ...this.initialList ];
            this.moreLabel      =   true;
        }
    }


    nearbyClicked(ev) {
        alert('For phase 2');
    }

    render() {
        return [
            <ion-header>
                <ion-toolbar color="primary">
                    <ion-title> <h1> Amam Unavagam - Finder </h1> </ion-title>
                    <ion-buttons slot="secondary">
                        <ion-button fill="outline" onClick={ this.nearbyClicked.bind(this) }> List nearby </ion-button>
                        <ion-button fill="outline" href="/"> List view </ion-button>
                    </ion-buttons>
                </ion-toolbar>
                <ion-toolbar color="primary">
                    <ion-searchbar debounce={ 500 } onIonChange={ this.searchTermChanged.bind(this) }></ion-searchbar>
                </ion-toolbar>
            </ion-header>,

            <ion-content>
                <h2> Maps </h2>
            </ion-content>
        ];
    }

}
