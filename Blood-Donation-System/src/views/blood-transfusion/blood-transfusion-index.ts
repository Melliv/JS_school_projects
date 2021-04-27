import { BaseService } from '../../services/base-service';
import { HttpClient } from "aurelia";
import { IBloodTransfusion } from '../../domain/IBloodTransfusion';
import { AppState } from '../../state/app-state';

export class BloodTransfusionIndex {
    private service: BaseService<IBloodTransfusion> = 
        new BaseService<IBloodTransfusion>("https://localhost:5051/api/v1/BloodTransfusion", 
        this.httpClient,
        this.state.token);

    
    private data: IBloodTransfusion[] = [];

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