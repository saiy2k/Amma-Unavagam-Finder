import { Component, h       }   from    '@stencil/core';
import { State              }   from    '@stencil/core';
import * as canteenDB from '../db';
//import * as canteenDB from '../dbmini';

@Component({
    tag: 'app-home',
    styleUrl: 'app-home.css'
})
export class AppHome {

    fullList                    =   canteenDB.default;

    @State()
    filteredList                =   [];

    componentWillLoad() {
        this.filteredList       =   this.fullList.slice(0, 30);
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
        } else {
            this.filteredList   =   this.fullList.slice(0, 30);
        }
    }

    render() {
        return [
            <ion-header>
                <ion-toolbar color="primary">
                    <ion-title>Amam Unavagam</ion-title>
                </ion-toolbar>
                <ion-toolbar color="primary">
                    <ion-searchbar debounce={ 500 } onIonChange={ this.searchTermChanged.bind(this) }></ion-searchbar>
                </ion-toolbar>
            </ion-header>,

            <ion-content class="ion-padding">

                { this.filteredList.length > 0 ? this.filteredList.map((canteen, index) =>
                    <ion-card>
                        <ion-card-header>
                            <ion-card-title> { canteen.zoneName + ' - ' + (index + 1) } </ion-card-title>
                        </ion-card-header>

                        <ion-card-content>
                            { canteen.address }
                            <br/>
                            <ion-button href={canteen.mapLocation} target="_blank" rel="noopener" fill="outline" slot="end">View in maps</ion-button>
                        </ion-card-content>
                    </ion-card>
                    ) :
                    <h2 class='center-text empty-message'>
                        No results. Refine your search
                    </h2>
                }

                { this.filteredList.length > 0 ?
                    <h2 class='center-text'>
                        Search to see more canteens
                    </h2> :
                    <h2>
                    </h2>


                }

            </ion-content>
        ];
    }
}
