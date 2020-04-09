import { Component, h       }   from    '@stencil/core';
import { State              }   from    '@stencil/core';
import * as canteenDB from '../db';
//import * as canteenDB from '../dbmini';

@Component({
    tag: 'app-home',
    styleUrl: 'app-home.css'
})
export class AppHome {

    //private infiniteScroll      :   any;
    //private loadMoreButton      :   any;
    private pagesToShow         =   0;
    private pageSize            =   10;
    private fullList            =   canteenDB.default;
    private filteredList        =   [];
    @State() renderList         =   [];

    componentWillLoad() {
        this.filteredList       =   [ ...this.fullList ];
        this.addPageToRenderList(++this.pagesToShow);
    }

    componentDidLoad() {


        /*
        this.infiniteScroll = document.getElementById('infinite-scroll');
        console.log(this.infiniteScroll);

        this.infiniteScroll.addEventListener('ionInfinite', (event) => {
            console.log('ionInfinite 1');
            setTimeout(() => {
                console.log('ionInfinite 2');
                this.addPageToRenderList(++this.pagesToShow);
                if (this.renderList.length >= this.filteredList.length) {
                    event.target.disabled = true;
                }
                event.target.complete();
            }, 300);
        });
         */
    }

    loadMoreTapped() {
        if (this.filteredList.length === this.renderList.length) {
            const toast = document.createElement('ion-toast');
            toast.message = 'No more data to be shown';
            toast.duration = 2000;

            document.body.appendChild(toast);
            return toast.present();
        } else {
            this.addPageToRenderList(++this.pagesToShow);
        }
    }

    addPageToRenderList(pageNo) {
        this.renderList         =   this.renderList.concat(this.filteredList.slice((pageNo - 1) * this.pageSize, pageNo * this.pageSize));
    }

    searchTermChanged(ev) {
        const searchTerm        =   ev.detail.value.toLowerCase();
        if ( searchTerm.length > 2 ) {
            this.filteredList   =   this.fullList.filter(canteen => {
                return canteen.zoneName.toLowerCase().includes(searchTerm) ||
                    canteen.address.toLowerCase().includes(searchTerm);
            });
        } else {
            this.filteredList   =   [ ...this.fullList ];
        }
        this.renderList         =   [];
        this.pagesToShow        =   1;
        this.addPageToRenderList(this.pagesToShow);
        //this.infiniteScroll.disabled = false;
        console.log(this.filteredList.length, this.renderList.length);
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

                { this.renderList.length > 0 ? this.renderList.map((canteen, index) =>
                    <canteen-card index={ index } canteen={ canteen }></canteen-card>
                    ) :
                    <h2 class='center-text empty-message'>
                        No Amma Unavagam found in the location you searched for.
                    </h2>
                }

                <center>
                    <ion-button id="load-more-button" fill="outline" onClick={ this.loadMoreTapped.bind(this) }> Load more </ion-button>
                </center>
                { /*
                <ion-infinite-scroll threshold="100px" id="infinite-scroll">
                    <ion-infinite-scroll-content
                        loading-spinner="bubbles"
                        loading-text="Loading more data...">
                    </ion-infinite-scroll-content>
                </ion-infinite-scroll>
                   */ }

                <h6 class="center-text"> Amma Unavagam - Finder. Chennai, India. </h6>

            </ion-content>

        ];
    }
}
