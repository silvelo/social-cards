import {
    LitElement, html, customElement, property, css
} from 'lit-element';
import './github-card-classes';

@customElement('github-card')
export class GithubCard extends LitElement {
    @property({ type: String }) userId: string;
    @property({ type: Boolean }) change: boolean;

    private _apiUrl = "https://api.github.com/users/";
    private githubUser = {} as GithubResponse;
    private stars = 0;
    constructor() {
        super();
        this.userId = '';
        this.change = false;
        this._getData();
    }

    static get styles() {
        return css`
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
            return html`
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
            `
        } else {
            return html`<p>Loading...</p>`
        }
    }

    private _navigate() {
        window.open(this.githubUser.html_url, "blank");
    }

    private async _getData() {
        await this.updateComplete;
        try {
            await this._getStarts()
            let response = await fetch(`${this._apiUrl}${this.userId}`);
            this.githubUser = await response.json() as GithubResponse;
            this.change = !this.change;
        } catch (error) {
            console.error('Error:', error);
        }
    }

        private async _getStarts() {
            let response = await fetch(`${this._apiUrl}${this.userId}/repos`);
            let data = await response.json() as any[];
            this.stars = data.reduce(
                (previous, current) => previous + current.stargazers_count, 0
            )
    
        }

}

export interface GithubResponse {
    login: string;
    id: number;
    node_id: string;
    avatar_url: string;
    gravatar_id: string;
    url: string;
    html_url: string;
    followers_url: string;
    following_url: string;
    gists_url: string;
    starred_url: string;
    subscriptions_url: string;
    organizations_url: string;
    repos_url: string;
    events_url: string;
    received_events_url: string;
    type: string;
    site_admin: boolean;
    name: string;
    company: string;
    blog: string;
    location: string;
    email: string;
    hireable: boolean;
    bio: string;
    public_repos: number;
    public_gists: number;
    followers: number;
    following: number;
    created_at: string;
    updated_at: string;
}

