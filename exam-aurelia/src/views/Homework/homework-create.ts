import { BaseService } from '../../services/base-service';
import { HttpClient, IRouteViewModel } from "aurelia";
import { AppState } from '../../state/app-state';
import { EPageStatus } from '../../types/EPageStatus';
import { PageLoader } from '../../types/PageLoader';
import { IRouter } from 'aurelia-direct-router';

import { Homework } from '../../domain/DTO/Homework';
import { Subject } from '../../domain/DTO/Subject';
import { HomeworkErrors } from '../../domain/errors/HomeworkErrors';
import { IFetchResponse } from '../../types/IFetchResponse';
import { AppUser } from '../../domain/DTO/AppUser';

export class HomeworkCreate {
    errors: HomeworkErrors = new HomeworkErrors();
    pageLoader: PageLoader = { pageStatus: EPageStatus.Loading, statusCode: -1 };

    homework: Homework = new Homework();
    subjects: Subject[] = [];

    edit: boolean = false;
    id?: string;

    constructor(
        protected httpClient: HttpClient, 
        private appState: AppState,
        @IRouter private router: IRouter) {
    }

    async load(parameters: { id: string }) {
        if (this.appState.role == "") {
            await this.router.load("/home");
        }

        if (parameters.id) {
            this.edit = true;
            this.id = parameters.id;
            const result = await BaseService.get<Homework>("Homework/" + parameters.id, this.appState.token);

            if (result.ok && result.data) {
                this.pageLoader = { pageStatus: EPageStatus.OK, statusCode: 0 };

                console.log(result.data);
                this.homework = result.data;
            } else {
                this.pageLoader = { pageStatus: EPageStatus.Error, statusCode: result.statusCode };
            }
        } else {
            const result = await BaseService.get<AppUser>("/User/getMyAppUser" , this.appState.token);

            if (result.ok && result.data) {
                this.pageLoader = { pageStatus: EPageStatus.OK, statusCode: 0 }
    
                this.homework.personId = result.data.id.toString();
            } else {
                this.pageLoader = {
                    pageStatus: EPageStatus.Error,
                    statusCode: result.statusCode
                }
            }
        }
        
    }

    async attached(): Promise<void> {
        if (this.appState.role != "Admin" && this.appState.role != "Teacher") {
            await this.router.load("/home");
        }

        const result = await BaseService.getAll<Subject>("/Subject" , this.appState.token);

        if (result.ok && result.data) {
            this.pageLoader = { pageStatus: EPageStatus.OK, statusCode: 0 }

            this.subjects = result.data;
        } else {
            this.pageLoader = {
                pageStatus: EPageStatus.Error,
                statusCode: result.statusCode
            }
        }

    }

    async create(event: Event) {
        event.preventDefault();
        event.stopPropagation();

        if (!this.handleValidation()) {
            return;
        }
        
        const response = (this.edit)
            ? await BaseService.put<Subject>("Homework/" + this.id, this.homework, this.appState.token)
            : await BaseService.post<Subject>("Homework", this.homework, this.appState.token);

        if (!response.ok) {
            this.errors.generalError.message = response.messages
        } else if (response.data != null) {
            await this.router.load("/Homework/" + ((this.id) ? this.id : response.data.id));
        }
    }

    handleValidation(): boolean {
        let formIsValid = true;

        this.errors = new HomeworkErrors();

        if (!this.homework.name) {
            this.errors.name.message = "Homework name can not be empty!";
            formIsValid = false;
        }

/*         if (!this.homework.maxPoints) {
            this.errors.maxPoints.message = "Insert max points value!";
            formIsValid = false;
        } */

        if (!this.homework.subjectId) {
            this.errors.subject.message = "Subject can not be empty!";
            formIsValid = false;
        }

        if (!this.homework.personId) {
            this.errors.person.message = "Person can not be empty!";
            formIsValid = false;
        }

        return formIsValid;
    }

}