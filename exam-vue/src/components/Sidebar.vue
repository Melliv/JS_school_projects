<template>
    <ul
        class="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion"
        id="accordionSidebar"
    >
        <!-- Sidebar - Brand -->
        <router-link
            class="sidebar-brand d-flex align-items-center justify-content-center"
            asp-area=""
            asp-controller="Home"
            asp-action="Index"
            to="/"
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                fill="currentColor"
                class="bi bi-droplet-fill"
                viewBox="0 0 16 16"
            >
                <path
                    fill-rule="evenodd"
                    d="M8 16a6 6 0 0 0 6-6c0-1.655-1.122-2.904-2.432-4.362C10.254 4.176 8.75 2.503 8 0c0 0-6 5.686-6 10a6 6 0 0 0 6 6zM6.646 4.646c-.376.377-1.272 1.489-2.093 3.13l.894.448c.78-1.559 1.616-2.58 1.907-2.87l-.708-.708z"
                />
            </svg>
            <div class="sidebar-brand-text mx-3">BloodCenter</div>
        </router-link>

        <!-- Divider -->
        <hr class="sidebar-divider" />

        <!-- Heading -->
        <div class="sidebar-heading">General</div>

        <!-- Nav Item - Pages Collapse Menu -->

        <li class="nav-item">
            <a class="nav-link">
                <i class="fas fa-fw fa-chart-area"></i>
                <span>BloodBank</span>
            </a>
        </li>

        <li class="nav-item">
            <a
                class="nav-link collapsed"
                href="#"
                data-toggle="collapse"
                data-target="#collapseOne"
                aria-expanded="true"
                aria-controls="collapseOne"
            >
                <i class="fas fa-fw fa-cog"></i>
                <span>Persons</span>
            </a>
            <div
                id="collapseOne"
                class="collapse"
                aria-labelledby="headingOne"
                data-parent="#accordionSidebar"
            >
                <div class="bg-white py-2 collapse-inner rounded">
                    <h6 class="collapse-header">Activities:</h6>
                    <a
                        class="collapse-item"
                        asp-area=""
                        asp-controller="Persons"
                        asp-action="Index"
                        >Persons</a
                    >
                    <a
                        class="collapse-item"
                        asp-area=""
                        asp-controller="Persons"
                        asp-action="Create"
                        >Register</a
                    >
                </div>
            </div>
        </li>

        <!-- Divider -->
        <hr class="sidebar-divider" />

        <!-- Heading -->
        <div class="sidebar-heading">Activities</div>

        <li class="nav-item">
            <a
                class="nav-link collapsed"
                href="#"
                data-toggle="collapse"
                data-target="#collapseThree"
                aria-expanded="true"
                aria-controls="collapseThree"
            >
                <i class="fas fa-fw fa-cog"></i>
                <span>Blood Donation</span>
            </a>
            <div
                id="collapseThree"
                class="collapse"
                aria-labelledby="headingThree"
                data-parent="#accordionSidebar"
            >
                <div class="bg-white py-2 collapse-inner rounded">
                    <h6 class="collapse-header">Activities:</h6>
                    <router-link class="nav-link text-dark" to="/blooddonate"
                        >Donations</router-link
                    >
                    <router-link
                        class="nav-link text-dark"
                        to="/blooddonate/Create"
                        >Create</router-link
                    >
                </div>
            </div>
        </li>
    </ul>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";

@Options({
    components: {},
    props: {},
})
export default class Sidebar extends Vue {}
</script>
