import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatButtonModule} from "@angular/material/button";
import { MatIconModule} from "@angular/material/icon";
import {MatListModule} from "@angular/material/list";

const modules: Array<any> = [MatToolbarModule,
                            MatButtonModule,
                            MatIconModule,
                            MatListModule];

@NgModule({
  declarations: [],
  imports: [CommonModule, ...modules],
  exports: modules,
})
export class MaterialModule {}
