import { BaseService } from '../../services/base-service';
import { HttpClient } from "aurelia";
import { BloodDonate } from '../../domain/BloodDonate';
import { Person } from '../../domain/Person';
import { BloodTest } from '../../domain/BloodTest';
import { AppState } from '../../state/app-state';
import { EPageStatus } from '../../types/EPageStatus';
import { PageLoader } from '../../types/PageLoader';
import { IRouter } from 'aurelia-direct-router';
import { BloodDonateErrors } from '../../domain/errors/BloodDonateErrors';

export class BloodDonateCreate {
    errors: BloodDonateErrors = new BloodDonateErrors();
    pageLoader: PageLoader = { pageStatus: EPageStatus.Loading, statusCode: -1 };

    bloodDonate: BloodDonate = new BloodDonate();
    patients: Person[] = [];
    doctors: Person[] = [];
    bloodTests: BloodTest[] = [];

    constructor(protected httpClient: HttpClient, private state: AppState, @IRouter private router: IRouter,){
    }

    async attached(): Promise<void> {
        const resultPatients = await BaseService.getAll<Person>("/Persons", this.state.token);
        const resultDoctors = await BaseService.getAll<Person>("/Persons/personType=doctor", this.state.token);
        const resultBloodTests = await BaseService.getAll<BloodTest>("/BloodTest/minimum", this.state.token);

        if (resultPatients.ok && resultPatients.data &&
            resultDoctors.ok && resultDoctors.data &&
            resultBloodTests.ok && resultBloodTests.data) {
            this.pageLoader = { pageStatus: EPageStatus.OK, statusCode: 0 }

            this.patients = resultPatients.data;
            this.doctors = resultDoctors.data;
            this.bloodTests = resultBloodTests.data;
        } else {
            this.pageLoader = {
                pageStatus: EPageStatus.Error,
                statusCode: (!resultPatients.ok ? resultPatients
                    : !resultDoctors.ok ? resultDoctors
                        : resultBloodTests).statusCode
            }
        }

    }

    async create() {
        if (!this.handleValidation()) {
            return;
        }

        const response = await BaseService.post<BloodDonate>("BloodDonate", this.bloodDonate, this.state.token);
        if (response.ok != null && response.messages != null) {
            this.errors.generalError.message = response.messages
        } else if (response.data != null) {
            await this.router.load("blooddonate/" + response.data.id);
        }
    }

    handleValidation(): boolean {
        let formIsValid = true;

        this.errors = new BloodDonateErrors();

        if (!this.bloodDonate.amount || this.bloodDonate.amount === "0") {
            this.errors.amount.message = "Amount can not be 0!";
            formIsValid = false;
        }

        if (!this.bloodDonate.donorId) {
            this.errors.donor.message = "Donor field can not be empty!";
            formIsValid = false;
        }

        if (!this.bloodDonate.doctorId) {
            this.errors.doctor.message = "Doctor field can not be empty!";
            formIsValid = false;
        }

        if (!this.bloodDonate.bloodTestId) {
            this.errors.bloodTest.message = "bloodTest field can not be empty!";
            formIsValid = false;
        }

        return formIsValid;
    }

}