import { BaseService } from '../../services/base-service';
import { HttpClient, IRouteViewModel   } from "aurelia";
import { BloodDonate } from '../../domain/BloodDonate';
import { AppState } from '../../state/app-state';
import { PageLoader } from '../../types/PageLoader';
import { EPageStatus } from '../../types/EPageStatus';


export class BloodDonateDetails implements IRouteViewModel {
    bloodDonate?: BloodDonate;

    pageLoader: PageLoader = { pageStatus: EPageStatus.Loading, statusCode: -1 };

    constructor(protected httpClient: HttpClient, private state: AppState){
    }

    async load(parameters: { id: string}){
        const result = await BaseService.get<BloodDonate>("/BloodDonate/" + parameters.id, this.state.token);

        if (result.ok && result.data) {
            this.pageLoader = { pageStatus: EPageStatus.OK, statusCode: 0 }

            this.bloodDonate = result.data;
        } else {
            this.pageLoader = { pageStatus: EPageStatus.Error, statusCode: result.statusCode }
        }

    }

}