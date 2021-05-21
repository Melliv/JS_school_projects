import { BaseService } from '../../services/base-service';
import { HttpClient } from "aurelia";
import { BloodTransfusion } from '../../domain/BloodTransfusion';
import { AppState } from '../../state/app-state';

export class BloodTransfusionIndex {
    private service: BaseService<BloodTransfusion> = 
        new BaseService<BloodTransfusion>("https://localhost:5051/api/v1/BloodTransfusion", 
        this.httpClient,
        this.state.token);

    
    private data: BloodTransfusion[] = [];

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