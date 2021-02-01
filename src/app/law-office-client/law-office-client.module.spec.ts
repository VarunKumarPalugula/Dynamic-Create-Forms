import { LawOfficeClientModule } from '@app/law-office-client/law-office-client.module';

describe('LawOfficeClientModule', () => {
  let lawOfficeClientModule: LawOfficeClientModule;

  beforeEach(() => {
    lawOfficeClientModule = new LawOfficeClientModule();
  });

  it('should create an instance', () => {
    expect(lawOfficeClientModule).toBeTruthy();
  });
});
