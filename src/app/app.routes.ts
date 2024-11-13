import { Routes } from "@angular/router";

import { initialDataResolver } from "@app/app.resolvers";

import { authGuard } from "@core/guards/auth.guard";
import { noAuthGuard } from "@core/guards/no-auth.guard";

import { LayoutComponent } from "@layouts/layout.component";

import { Error404Component } from "@features/error/pages/error-404/error-404.component";
import { LogoutComponent } from "@features/logout/logout.component";

export const routes: Routes = [
  { path: "", pathMatch: "full", redirectTo: "" },
  {
    path: "",
    resolve: {
      initialData: initialDataResolver,
    },
    component: LayoutComponent,
    children: [
      {
        path: "faqs",
        loadChildren: () => import("../app/features/faq/faq.routes"),
      },
      {
        path: "",
        loadChildren: () =>
          import("@features/home/home.module").then(m => m.HomeModule),
      },
      {
        path: "blog",
        loadChildren: () => import("@features/blog/blog.routes"),
      },
      {
        path: "properties",
        loadChildren: () => import("@features/property/property.routes"),
      },
      {
        path: "about-us",
        loadChildren: () => import("@features/about-us/about-us.routes"),
      },
      {
        path: "contact-us",
        loadChildren: () => import("@features/contact-us/contact-us.routes"),
      },
      {
        path: "how-to-use",
        loadChildren: () => import("@features/how-to-use/how-to-use.routes"),
      },
      {
        path: "white-paper",
        loadChildren: () => import("@features/white-paper/white-paper.routes"),
      },
      {
        path: "terms-of-use",
        loadChildren: () =>
          import("@features/terms-of-use/terms-of-use.routes"),
      },
      {
        path: "privacy-policy",
        loadChildren: () =>
          import("@features/privacy-policy/privacy-policy.routes"),
      },
      {
        path: "cookie-policy",
        loadChildren: () =>
          import("@features/cookie-policy/cookie-policy.routes"),
      },
      {
        path: "reset-password/:token",
        loadChildren: () =>
          import("@features/auth/pages/reset-password/reset-password.routes"),
      },
    ],
  },
  {
    path: "",
    canActivate: [noAuthGuard],
    canActivateChild: [noAuthGuard],
    resolve: {
      initialData: initialDataResolver,
    },
    component: LayoutComponent,
    children: [
      {
        path: "sign-in",
        loadChildren: () =>
          import("@features/auth/pages/sign-in/sign-in.routes"),
      },
      {
        path: "sign-up",
        loadChildren: () =>
          import("@features/auth/pages/sign-up/sign-up.routes"),
      },
      {
        path: "forgot-password",
        loadChildren: () =>
          import("@features/auth/pages/forgot-password/forgot-password.routes"),
      },
      { path: "404", component: Error404Component },
    ],
  },
  {
    path: "",
    canActivate: [authGuard],
    canActivateChild: [authGuard],
    component: LayoutComponent,
    resolve: {
      initialData: initialDataResolver,
    },
    children: [
      {
        path: "history",
        loadChildren: () => import("@features/history/history.route"),
      },
      {
        path: "identity-verification",
        loadChildren: () => import("@features/identity/identity.routes"),
        data: {
          discriminantPathKey: "IDENTITY",
        },
      },
      {
        path: "profile",
        loadChildren: () => import("@features/profile/profile.routes"),
      },

      {
        path: "deposit",
        loadChildren: () => import("@features/deposit/deposit.route"),
      },
      {
        path: "withdraw",
        loadChildren: () => import("@features/withdraw/withdraw.route"),
      },
      {
        path: "my-portfolio",
        loadChildren: () => import("@features/portfolio/portfolio.routes"),
      },
      { path: "logout", component: LogoutComponent },
    ],
  },

  { path: "**", component: Error404Component },
];
