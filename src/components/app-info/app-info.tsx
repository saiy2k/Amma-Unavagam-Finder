import { Component, h } from '@stencil/core';

@Component({
    tag: 'app-info',
    styleUrl: 'app-info.css',
})
export class AppInfo {

    render() {
        return [
            <ion-header>
                <ion-toolbar color="primary">
                    <ion-buttons slot="start">
                        <ion-back-button defaultHref="/" />
                    </ion-buttons>
                    <ion-title> <h1> Contact us - Amma Unavagam in Chennai </h1> </ion-title>
                </ion-toolbar>
            </ion-header>,

            <ion-content class="ion-padding">
                <p class="center-text">
                    For any feedback, reach out to us at
                    <h5> Saiyasodharan, <a href="https://www.gethugames.in/" target="_blank"> Gethu Games </a> </h5>
                    <h5> <a href="tel://+919952998132"> +919952998132 </a> </h5>
                    <h5> <a href="mailto:support@gethugames.in?Subject=Enquiry regarding Amma Unavagam - Finder"> support@gethugames.in </a> </h5>
                    v0.1.0
                </p>
            </ion-content>
        ];
    }

}
