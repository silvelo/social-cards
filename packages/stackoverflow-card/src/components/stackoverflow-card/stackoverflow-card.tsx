import { Component, Prop } from '@stencil/core';
import { IUser } from '../../utils/stackoverflow.interface';
import { StackoverflowService } from '../../utils/stackoverflow.service';

@Component({
  tag: 'swc-stackoverflow-card',
  styleUrl: 'stackoverflow-card.css',
  shadow: true
})
export class StackoverflowCard {
  @Prop() userId: string;
  user: IUser;
  dataService = StackoverflowService.getInstance();

  async componentWillLoad() {
    this.user = await this.dataService.getUser(this.userId);
  }

  render() {
    return [
      <a class="box" href={this.user.link}>
        <ion-grid>
          <ion-row justify-content-center>
            <ion-avatar>
              <img src={this.user.profile_image} alt="profile" />
            </ion-avatar>
          </ion-row>
          <ion-row justify-content-center>
            <h1>{this.user.display_name}</h1>
          </ion-row>
          <ion-row justify-content-center class="border-top">
            <div class="ion-text-center">
              <h5>Reputation</h5>
              <h6 class="reputation">{this.user.reputation}</h6>
            </div>
          </ion-row>
          <ion-row  class="border-top">
            {Object.keys(this.user.badge_counts).map(badge =>
              <ion-col class="ion-text-center">
                <span class={badge}>{this.user.badge_counts[badge]}</span>
              </ion-col>
            )}
          </ion-row>
        </ion-grid>
      </a>
    ];
  }
}

