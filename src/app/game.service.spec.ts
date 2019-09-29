import { TestBed } from '@angular/core/testing';

import { GameService } from './game.service';

describe('GameService', () => {
  let service: GameService;
  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = new GameService();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it ('should calculate realDim based on dim and equal to 2*dim - 1', () => {
    service.dim = 5;
    expect(service.realDim).toEqual(5 * 2 - 1);
  });

  it('should construct 2d tileArray of tiles of length equal to realDim', () => {
    expect(service.tileArr.length).toEqual(service.realDim);
  });

  it ('should contain tileArray, that should contain arrays each of lenght equal to realDim', () => {
    service.tileArr.forEach(element => {
      expect(element.length).toEqual(service.realDim);
    });
  });

});
