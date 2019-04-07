var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html, customElement, property, css } from 'lit-element';
let GithubCard = class GithubCard extends LitElement {
    constructor() {
        super();
        this._apiUrl = "https://api.stackexchange.com/2.2/users/";
        this.stackexchangeUser = {};
        this.stars = 0;
        this.userId = '';
        this.change = false;
        this._getData();
    }
    static get styles() {
        return css `
            .avatar {
                max-width: 150px;
                max-height: 150px;
                min-width: 100px;
                min-height: 100px;
                border-radius: 50%;
            }

            .card {
                padding: 25px 0;
                box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
                display:flex;
                flex-direction: column;
                justify-content: space-around;
            }

            .card-header {
                display: flex;
                align-items: center;
                align-content: center;
                flex-direction: column;
            }

            .card-body {
                display: flex;
                flex-direction: row;
                align-items: center;
                align-content: center;
                justify-content: space-around;
                margin-top: 10px;
            }

            .data {
                display: flex;
                flex-direction: column;
                align-items: center;
                align-content: center;
                justify-content: space-around;
            }

            .data span {
                padding-top: 5px;
            }

            .svg-icon {
                width: 1em;
                height: 1em;
            }

                .svg-icon path,
                .svg-icon polygon,
                .svg-icon rect {
                fill: #4691f6;
            }

            .svg-icon circle {
                stroke: #4691f6;
                stroke-width: 1;
            }
            
            .badge {
                width: 18px;
                height: 12px;
                border-radius: 50%;
            }
            .gold {
                background-color: #ffd700 ;
            }

            .silver {
                background-color: #c0c0c0;
            }

            .bronze {
                background-color: #cd7f32;
            }
        `;
    }
    render() {
        if (Object.keys(this.stackexchangeUser).length !== 0) {
            return html `
            <div class="card" @click="${this._navigate}">
                <div class="card-header">
                    <img src="${this.stackexchangeUser.profile_image}" class="avatar" alt="Avatar">
                    <h2>${this.stackexchangeUser.display_name}</h2>
                </div>
            
                <div class="card-body">
                    <div class="data">
                        ${this.stackexchangeUser.reputation}
                        <strong>Reputation</strong>
                    </div>
                </div>
                <div class="card-body">
                    ${this._getObjectPair().map(badge => {
                return html `
                    <div class="data">
                        <span class="badge ${badge.key}"></span>
                        <strong>${badge.value}</strong>
                    </div>
                    `;
            })}
                </div>
            </div>
            `;
        }
        else {
            return html `<p>Loading...</p>`;
        }
    }
    _getObjectPair() {
        const badge_counts = this.stackexchangeUser.badge_counts;
        let keys = Object.keys(badge_counts);
        let values = Object.values(badge_counts);
        return keys.map((key, index) => ({ key, value: values[index] }));
    }
    _navigate() {
        window.open(this.stackexchangeUser.link, "blank");
    }
    async _getData() {
        await this.updateComplete;
        try {
            const params = new URLSearchParams();
            params.set('site', 'stackoverflow');
            let response = await fetch(`${this._apiUrl}${this.userId}?${params.toString()}`);
            const data = await response.json();
            this.stackexchangeUser = data.items[0];
            this.change = !this.change;
        }
        catch (error) {
            console.error('Error:', error);
        }
    }
};
__decorate([
    property({ type: String })
], GithubCard.prototype, "userId", void 0);
__decorate([
    property({ type: Boolean })
], GithubCard.prototype, "change", void 0);
GithubCard = __decorate([
    customElement('stackoverflow-card')
], GithubCard);
export { GithubCard };
//# sourceMappingURL=stackoverflow-card.js.map