import { BaseService } from '../../services/base-service';
import { HttpClient } from "aurelia";
import { BloodDonate } from '../../domain/BloodDonate';
import { AppState } from '../../state/app-state';
import { EPageStatus } from '../../types/EPageStatus';
import { PageLoader } from '../../types/PageLoader';

export class BloodDonateIndex {
    private bloodDonates: BloodDonate[] = [];

    pageLoader: PageLoader = { pageStatus: EPageStatus.Loading, statusCode: -1 };

    constructor(protected httpClient: HttpClient, private state: AppState){
    }

    async attached() {
        const result = await BaseService.getAll<BloodDonate>("/BloodDonate", this.state.token);

        if (result.ok && result.data) {
            this.pageLoader = { pageStatus: EPageStatus.OK, statusCode: 0 };

            this.bloodDonates = result.data;
        } else {
            this.pageLoader = { pageStatus: EPageStatus.Error, statusCode: result.statusCode };
        }

    }
}