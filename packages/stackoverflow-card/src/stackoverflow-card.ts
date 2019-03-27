import {
    LitElement, html, customElement, property, css
} from 'lit-element';

@customElement('stackoverflow-card')
export class GithubCard extends LitElement {
    @property({ type: String }) userId: string;
    @property({ type: Boolean }) change: boolean;

    private _apiUrl = "https://api.stackexchange.com/2.2/users/";
    private stackexchangeUser = {} as StackexchangeUser;
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
            return html`
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
                        return html`
                    <div class="data">
                        <span class="badge ${badge.key}"></span>
                        <strong>${badge.value}</strong>
                    </div>
                    `
                    })}
                </div>
            </div>
            `
        } else {
            return html`<p>Loading...</p>`
        }
    }
    private _getObjectPair() {
        const badge_counts =  this.stackexchangeUser.badge_counts;
        let keys = Object.keys(badge_counts);
        let values = Object.values(badge_counts);
        return keys.map((key, index) => ( { key, value: values[index] } ) )        
    }

    private _navigate() {
        window.open(this.stackexchangeUser.link, "blank");
    }

    private async _getData() {
        await this.updateComplete;
        try {
            const params = new URLSearchParams();
            params.set('site', 'stackoverflow');
            let response = await fetch(`${this._apiUrl}${this.userId}?${params.toString()}`);
            const data = await response.json() as StackexchangeResponse;
            this.stackexchangeUser = data.items[0];
            this.change = !this.change;
        } catch (error) {
            console.error('Error:', error);
        }
    }
}

export interface BadgeCount {
    bronze: number;
    silver: number;
    gold: number;
}

export interface StackexchangeUser {
    badge_counts: BadgeCount;
    view_count: number;
    down_vote_count: number;
    up_vote_count: number;
    answer_count: number;
    question_count: number;
    account_id: number;
    is_employee: boolean;
    last_modified_date: number;
    last_access_date: number;
    reputation_change_year: number;
    reputation_change_quarter: number;
    reputation_change_month: number;
    reputation_change_week: number;
    reputation_change_day: number;
    reputation: number;
    creation_date: number;
    user_type: string;
    user_id: number;
    accept_rate: number;
    about_me: string;
    location: string;
    website_url: string;
    link: string;
    profile_image: string;
    display_name: string;
}

export interface StackexchangeResponse {
    items: StackexchangeUser[];
    has_more: boolean;
    quota_max: number;
    quota_remaining: number;
}