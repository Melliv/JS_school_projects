import { BaseService } from '../../services/base-service';
import { HttpClient } from "aurelia";
import { BloodDonate } from '../../domain/BloodDonate';
import { AppState } from '../../state/app-state';

export class BloodDonateIndex {
    private service: BaseService<BloodDonate> = 
        new BaseService<BloodDonate>("https://localhost:5051/api/v1/BloodDonate", 
        this.httpClient,
        this.state.token);

    
    private data: BloodDonate[] = [];

    constructor(protected httpClient: HttpClient, private state: AppState){
    }

    async attached() {
        console.log("attached");
        //console.log(this.state.token);

        let response = await this.service.getAll();

        if (response.data) {
            this.data = response.data;
        }
    }
}