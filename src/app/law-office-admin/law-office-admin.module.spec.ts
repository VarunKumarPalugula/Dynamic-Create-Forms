import { LawOfficeAdminModule } from './law-office-admin.module';

describe('LawOfficeAdminModule', () => {
  let lawOfficeAdminModule: LawOfficeAdminModule;

  beforeEach(() => {
    lawOfficeAdminModule = new LawOfficeAdminModule();
  });

  it('should create an instance', () => {
    expect(lawOfficeAdminModule).toBeTruthy();
  });
});
