import { Component, h       }   from    '@stencil/core';
import { State              }   from    '@stencil/core';
import * as canteenDB from '../db';
//import * as canteenDB from '../dbmini';

@Component({
    tag: 'app-home',
    styleUrl: 'app-home.css'
})
export class AppHome {

    private fullList            =   canteenDB.default;
    private initialList         =   [];

    @State() filteredList       =   [];
    @State() moreLabel          =   true;

    componentWillLoad() {
        const indices           =   [0, 25, 41, 65, 95, 130, 160, 190, 221, 259, 291, 317, 341, 389];
        indices.forEach(i => {
            this.initialList.push(this.fullList[i]);
            this.initialList.push(this.fullList[i + 1]);
        });
        this.filteredList       =   [ ...this.initialList ];
    }

    searchTermChanged(ev) {
        const searchTerm        =   ev.detail.value.toLowerCase();
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

    nearbyClicked() {
        alert('For phase 2');
    }

    render() {
        return [
            <ion-header>
                <ion-toolbar color="primary">
                    <ion-title> <h1> Amma Unavagam in Chennai</h1> </ion-title>
                    <ion-buttons slot="secondary">
                        {/*
                        <ion-button fill="outline" onClick={ this.nearbyClicked.bind(this) }> List nearby </ion-button>
                        <ion-button fill="outline" href="/map"> Map view </ion-button>
                          */}
                        <ion-button fill="outline" href="/contact-us">
                            <ion-icon slot="icon-only" name="information-outline"></ion-icon>
                        </ion-button>
                    </ion-buttons>
                </ion-toolbar>
                <ion-toolbar color="primary">
                    <ion-searchbar debounce={ 500 } onIonChange={ this.searchTermChanged.bind(this) }></ion-searchbar>
                </ion-toolbar>
            </ion-header>,

            <ion-content class="ion-padding">

                { this.filteredList.length > 0 ? this.filteredList.map((canteen, index) =>
                    <canteen-card index={ index } canteen={ canteen }></canteen-card>
                    ) :
                    <h2 class='center-text empty-message'>
                        No Amma Unavagam found in the location you searched for.
                    </h2>
                }

                { this.moreLabel ?
                    <h4 class='center-text'>
                        More relevant canteens will appear as you search
                    </h4> :
                    <h2>
                    </h2>
                }

                <h6 class="center-text"> Amma Unavagam - Finder. Chennai, India. </h6>

            </ion-content>
        ];
    }
}
