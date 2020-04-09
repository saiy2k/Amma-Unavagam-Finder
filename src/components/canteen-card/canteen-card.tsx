import { Component, h       }   from    '@stencil/core';
import { Prop               }   from    '@stencil/core';

@Component({
    tag                         :   'canteen-card',
    styleUrl                    :   'canteen-card.css',
})
export class CanteenCard {

    @Prop() index               :   number;
    @Prop() canteen             :   any;

    render() {
        return (
            <ion-card>
                <ion-card-header>
                    <ion-card-title> { this.canteen.zoneName + ' - ' + (this.index + 1) } </ion-card-title>
                </ion-card-header>

                <ion-card-content>
                    { this.canteen.address }
                    <br/>
                    <ion-button href={this.canteen.mapLocation} target="_blank" rel="noopener" fill="outline" slot="end">Get Directions</ion-button>
                </ion-card-content>
            </ion-card>
        );
    }

}
