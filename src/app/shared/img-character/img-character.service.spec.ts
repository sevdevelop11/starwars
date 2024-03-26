import { TestBed } from '@angular/core/testing';

import { ImgCharacterService } from './img-character.service';

describe('ImgCharacterService', () => {
  let service: ImgCharacterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ImgCharacterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
