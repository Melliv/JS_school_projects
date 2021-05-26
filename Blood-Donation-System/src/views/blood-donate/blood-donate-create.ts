import { BaseService } from '../../services/base-service';
import { HttpClient, IRouteViewModel   } from "aurelia";
import { BloodDonate } from '../../domain/BloodDonate';
import { Person } from '../../domain/Person';
import { BloodTest } from '../../domain/BloodTest';
import { AppState } from '../../state/app-state';
import { IRouter } from 'aurelia-direct-router';

// import { view   } from "aurelia-direct-router";


export class BloodDonateCreate {
    private service: BaseService<BloodDonate> = 
        new BaseService<BloodDonate>("BloodDonate", 
        this.httpClient,
        this.state.token);
    
    private bloodDonate: BloodDonate = {
        id: "00000000-0000-0000-0000-000000000000",
        createdBy: "-",
        createAt: "0001-01-01T00:00:00",
        updateBy: "-",
        updatedAt: "0001-01-01T00:00:00",
        donorId: "",
        donor: null,
        doctorId: "",
        doctor: null,
        bloodTestId: "",
        blootest: null,
        bloodGroupId: "00000000-0000-0000-0000-000000000000",
        bloodGroup: null,
        amount: 0,
        available: false,
        expireDate: "0001-01-01T00:00:00",
    };

    patients: Person[] = [];
    doctors: Person[] = [];
    bloodTests: BloodTest[] = [];

    constructor(protected httpClient: HttpClient, private state: AppState, @IRouter private router: IRouter,){
    }

    async attached() {

        let servicePerson: BaseService<Person> = 
            new BaseService<Person>("Persons", 
            this.httpClient,
            this.state.token);

        let serviceBloodTest: BaseService<BloodTest> = 
            new BaseService<BloodTest>("BloodTest/minimum", 
            this.httpClient,
            this.state.token);

        let responsePatients = await servicePerson.getAll();
        let responseDoctors = await servicePerson.getAll(["personType=doctor"]);
        let responseBloodTests = await serviceBloodTest.getAll();


        if (responsePatients.data && responseDoctors.data && responseBloodTests.data) {
            this.patients = responsePatients.data;
            this.doctors = responseDoctors.data;
            this.bloodTests = responseBloodTests.data;
        }
    }

    async create() {
        console.log(this.bloodDonate);
        let response = await this.service.post(this.bloodDonate);
        console.log(response);
        await this.router.load("blooddonate/" + response.data.id);
    }

}