import { Component, h } from '@stencil/core';
import * as canteenList from '../db';

@Component({
    tag: 'app-home',
    styleUrl: 'app-home.css'
})
export class AppHome {

    componentDidLoad() {
        console.log(canteenList);
    }

    render() {
        return [
            <ion-header>
                <ion-toolbar color="primary">
                    <ion-title>Amam Unavagam</ion-title>
               </ion-toolbar>
            </ion-header>,

            <ion-content class="ion-padding">

                <ion-segment value="listing">
                    <ion-segment-button value="listing">
                        <ion-label>Listing</ion-label>
                    </ion-segment-button>
                    <ion-segment-button value="map">
                        <ion-label>Map</ion-label>
                    </ion-segment-button>
                </ion-segment>

                <p>
                    Welcome to the PWA Toolkit. You can use this starter to build entire
                    apps with web components using Stencil and ionic/core! Check out the
                    README for everything that comes in this starter out of the box and
                    check out our docs on <a href="https://stenciljs.com">stenciljs.com</a> to get started.
                </p>

                <ion-button href="/profile/ionic" expand="block">Profile page</ion-button>
            </ion-content>
        ];
    }
}
