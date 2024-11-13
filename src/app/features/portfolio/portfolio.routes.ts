import { Routes } from "@angular/router";

import { PortfolioComponent } from "@features/portfolio/pages/overview/portfolio.component";
import { PortfolioResolver } from "@features/portfolio/pages/overview/portfolio.resolver";

export default [
  {
    path: "",
    pathMatch: "full",
    component: PortfolioComponent,
    resolve: {
      depositResolver: PortfolioResolver,
    },
  },
] as Routes;
