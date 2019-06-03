import { TestBed } from '@angular/core/testing';

import { SelectedPlayersService } from './selected-players.service';

describe('SelectedPlayersService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SelectedPlayersService = TestBed.get(SelectedPlayersService);
    expect(service).toBeTruthy();
  });
});
