import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlayAreaComponent } from './components/play-area.component';
import {MatGridListModule} from '@angular/material/grid-list'; 
import { GameBoardComponent } from './components/game-board.component';
import { GameBoardService } from './services/game-board.service';
import {MatIconModule, MatIconRegistry} from '@angular/material/icon';
import { BoardMarkIconPipe } from './pipes/board-icon.pipe';
import {MatTableModule} from '@angular/material/table';

@NgModule({
  declarations: [
    PlayAreaComponent,
    GameBoardComponent,
    BoardMarkIconPipe
  ],
  exports: [
    PlayAreaComponent
  ],
  imports: [
    CommonModule,
    MatGridListModule,
    MatIconModule,
    MatTableModule
  ],
  providers: [
    GameBoardService,
    MatIconRegistry
  ]
})
export class GameModule { }
