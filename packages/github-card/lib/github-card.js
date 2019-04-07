var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html, customElement, property, css } from 'lit-element';
import './github-card-classes';
let GithubCard = class GithubCard extends LitElement {
    constructor() {
        super();
        this._apiUrl = "https://api.github.com/users/";
        this.githubUser = {};
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
        `;
    }
    render() {
        if (Object.keys(this.githubUser).length !== 0) {
            return html `
            <style is="custom-style" include="github-card"></style>

            <div class="card" @click="${this._navigate}">
                <div class="card-header">
                    <img src="${this.githubUser.avatar_url}" class="avatar" alt="Avatar">
                    <h2>${this.githubUser.login}</h2>
                </div>
            
                <div class="card-body">
                    <div class="data">
                        <strong>Followers</strong>
                        <span>${this.githubUser.followers}</span>
                    </div>
                    <div class="data">
                        <strong>Repos</strong>
                        <span>${this.githubUser.public_repos}</span>
                    </div>
                    <div class="data">
                        <strong>Stars</strong>
                        <span>${this.stars}</span>
                    </div>
                </div>
            </div>
            `;
        }
        else {
            return html `<p>Loading...</p>`;
        }
    }
    _navigate() {
        window.open(this.githubUser.html_url, "blank");
    }
    async _getData() {
        await this.updateComplete;
        try {
            await this._getStarts();
            let response = await fetch(`${this._apiUrl}${this.userId}`);
            this.githubUser = await response.json();
            this.change = !this.change;
        }
        catch (error) {
            console.error('Error:', error);
        }
    }
    async _getStarts() {
        let response = await fetch(`${this._apiUrl}${this.userId}/repos`);
        let data = await response.json();
        this.stars = data.reduce((previous, current) => previous + current.stargazers_count, 0);
    }
};
__decorate([
    property({ type: String })
], GithubCard.prototype, "userId", void 0);
__decorate([
    property({ type: Boolean })
], GithubCard.prototype, "change", void 0);
GithubCard = __decorate([
    customElement('github-card')
], GithubCard);
export { GithubCard };
//# sourceMappingURL=github-card.js.map