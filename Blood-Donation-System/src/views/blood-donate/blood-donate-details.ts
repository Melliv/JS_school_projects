import { BaseService } from '../../services/base-service';
import { HttpClient, IRouteViewModel   } from "aurelia";
import { BloodDonate } from '../../domain/BloodDonate';
import { AppState } from '../../state/app-state';
// import { view   } from "aurelia-direct-router";


export class BloodDonateDetails implements IRouteViewModel {
    private service: BaseService<BloodDonate> = 
        new BaseService<BloodDonate>("https://localhost:5051/api/v1/BloodDonate", 
        this.httpClient,
        this.state.token);

    
    private bloodDonate?: BloodDonate;

    constructor(protected httpClient: HttpClient, private state: AppState){
    }

    async load(parameters){
        let response = await this.service.get(parameters);
        if (response.data) {
            this.bloodDonate = response.data;
        }
    }

}