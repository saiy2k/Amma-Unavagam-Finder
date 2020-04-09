import { Component, h } from '@stencil/core';
import { Listen } from '@stencil/core';

declare var HTMLIonToastControllerElement: any;

@Component({
    tag: 'app-root',
    styleUrl: 'app-root.css'
})
export class AppRoot {

    @Listen("swUpdate", { target: 'window' })
    async onSWUpdate() {
        const registration = await navigator.serviceWorker.getRegistration();

        if (!registration || !registration.waiting) {
            // If there is no registration, this is the first service
            // worker to be installed. registration.waiting is the one
            // waiting to be activiated.
            return;
        }

        const toast = document.createElement('ion-toast');
        toast.message = 'New version available';
        toast.buttons = [{
            text: 'Update',
            role: 'cancel',
            handler: () => {
                console.log('Cancel clicked');
            }
        }];
        toast.duration = 5000;

        document.body.appendChild(toast);
        await toast.present();
        await toast.onWillDismiss();

        registration.waiting.postMessage("skipWaiting");
        window.location.reload();
    }

    render() {
        return (
            <ion-app>
                <ion-router useHash={false}>
                    <ion-route url="/" component="app-home" />
                    <ion-route url="/profile/:name" component="app-profile" />
                    <ion-route url="/map" component="app-map" />
                    <ion-route url="/contact-us" component="app-info" />
                </ion-router>
                <ion-nav />
            </ion-app>
        );
    }
}
